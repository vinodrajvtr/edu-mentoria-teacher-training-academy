import { Award, BookOpen, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="about-section"
      style={{
        background: "white",
        position: "relative",
        overflow: "hidden",
        padding: "100px 0",
      }}
    >
      <div
        className="about-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* TOP: 40/60 split */}
        <motion.div
          className="about-split"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: "flex",
            gap: 60,
            alignItems: "flex-start",
            marginBottom: 80,
            flexWrap: "wrap",
          }}
        >
          {/* Left 40% */}
          <div
            className="about-left"
            style={{ flex: "0 0 38%", minWidth: 280 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 3,
                  height: 48,
                  background: "#C8DC00",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#3a4a7a",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                WHO WE ARE
              </span>
            </div>
            <h2
              style={{
                margin: "0 0 4px",
                fontSize: "clamp(40px,5vw,64px)",
                fontWeight: 800,
                color: "#1A2B8C",
                fontFamily: "Montserrat, sans-serif",
                lineHeight: 1.1,
              }}
            >
              We Train.
            </h2>
            <h2
              style={{
                margin: "0 0 24px",
                fontSize: "clamp(40px,5vw,64px)",
                fontWeight: 300,
                color: "#1A2B8C",
                fontFamily: "Playfair Display, serif",
                fontStyle: "italic",
                lineHeight: 1.1,
              }}
            >
              We Inspire.
            </h2>
            <div style={{ width: 40, height: 2, background: "#00BBCC" }} />
          </div>

          {/* Right 60% */}
          <div className="about-right" style={{ flex: 1, minWidth: 280 }}>
            <p
              style={{
                fontSize: 18,
                fontWeight: 400,
                color: "#3a4a7a",
                lineHeight: 2.0,
                maxWidth: 580,
                margin: "0 0 20px",
              }}
            >
              Edu Mentoria is a teacher training academy built on the belief
              that great teachers shape great futures. We train, guide, and
              inspire educators at every stage of their career.
            </p>
            <p
              style={{
                fontSize: 14,
                color: "rgba(58,74,122,0.60)",
                lineHeight: 1.85,
                maxWidth: 580,
                margin: 0,
              }}
            >
              We equip teachers to be engaged citizens, transformative
              educators, and fully functioning personalities in their
              communities and beyond. Through structured training and guided
              practice, we help teacher trainees develop the skills and
              qualities needed to excel in any classroom setting.
            </p>
          </div>
        </motion.div>

        {/* MIDDLE: 3-col cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            marginBottom: 80,
          }}
          className="about-cards"
        >
          {[
            {
              bg: "#1A2B8C",
              textColor: "white",
              subColor: "rgba(255,255,255,0.65)",
              icon: <BookOpen size={40} color="white" />,
              title: "Theory & Practicals",
              desc: "Every diploma blends academic study with real classroom practice",
            },
            {
              bg: "#C8DC00",
              textColor: "#0d1945",
              subColor: "rgba(13,25,69,0.68)",
              icon: <GraduationCap size={40} color="#0d1945" />,
              title: "Expert Mentoring",
              desc: "Our instructors bring years of real classroom experience",
            },
            {
              bg: "#00BBCC",
              textColor: "white",
              subColor: "rgba(255,255,255,0.78)",
              icon: <Award size={40} color="white" />,
              title: "Recognised Certification",
              desc: "Graduates leave with a diploma and the confidence to apply for roles",
            },
          ].map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                background: card.bg,
                minHeight: 280,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 32px",
                textAlign: "center",
                gap: 16,
              }}
            >
              {card.icon}
              <h3
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 700,
                  color: card.textColor,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: card.subColor,
                  fontFamily: "Montserrat, sans-serif",
                  lineHeight: 1.6,
                }}
              >
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* BOTTOM: Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 32,
          }}
          className="mission-vision"
        >
          <div style={{ borderLeft: "4px solid #C8DC00", paddingLeft: 32 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#C8DC00",
                marginBottom: 12,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              OUR MISSION
            </div>
            <h3
              className="mission-vision-heading"
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#1A2B8C",
                margin: "0 0 20px",
                fontFamily: "Montserrat, sans-serif",
                lineHeight: 1.2,
              }}
            >
              Shaping Tomorrow's Teachers
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "#3a4a7a",
                lineHeight: 1.85,
                margin: "0 0 12px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              We equip teachers to be engaged citizens, transformative
              educators, and fully functioning personalities in their
              communities and beyond.
            </p>
            <p
              style={{
                fontSize: 14,
                color: "#3a4a7a",
                lineHeight: 1.85,
                margin: 0,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              We endow our students with knowledge, shape them into confident
              professionals, and send them into schools as inspiring, humane
              educators.
            </p>
          </div>
          <div style={{ borderLeft: "4px solid #00BBCC", paddingLeft: 32 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#00BBCC",
                marginBottom: 12,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              OUR VISION
            </div>
            <h3
              className="mission-vision-heading"
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#1A2B8C",
                margin: "0 0 20px",
                fontFamily: "Montserrat, sans-serif",
                lineHeight: 1.2,
              }}
            >
              Education Built on Equality
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "#3a4a7a",
                lineHeight: 1.85,
                margin: "0 0 12px",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Edu Mentoria prepares teachers to be confident, skilled, and
              socially responsible through an innovative, equality-based
              curriculum.
            </p>
            <p
              style={{
                fontSize: 14,
                color: "#3a4a7a",
                lineHeight: 1.85,
                margin: 0,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              By developing leadership and problem-solving abilities, we promote
              social values and environmental awareness, instilling genuine
              pride in the teaching profession.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
