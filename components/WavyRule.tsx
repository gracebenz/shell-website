export default function WavyRule({ width = 192, strokeWidth = 1.2, className, style }: {
  width?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={width}
      height={10}
      viewBox={`0 0 ${width} 10`}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={buildWave(width)}
        stroke="var(--c-wave)"
        strokeWidth={strokeWidth}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function buildWave(width: number): string {
  const wavelength = 24;
  const amp = 3;
  const cy = 5;
  const segments = Math.ceil(width / wavelength);
  let d = `M0,${cy}`;
  for (let i = 0; i < segments; i++) {
    const x0 = i * wavelength;
    const x1 = x0 + wavelength / 2;
    const x2 = x0 + wavelength;
    const y1 = i % 2 === 0 ? cy - amp : cy + amp;
    const y2 = cy;
    d += ` C${x0 + wavelength / 4},${y1} ${x1 + wavelength / 4},${y1} ${x2},${y2}`;
  }
  return d;
}
