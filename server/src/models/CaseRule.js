import mongoose from 'mongoose';

const caseRuleSchema = new mongoose.Schema(
  {
    caseType: {
      type: String,
      required: true,
      trim: true,
    },
    productType: {
      type: String,
      required: true,
    },
    customerType: {
      type: String,
      required: true,
    },
    conditionDetail: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      default: 'Standar',
    },
    targetPageNumber: {
      type: Number,
      default: 1,
    },
    analysis: {
      type: String,
      required: true,
    },
    steps: {
      type: [String],
      required: true,
      default: [],
    },
    script: {
      type: String,
      required: true,
    },
    escalationNote: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const CaseRule = mongoose.models.CaseRule || mongoose.model('CaseRule', caseRuleSchema);
