import React from 'react';
import { useABTestStore } from '../stores/abTestStore';
import type { TestType, ConfidenceLevel } from '../stores/abTestStore';

export const TestSettings: React.FC = () => {
  const { testType, confidenceLevel, setTestType, setConfidenceLevel } = useABTestStore();

  const confidenceLevels: ConfidenceLevel[] = [90, 95, 99];
  const testTypes: { value: TestType; label: string }[] = [
    { value: 'one-sided', label: 'One-sided' },
    { value: 'two-sided', label: 'Two-sided' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
          <select
            value={testType}
            onChange={(e) => setTestType(e.target.value as TestType)}
            className="w-full p-2 border rounded-md"
          >
            {testTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confidence Level
          </label>
          <select
            value={confidenceLevel}
            onChange={(e) => setConfidenceLevel(Number(e.target.value) as ConfidenceLevel)}
            className="w-full p-2 border rounded-md"
          >
            {confidenceLevels.map((level) => (
              <option key={level} value={level}>
                {level}%
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
