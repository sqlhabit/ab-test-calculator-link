import { create } from 'zustand';

export type TestType = 'one-sided' | 'two-sided';
export type ConfidenceLevel = 90 | 95 | 99;

interface ABTestState {
  controlSize: number;
  controlConversions: number;
  variantSize: number;
  variantConversions: number;
  testType: TestType;
  confidenceLevel: ConfidenceLevel;
  setTestType: (type: TestType) => void;
  setConfidenceLevel: (level: ConfidenceLevel) => void;
  setControlMetrics: (size: number, conversions: number) => void;
  setVariantMetrics: (size: number, conversions: number) => void;
}

export const useABTestStore = create<ABTestState>((set) => ({
  controlSize: 0,
  controlConversions: 0,
  variantSize: 0,
  variantConversions: 0,
  testType: 'two-sided',
  confidenceLevel: 95,
  setTestType: (type) => set({ testType: type }),
  setConfidenceLevel: (level) => set({ confidenceLevel: level }),
  setControlMetrics: (size, conversions) => set({ controlSize: size, controlConversions: conversions }),
  setVariantMetrics: (size, conversions) => set({ variantSize: size, variantConversions: conversions }),
}));
