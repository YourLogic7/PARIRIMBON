import { CaseRule } from '../models/CaseRule.js';
import { isUsingInMemory, memoryStore } from '../config/db.js';
import {
  caseOptionsList,
  productOptionsList,
  customerOptionsList,
  conditionOptionsList,
  initialCaseRules,
} from '../data/initialKnowledge.js';

// Get dropdown options for the AI Assist UI
export const getAiOptions = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        caseTypes: caseOptionsList,
        productTypes: productOptionsList,
        customerTypes: customerOptionsList,
        conditionDetails: conditionOptionsList,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all AI rules (for Admin view)
export const getAllRules = async (req, res) => {
  try {
    if (isUsingInMemory()) {
      return res.json({ success: true, data: memoryStore.caseRules });
    }

    let rules = await CaseRule.find();
    if (!rules || rules.length === 0) {
      await CaseRule.insertMany(initialCaseRules.map(({ id, ...r }) => r));
      rules = await CaseRule.find();
    }

    res.json({ success: true, data: rules });
  } catch (error) {
    res.json({ success: true, data: memoryStore.caseRules });
  }
};

// Generate AI Recommendation based on selected dropdowns
export const getAiRecommendation = async (req, res) => {
  try {
    const { caseType, productType, customerType, conditionDetail, customNotes } = req.body;

    if (!caseType || !productType || !customerType || !conditionDetail) {
      return res.status(400).json({
        success: false,
        message: 'Mohon lengkapi seluruh pilihan dropdown (Kasus, Tipe Produk, Tipe Pelanggan, dan Kondisi Spesifik).',
      });
    }

    // 1. Search knowledge base rules
    let rules = isUsingInMemory() ? memoryStore.caseRules : await CaseRule.find();
    if (!rules || rules.length === 0) {
      rules = initialCaseRules;
    }

    // Try finding exact match
    let matchedRule = rules.find(
      (r) =>
        r.caseType === caseType &&
        r.productType === productType &&
        r.customerType === customerType &&
        r.conditionDetail === conditionDetail
    );

    // If no exact match, find closest match by caseType and conditionDetail or productType
    if (!matchedRule) {
      matchedRule = rules.find(
        (r) => r.caseType === caseType && (r.conditionDetail === conditionDetail || r.productType === productType)
      );
    }

    // If still none, find by caseType
    if (!matchedRule) {
      matchedRule = rules.find((r) => r.caseType === caseType);
    }

    // Determine target page number based on case category
    let targetPage = 1;
    if (caseType.toLowerCase().includes('garansi') || caseType.toLowerCase().includes('retur')) targetPage = 4;
    else if (caseType.toLowerCase().includes('pembayaran') || caseType.toLowerCase().includes('transaksi')) targetPage = 3;
    else if (caseType.toLowerCase().includes('spesifikasi') || caseType.toLowerCase().includes('katalog')) targetPage = 2;
    else if (caseType.toLowerCase().includes('gangguan') || caseType.toLowerCase().includes('error')) targetPage = 5;
    else if (caseType.toLowerCase().includes('komplain') || caseType.toLowerCase().includes('refund')) targetPage = 6;

    // Optional Gemini API enhancement if GEMINI_API_KEY is present
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        const prompt = `
Anda adalah AI Knowledge Officer untuk KMS internal bernama "PARIRIMBON" (Buku Panduan Pengetahuan Produk Pegawai).
Berikan rekomendasi panduan penyelesaian yang taktis, empatik, dan sesuai SOP untuk pegawai frontliner dengan kasus berikut:
- Jenis Kasus: ${caseType}
- Kategori Produk: ${productType}
- Status Pelanggan: ${customerType}
- Kondisi Spesifik: ${conditionDetail}
${customNotes ? `- Catatan Tambahan Kasus: ${customNotes}` : ''}
- Rujukan Halaman Paririmbon: Bab ${targetPage}

Balas HANYA dalam format JSON valid tanpa tanda markdown kutip tiga atau format lain:
{
  "severity": "Tingkat Urgensi (contoh: Prioritas Cepat / Prosedur Standar)",
  "analysis": "Analisis kasus singkat dan acuan kebijakan perusahaan",
  "steps": ["Langkah 1", "Langkah 2", "Langkah 3", "Langkah 4"],
  "script": "Skrip percakapan santun yang disarankan untuk diucapkan pegawai ke pelanggan",
  "escalationNote": "Catatan eskalasi bila kasus tidak dapat diselesaikan di tingkat pertama"
}
        `.trim();

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleaned);
            return res.json({
              success: true,
              source: 'gemini-ai',
              data: {
                ...parsed,
                targetPageNumber: targetPage,
                inputs: { caseType, productType, customerType, conditionDetail },
              },
            });
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to rule engine:', geminiError.message);
      }
    }

    // Intelligent Synthesis Engine fallback
    const synthesis = matchedRule
      ? {
          severity: matchedRule.severity || (customerType.includes('VIP') ? 'Prioritas Cepat (SLA 1-2 Jam)' : 'Prosedur Standar Operasional'),
          targetPageNumber: matchedRule.targetPageNumber || targetPage,
          analysis: matchedRule.analysis,
          steps: matchedRule.steps,
          script: matchedRule.script,
          escalationNote: matchedRule.escalationNote || 'Eskalasi ke Supervisor jika ada kendala di lapangan.',
        }
      : {
          severity: customerType.includes('VIP') ? 'Prioritas Cepat (Jalur Khusus)' : 'Prosedur Standar',
          targetPageNumber: targetPage,
          analysis: `Kasus '${caseType}' pada produk '${productType}' dengan kondisi '${conditionDetail}'. Menurut SOP Paririmbon, penanganan harus mengacu pada ketentuan hak konsumen dan verifikasi dokumentasi resmi.`,
          steps: [
            `Lakukan verifikasi identitas akun pelanggan dan data pembelian terkait ${productType}.`,
            `Buka Paririmbon Bab ${targetPage} untuk memeriksa batasan kewenangan dan syarat dokumen.`,
            `Jelaskan solusi bertahap kepada pelanggan dengan mengedepankan empati dan kejelasan estimasi waktu.`,
            `Catat nomor laporan pada sistem CRM internal untuk pemantauan berkelanjutan.`,
          ],
          script: `Selamat [Pagi/Siang/Sore] Bapak/Ibu. Kami memahami kendala pada ${productType} ini sangat mempengaruhi aktivitas Anda. Sesuai panduan resmi Paririmbon kami, izinkan saya membantu menyelesaikan hal ini dengan langkah terbaik untuk Anda.`,
          escalationNote: `Bila dalam 1x24 jam belum selesai, hubungi penanggung jawab unit terkait.`,
        };

    res.json({
      success: true,
      source: 'paririmbon-engine',
      data: {
        ...synthesis,
        inputs: { caseType, productType, customerType, conditionDetail },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
