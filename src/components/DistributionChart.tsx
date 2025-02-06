import React from 'react';
import { useABTestStore } from '../stores/abTestStore';
import { generateDistributionData } from '../utils/statistics';
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

  const controlData = generateDistributionData(controlSize, controlConversions);
  const variantData = generateDistributionData(variantSize, variantConversions);

  // Combine data for proper scaling
  const combinedData = controlData.map((point, index) => ({
    x: point.x,
    control: point.y,
    variant: variantData[index].y,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Conversion Rate Distribution</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="x"
              label={{ value: 'Conversion Rate (%)', position: 'bottom' }}
            />
            <YAxis label={{ value: 'Density', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="control"
              stroke="#2563eb"
              name="Control"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="variant"
              stroke="#dc2626"
              name="Variant"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
