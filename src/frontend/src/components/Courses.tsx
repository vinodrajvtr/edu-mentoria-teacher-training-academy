import { Clock } from "lucide-react";
import { motion } from "motion/react";

const courses = [
  {
    num: "01",
    duration: "12 MONTHS",
    panelBg: "#233aaa",
    numColor: "#C8DC00",
    chipBg: "rgba(255,255,255,0.15)",
    category: "EARLY CHILDHOOD",
    title: "Diploma in Early Childhood Care and Education",
    curriculum: [
      "Philosophy of pre-primary education",
      "Pre-school and pre-primary curriculum development",
      "Child psychology",
      "Child care and health",
      "Classroom management and school administration",
      "Diploma in Montessori and child education",
    ],
    addons: ["Jolly Grammar", "Sketch Noting"],
  },
  {
    num: "02",
    duration: "6 MONTHS",
    panelBg: "#00BBCC",
    numColor: "#0d1945",
    chipBg: "rgba(13,25,69,0.15)",
    category: "MONTESSORI",
    title: "Diploma in Montessori and Child Education",
    curriculum: [
      "Montessori method of education",
      "History of Montessori Education",
      "Exercises on Practical Life",
      "Sensorial Exploration",
      "Arithmetic in the Montessori framework",
      "Language and Culture",
    ],
    addons: ["Jolly Grammar", "Sketch Noting"],
  },
];

const comparison = [
  "Theory + Practicals",
  "Internship",
  "Recognised Diploma",
  "Add-On Modules",
];

export default function Courses() {
  return (
    <section
      id="courses"
      style={{
        background: "#0d1945",
        position: "relative",
        overflow: "hidden",
        padding: "100px 0",
      }}
    >
      <div
        className="courses-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 60 }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#00BBCC",
              marginBottom: 16,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            PROGRAMMES
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(36px,5vw,56px)",
                fontWeight: 300,
                color: "white",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Our Diploma
            </h2>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(36px,5vw,56px)",
                fontWeight: 900,
                color: "#C8DC00",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Courses.
            </h2>
          </div>
        </motion.div>

        {/* Course cards */}
        <div
          className="courses-cards-wrap"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {courses.map((course, idx) => (
            <motion.div
              key={course.num}
              className="course-card"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: idx * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 24px 60px rgba(26,43,140,0.18)",
              }}
              style={{
                display: "flex",
                minHeight: 280,
                borderRadius: 4,
                overflow: "hidden",
              }}
              data-ocid={`courses.item.${idx + 1}`}
            >
              {/* Left panel — number only */}
              <motion.div
                className="course-card-panel"
                whileHover={{ x: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  width: 140,
                  flexShrink: 0,
                  background: course.panelBg,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  padding: "24px 16px",
                }}
              >
                <span
                  className="course-card-num"
                  style={{
                    fontSize: 80,
                    fontWeight: 900,
                    color: course.numColor,
                    lineHeight: 1,
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  {course.num}
                </span>
              </motion.div>

              {/* Right panel */}
              <div
                className="course-card-body"
                style={{
                  flex: 1,
                  background: "white",
                  padding: "40px 48px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {/* Category + Duration pills in one row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      background: "#C8DC00",
                      color: "#0d1945",
                      borderRadius: 999,
                      padding: "3px 10px",
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {course.category}
                  </span>
                  <span
                    style={{
                      background: course.panelBg,
                      color: "white",
                      borderRadius: 999,
                      padding: "3px 10px",
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    {course.duration}
                  </span>
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 24,
                    fontWeight: 800,
                    color: "#0d1945",
                    fontFamily: "Montserrat, sans-serif",
                    lineHeight: 1.3,
                  }}
                >
                  {course.title}
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Clock size={14} color="#00BBCC" />
                  <span
                    style={{
                      fontSize: 12,
                      color: "#3a4a7a",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    Theory and Practicals
                  </span>
                </div>
                <div
                  className="course-curriculum-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "4px 16px",
                  }}
                >
                  {course.curriculum.map((item, j) => (
                    <div
                      key={`${course.num}-c-${j}`}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 6,
                      }}
                    >
                      <span
                        style={{
                          color: "#00BBCC",
                          fontSize: 12,
                          lineHeight: 1.5,
                          flexShrink: 0,
                        }}
                      >
                        •
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "#3a4a7a",
                          fontFamily: "Montserrat, sans-serif",
                          lineHeight: 1.5,
                        }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#3a4a7a",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    Add-On:
                  </span>
                  {course.addons.map((addon) => (
                    <span
                      key={addon}
                      style={{
                        background: "rgba(0,187,204,0.10)",
                        color: "#00BBCC",
                        borderRadius: 999,
                        padding: "2px 10px",
                        fontSize: 11,
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      {addon}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("syllabus")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    color: "#00BBCC",
                    fontSize: 13,
                    fontWeight: 700,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: "Montserrat, sans-serif",
                    textAlign: "left",
                  }}
                  data-ocid={`courses.syllabus_link.${idx + 1}`}
                >
                  View Full Syllabus →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            padding: "40px 0",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            marginTop: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.50)",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
            }}
          >
            Both programmes include:
          </span>
          {comparison.map((item, i) => (
            <span
              key={item}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <span
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.70)",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                }}
              >
                {item}
              </span>
              {i < comparison.length - 1 && (
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "rgba(200,220,0,0.50)",
                    display: "inline-block",
                  }}
                />
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
