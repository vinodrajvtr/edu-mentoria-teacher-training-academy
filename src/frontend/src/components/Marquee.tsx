interface MarqueeProps {
  text: string;
  direction?: "left" | "right";
  bgColor: string;
  textColor: string;
  fontSize?: string;
  speed?: number;
}

export default function Marquee({
  text,
  direction = "left",
  bgColor,
  textColor,
  fontSize = "20px",
}: MarqueeProps) {
  const doubled = `${text}  ${text}`;
  return (
    <div
      style={{
        background: bgColor,
        overflow: "hidden",
        position: "relative",
        whiteSpace: "nowrap",
      }}
    >
      {/* Fade masks */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: `linear-gradient(to right, ${bgColor}, transparent)`,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 80,
          background: `linear-gradient(to left, ${bgColor}, transparent)`,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        className={
          direction === "right" ? "animate-marquee-reverse" : "animate-marquee"
        }
        style={{
          display: "inline-block",
          color: textColor,
          fontSize,
          fontWeight: 700,
          fontFamily: "Montserrat, sans-serif",
          textTransform: "uppercase",
          letterSpacing: "2px",
          padding: "18px 0",
        }}
      >
        {doubled}
      </div>
    </div>
  );
}
