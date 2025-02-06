import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useABTestStore } from '../stores/abTestStore';
import { TestSettings } from './TestSettings';
import { ResultsDisplay } from './ResultsDisplay';
import { DistributionChart } from './DistributionChart';

export const ABTestCalculator: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { setControlMetrics, setVariantMetrics } = useABTestStore();

  useEffect(() => {
    const cs = Number(searchParams.get('cs')) || 0; // control size
    const cc = Number(searchParams.get('cc')) || 0; // control conversions
    const vs = Number(searchParams.get('vs')) || 0; // variant size
    const vc = Number(searchParams.get('vc')) || 0; // variant conversions

    setControlMetrics(cs, cc);
    setVariantMetrics(vs, vc);
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">A/B Test Calculator</h1>
      <TestSettings />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <ResultsDisplay />
        <DistributionChart />
      </div>
    </div>
  );
};
