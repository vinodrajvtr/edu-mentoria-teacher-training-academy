import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        background: "#0d1945",
        position: "relative",
        overflow: "hidden",
        padding: "0 0 100px",
      }}
    >
      {/* Diagonal divider */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        role="img"
        aria-label="Section divider"
        style={{ width: "100%", height: 80, display: "block", marginBottom: 0 }}
      >
        <title>Section divider</title>
        <polygon points="0,0 1440,0 1440,80 0,20" fill="#F2F5FF" />
      </svg>

      <div
        className="contact-outer"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "60px 32px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 60,
            alignItems: "start",
          }}
          className="contact-grid"
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
              GET IN TOUCH
            </div>
            <h2
              style={{
                margin: "0 0 4px",
                fontSize: "clamp(36px,5vw,56px)",
                fontWeight: 300,
                color: "white",
                fontFamily: "Montserrat, sans-serif",
                lineHeight: 1.1,
              }}
            >
              Reach Out
            </h2>
            <h2
              style={{
                margin: "0 0 20px",
                fontSize: "clamp(36px,5vw,56px)",
                fontWeight: 900,
                color: "#C8DC00",
                fontFamily: "Montserrat, sans-serif",
                lineHeight: 1.1,
              }}
            >
              To Us.
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.60)",
                lineHeight: 1.85,
                maxWidth: 440,
                marginBottom: 0,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              We are happy to answer questions about admissions, course content,
              or enrolment. Drop in, call, or send us a message.
            </p>

            {/* Contact blocks */}
            <div style={{ marginTop: 52 }}>
              {[
                {
                  Icon: MapPin,
                  label: "LOCATION",
                  value:
                    "W445, 5th Street, C Sector, Anna Nagar Extension, Chennai 600102",
                  isLink: false,
                },
                {
                  Icon: Mail,
                  label: "EMAIL",
                  value: "edumentoria08@gmail.com",
                  href: "mailto:edumentoria08@gmail.com",
                  isLink: true,
                },
                {
                  Icon: Phone,
                  label: "PHONE",
                  value: "+91 96776 23444 / +91 99412 12831",
                  href: "tel:+919677623444",
                  isLink: true,
                },
              ].map((block, i) => (
                <div
                  key={block.label}
                  style={{
                    display: "flex",
                    gap: 16,
                    padding: "24px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                  data-ocid={`contact.item.${i + 1}`}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 10,
                      background: "rgba(0,187,204,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <block.Icon size={20} color="#00BBCC" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 9,
                        color: "rgba(255,255,255,0.40)",
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        marginBottom: 4,
                        fontFamily: "Montserrat, sans-serif",
                      }}
                    >
                      {block.label}
                    </div>
                    {block.isLink ? (
                      <a
                        href={block.href}
                        style={{
                          fontSize: 14,
                          color: "#C8DC00",
                          fontWeight: 500,
                          lineHeight: 1.6,
                          fontFamily: "Montserrat, sans-serif",
                          textDecoration: "none",
                        }}
                      >
                        {block.value}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontSize: 14,
                          color: "white",
                          fontWeight: 500,
                          lineHeight: 1.6,
                          fontFamily: "Montserrat, sans-serif",
                        }}
                      >
                        {block.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social row */}
            <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
              {[
                { Icon: SiFacebook, label: "Facebook", href: "#" },
                { Icon: SiInstagram, label: "Instagram", href: "#" },
                {
                  Icon: SiWhatsapp,
                  label: "WhatsApp",
                  href: "https://wa.me/919677623444",
                },
              ].map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{
                    y: -2,
                    borderColor: "#00BBCC",
                    background: "rgba(0,187,204,0.15)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textDecoration: "none",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  data-ocid={`contact.${label.toLowerCase()}_button`}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* CTA Card */}
            <div
              className="contact-cta-card"
              style={{
                background: "#C8DC00",
                borderRadius: 32,
                padding: "64px 56px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative circles */}
              {[150, 200, 260].map((size) => (
                <div
                  key={size}
                  style={{
                    position: "absolute",
                    bottom: -size / 3,
                    right: -size / 3,
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    background: "#0d1945",
                    opacity: 0.08,
                    pointerEvents: "none",
                  }}
                />
              ))}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#0d1945",
                    marginBottom: 16,
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  READY TO BEGIN?
                </div>
                <h3
                  className="contact-cta-title"
                  style={{
                    margin: "0 0 16px",
                    fontSize: 36,
                    fontWeight: 800,
                    color: "#0d1945",
                    lineHeight: 1.15,
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Start Your Teaching Journey Today
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(13,25,69,0.70)",
                    lineHeight: 1.75,
                    margin: "0 0 32px",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Take the first step towards a meaningful career in education.
                  Complete our enquiry form and we will be in touch shortly.
                </p>
                <motion.a
                  href="mailto:edumentoria08@gmail.com"
                  whileHover={{
                    y: -2,
                    boxShadow: "0 12px 40px rgba(13,25,69,0.30)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: "inline-block",
                    background: "#0d1945",
                    color: "white",
                    borderRadius: 999,
                    padding: "16px 36px",
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: "none",
                    fontFamily: "Montserrat, sans-serif",
                  }}
                  data-ocid="contact.enquire_button"
                >
                  Enquire Now →
                </motion.a>
                <p
                  style={{
                    fontSize: 11,
                    color: "rgba(13,25,69,0.50)",
                    marginTop: 16,
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Or visit us at Anna Nagar Extension, Chennai
                </p>
              </div>
            </div>

            {/* Map card */}
            <div
              style={{
                background: "white",
                borderRadius: 20,
                padding: "24px 28px",
                marginTop: 20,
              }}
            >
              <h4
                style={{
                  margin: "0 0 4px",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#0d1945",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Find Us in Anna Nagar
              </h4>
              <p
                style={{
                  margin: "0 0 16px",
                  fontSize: 12,
                  color: "#3a4a7a",
                  lineHeight: 1.6,
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                W445, 5th Street, C Sector, Anna Nagar Extension, Chennai 600102
              </p>
              {/* SVG street grid */}
              <svg
                width="100%"
                height="90"
                viewBox="0 0 400 90"
                role="img"
                aria-label="Map of Anna Nagar"
                style={{ borderRadius: 12, background: "#F2F5FF" }}
              >
                <title>Map of Anna Nagar</title>
                <line
                  x1="0"
                  y1="45"
                  x2="400"
                  y2="45"
                  stroke="white"
                  strokeWidth={3}
                />
                <line
                  x1="200"
                  y1="0"
                  x2="200"
                  y2="90"
                  stroke="white"
                  strokeWidth={3}
                />
                <line
                  x1="100"
                  y1="0"
                  x2="100"
                  y2="90"
                  stroke="white"
                  strokeWidth={1.5}
                  opacity={0.5}
                />
                <line
                  x1="300"
                  y1="0"
                  x2="300"
                  y2="90"
                  stroke="white"
                  strokeWidth={1.5}
                  opacity={0.5}
                />
                <line
                  x1="0"
                  y1="20"
                  x2="400"
                  y2="20"
                  stroke="white"
                  strokeWidth={1.5}
                  opacity={0.5}
                />
                <line
                  x1="0"
                  y1="70"
                  x2="400"
                  y2="70"
                  stroke="white"
                  strokeWidth={1.5}
                  opacity={0.5}
                />
                <circle cx="200" cy="45" r="8" fill="#C8DC00" />
                <circle cx="200" cy="45" r="4" fill="#0d1945" />
                <text
                  x="212"
                  y="41"
                  fontSize="9"
                  fill="#0d1945"
                  fontFamily="Montserrat, sans-serif"
                  fontWeight="600"
                >
                  Anna Nagar Ext.
                </text>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
