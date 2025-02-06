export function calculatePValue(
  controlSize: number,
  controlConversions: number,
  variantSize: number,
  variantConversions: number,
  isTwoSided: boolean
): number {
  const controlRate = controlConversions / controlSize;
  const variantRate = variantConversions / variantSize;
  const pooledRate = (controlConversions + variantConversions) / (controlSize + variantSize);

  const standardError = Math.sqrt(
    pooledRate * (1 - pooledRate) * (1 / controlSize + 1 / variantSize)
  );

  const zScore = Math.abs((variantRate - controlRate) / standardError);

  // Approximate normal distribution
  const pValue = 1 - normalCDF(zScore);

  return isTwoSided ? pValue * 2 : pValue;
}

export function calculateRelativeUplift(
  controlSize: number,
  controlConversions: number,
  variantSize: number,
  variantConversions: number
): number {
  const controlRate = controlConversions / controlSize;
  const variantRate = variantConversions / variantSize;

  return ((variantRate - controlRate) / controlRate) * 100;
}

// Helper function for normal cumulative distribution function
function normalCDF(x: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989423 * Math.exp(-x * x / 2);
  const probability = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return x > 0 ? 1 - probability : probability;
}

export function generateDistributionData(
  size: number,
  conversions: number,
  points: number = 100
): Array<{ x: number; y: number }> {
  if (size === 0 || conversions === 0) {
    return Array(points).fill({ x: 0, y: 0 });
  }

  const rate = conversions / size;
  const standardError = Math.sqrt((rate * (1 - rate)) / size);

  const data: Array<{ x: number; y: number }> = [];
  // Calculate range ensuring the mean (rate) is at the center
  const range = 4 * standardError;
  const start = Math.max(0, rate - range);
  const end = Math.min(1, rate + range);

  // Adjust step size to maintain symmetry
  const step = (end - start) / (points - 1);

  for (let i = 0; i < points; i++) {
    const x = start + (i * step);
    // Normal distribution formula
    const z = (x - rate) / standardError;
    const y = (1 / (standardError * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * z * z);
    data.push({ x: x * 100, y }); // Convert to percentage
  }

  return data;
}
