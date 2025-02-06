# A/B Test Calculator Link

Meet the first AB-test calculator that could be integrated into your BI dashboard.

## Features

- Calculates p-value for binary metrics (e.g. conversion rate)
- Visualize conversion rate distributions
- Support for one-sided and two-sided tests
- Adjustable confidence levels (90%, 95%, 99%)
- Cohort sizes and conversion numbers can be set via URL parameters

## Example URL

`https://sqlhabit.github.io/ab-test-calculator-link/#/?cs=1000&cc=24&vs=1000&vc=54`

### URL Parameters

| Parameter | Description |
|-----------|-------------|
| `cs` | Control group size |
| `cc` | Control group conversions |
| `vs` | Variant group size |
| `vc` | Variant group conversions |

## Development

```bash
npm install
npm run dev
```

Example analysis URL: [http://localhost:5173/?cs=1000&cc=24&vs=1000&vc=44](http://localhost:5173/?cs=1000&cc=24&vs=1000&vc=44).
