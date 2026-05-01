import { Award, Eye, Users } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface Milestone {
  icon: ReactNode;
  title: string;
  desc: string;
}

const milestones: Milestone[] = [
  {
    icon: <Eye size={20} color="#00BBCC" />,
    title: "Real Classroom Experience",
    desc: "Step into a functioning pre-primary classroom and observe, assist, and eventually lead sessions under guided supervision.",
  },
  {
    icon: <Users size={20} color="#C8DC00" />,
    title: "Mentored by Professionals",
    desc: "Work alongside experienced Phonic Champs educators who provide structured feedback throughout the placement.",
  },
  {
    icon: <Award size={20} color="white" />,
    title: "Certificate on Completion",
    desc: "Receive an internship completion certificate alongside your diploma, strengthening your professional portfolio.",
  },
];

export default function Internship() {
  return (
    <section
      id="internship"
      className="internship-section"
      style={{
        background: "#0d1945",
        position: "relative",
        overflow: "hidden",
        padding: "100px 0",
      }}
    >
      <div
        className="internship-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          className="internship-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#00BBCC",
                marginBottom: 16,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              PRACTICAL TRAINING
            </div>
            <h2
              style={{
                margin: "0 0 6px",
                fontSize: "clamp(36px,5vw,56px)",
                fontWeight: 300,
                color: "white",
                fontFamily: "Montserrat, sans-serif",
                lineHeight: 1.1,
              }}
            >
              Hands-On
            </h2>
            <h2
              style={{
                margin: "0 0 6px",
                fontSize: "clamp(36px,5vw,56px)",
                fontWeight: 900,
                color: "#C8DC00",
                fontFamily: "Montserrat, sans-serif",
                lineHeight: 1.1,
              }}
            >
              Internship.
            </h2>
            <div style={{ margin: "0 0 6px" }}>
              <span
                style={{
                  fontSize: "clamp(42px,6vw,72px)",
                  fontFamily: "Playfair Display, serif",
                  fontStyle: "italic",
                  color: "#C8DC00",
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                30-Day
              </span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "#00BBCC",
                textTransform: "uppercase",
                letterSpacing: "1px",
                margin: "0 0 6px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Live classroom placement at Phonic Champs School
            </p>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.85,
                maxWidth: 460,
                marginBottom: 28,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Every Edu Mentoria student completes a full 30-day internship in a
              live school environment. You will observe experienced teachers,
              assist with daily activities, and gradually take ownership of
              sessions under guided supervision.
            </p>
            <div
              style={{
                display: "inline-block",
                fontSize: 13,
                fontWeight: 600,
                color: "#4ecdc4",
                fontFamily: "Montserrat, sans-serif",
                letterSpacing: "0.5px",
                marginTop: 4,
              }}
            >
              At Phonic Champs School, Chennai
            </div>
          </motion.div>

          {/* RIGHT: Timeline */}
          <motion.div
            className="internship-timeline"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative" }}
          >
            {/* SVG Timeline line */}
            <svg
              role="img"
              aria-label="Internship timeline"
              style={{
                position: "absolute",
                left: 20,
                top: 0,
                width: 2,
                height: "100%",
                overflow: "visible",
              }}
              viewBox="0 0 2 600"
              preserveAspectRatio="none"
            >
              <title>Internship timeline</title>
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="600"
                stroke="#00BBCC"
                strokeWidth={2}
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </svg>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {milestones.map((m, i) => (
                <motion.div
                  key={m.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "flex-start",
                    paddingLeft: 50,
                  }}
                  data-ocid={`internship.item.${i + 1}`}
                >
                  {/* Timeline bullet */}
                  <div
                    style={{
                      position: "absolute",
                      left: 15,
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#C8DC00",
                      border: "2px solid #0d1945",
                      marginTop: 18,
                    }}
                  />

                  {/* Card */}
                  <div
                    className="internship-milestone-card"
                    style={{
                      flex: 1,
                      background: "rgba(26,43,140,0.40)",
                      borderRadius: 16,
                      padding: "28px 32px",
                      borderLeft: "3px solid rgba(0,187,204,0.40)",
                    }}
                  >
                    <div style={{ marginBottom: 10 }}>{m.icon}</div>
                    <h4
                      style={{
                        margin: "0 0 8px",
                        fontSize: 15,
                        fontWeight: 700,
                        color: "white",
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      {m.title}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: "rgba(255,255,255,0.60)",
                        fontFamily: "Montserrat, sans-serif",
                        lineHeight: 1.65,
                      }}
                    >
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
