import React from 'react';
import { useABTestStore } from '../stores/abTestStore';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export const DistributionChart: React.FC = () => {
  const {
    controlSize,
    controlConversions,
    variantSize,
    variantConversions,
  } = useABTestStore();

  // Calculate conversion rates
  const controlRate = (controlConversions / controlSize) * 100;
  const variantRate = (variantConversions / variantSize) * 100;

  // Calculate standard errors for both groups
  const controlSE = Math.sqrt((controlConversions / controlSize) * (1 - controlConversions / controlSize) / controlSize) * 100;
  const variantSE = Math.sqrt((variantConversions / variantSize) * (1 - variantConversions / variantSize) / variantSize) * 100;

  // Calculate the range to show on x-axis
  const xMin = Math.max(0, Math.min(
    controlRate - 5 * controlSE,
    variantRate - 5 * variantSE
  ));
  const xMax = Math.max(
    controlRate + 5 * controlSE,
    variantRate + 5 * variantSE
  );

  // Generate separate distributions for control and variant
  const points = 100;
  const step = (xMax - xMin) / (points - 1);
  const data = Array.from({ length: points }, (_, i) => {
    const x = xMin + i * step;
    return {
      x,
      control: controlSize > 0 ? normalDensity(x, controlRate, controlSize, controlConversions) : 0,
      variant: variantSize > 0 ? normalDensity(x, variantRate, variantSize, variantConversions) : 0,
    };
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Conversion Rate Distribution</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              domain={[0, 'auto']}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
              label={{ value: 'Conversion Rate (%)', position: 'bottom' }}
            />
            <YAxis
              label={{ value: 'Density', angle: -90, position: 'insideLeft' }}
              tickFormatter={(value) => value.toFixed(3)}
            />
            <Tooltip
              formatter={(value: number) => value.toFixed(4)}
              labelFormatter={(label) => `${Number(label).toFixed(1)}%`}
            />
            <Legend
              verticalAlign="bottom"
              align="left"
              wrapperStyle={{
                paddingTop: '10px'
              }}
            />
            <Line
              type="monotone"
              dataKey="control"
              stroke="#2563eb"
              name="Control"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="variant"
              stroke="#dc2626"
              name="Variant"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Helper function to calculate normal distribution density
function normalDensity(x: number, mean: number, size: number, conversions: number): number {
  const rate = conversions / size;
  const standardError = Math.sqrt((rate * (1 - rate)) / size);
  const z = (x - mean) / (standardError * 100); // Adjust for percentage scale
  return (1 / (standardError * 100 * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
}
