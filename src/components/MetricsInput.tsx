import React from 'react';
import { useABTestStore } from '../stores/abTestStore';

export const MetricsInput: React.FC = () => {
  const {
    controlSize,
    controlConversions,
    variantSize,
    variantConversions,
    setControlMetrics,
    setVariantMetrics,
  } = useABTestStore();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Control Group</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sample Size
            </label>
            <input
              type="number"
              min="0"
              value={controlSize}
              onChange={(e) => setControlMetrics(Number(e.target.value), controlConversions)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conversions
            </label>
            <input
              type="number"
              min="0"
              max={controlSize}
              value={controlConversions}
              onChange={(e) => setControlMetrics(controlSize, Number(e.target.value))}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Variant Group</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sample Size
            </label>
            <input
              type="number"
              min="0"
              value={variantSize}
              onChange={(e) => setVariantMetrics(Number(e.target.value), variantConversions)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Conversions
            </label>
            <input
              type="number"
              min="0"
              max={variantSize}
              value={variantConversions}
              onChange={(e) => setVariantMetrics(variantSize, Number(e.target.value))}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
