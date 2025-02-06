import React from 'react';
import { useABTestStore } from '../stores/abTestStore';
import { calculatePValue, calculateRelativeUplift } from '../utils/statistics';

export const ResultsDisplay: React.FC = () => {
  const {
    controlSize,
    controlConversions,
    variantSize,
    variantConversions,
    testType,
    confidenceLevel,
  } = useABTestStore();

  const pValue = calculatePValue(
    controlSize,
    controlConversions,
    variantSize,
    variantConversions,
    testType === 'two-sided'
  );

  const uplift = calculateRelativeUplift(
    controlSize,
    controlConversions,
    variantSize,
    variantConversions
  );

  const isSignificant = pValue < (1 - confidenceLevel / 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Results</h2>

      <div className="space-y-4">
        <div>
          <div className="text-sm text-gray-600">Control Conversion Rate</div>
          <div className="text-lg font-medium">
            {((controlConversions / controlSize) * 100).toFixed(2)}%
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Variant Conversion Rate</div>
          <div className="text-lg font-medium">
            {((variantConversions / variantSize) * 100).toFixed(2)}%
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Relative Uplift</div>
          <div className={`text-lg font-medium ${uplift > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {uplift > 0 ? '+' : ''}{uplift.toFixed(2)}%
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600">P-value</div>
          <div className="text-lg font-medium">
            {pValue.toFixed(4)}
          </div>
        </div>

        <div className={`p-3 rounded-md ${isSignificant ? 'bg-green-100' : 'bg-yellow-100'}`}>
          {isSignificant
            ? `Statistically significant at ${confidenceLevel}% confidence level`
            : 'Not statistically significant'}
        </div>
      </div>
    </div>
  );
};
