import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`📖 Paririmbon KMS Server aktif di port http://localhost:${PORT}`);
  console.log(`⚡ API Documentation & Health: http://localhost:${PORT}/api/health`);
});
