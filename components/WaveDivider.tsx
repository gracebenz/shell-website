export default function WaveDivider({ topColor, bottomColor }: { topColor: string; bottomColor: string }) {
  return (
    <div style={{ position: "relative", height: "48px", marginBottom: "-1px" }}>
      <div style={{ position: "absolute", inset: 0, top: 0, height: "50%", backgroundColor: topColor }} />
      <div style={{ position: "absolute", inset: 0, top: "50%", height: "50%", backgroundColor: bottomColor }} />
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <path
          d="M0,24 C90,4 180,44 270,24 C360,4 450,44 540,24 C630,4 720,44 810,24 C900,4 990,44 1080,24 C1170,4 1260,44 1350,24 C1395,14 1420,34 1440,24"
          stroke="#f0494e"
          strokeWidth="1.2"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
