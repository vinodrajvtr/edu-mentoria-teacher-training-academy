import { motion } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

export default function Footer() {
  const [logoError, setLogoError] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#0d1945",
        borderTop: "1px solid rgba(200,220,0,0.40)",
        padding: "40px 0",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {!logoError ? (
              <img
                src="/assets/uploads/edu_mentoria_logo-019d32d2-c508-74be-b0a0-80f228ef99a2-2.png"
                alt="Edu Mentoria"
                height={48}
                style={{
                  height: 48,
                  objectFit: "contain",
                  mixBlendMode: "screen",
                  background: "transparent",
                }}
                onError={() => setLogoError(true)}
                loading="lazy"
              />
            ) : (
              <div
                style={{
                  height: 48,
                  width: 64,
                  background: "#C8DC00",
                  borderRadius: 4,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 800,
                  color: "#0d1945",
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                EM
              </div>
            )}
          </div>
          <span
            style={{
              fontSize: 10,
              fontWeight: 400,
              color: "rgba(255,255,255,0.35)",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Teacher Training Academy
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              marginTop: 2,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#00BBCC",
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "rgba(255,255,255,0.28)",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Powered by Phonic Champs
            </span>
          </div>
        </div>

        {/* CENTER */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.28)",
              margin: 0,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            &copy; {year} Edu Mentoria Teacher Training Academy. All rights
            reserved.
          </p>
        </div>

        {/* RIGHT */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.20)",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            Chennai, Tamil Nadu, India
          </span>
          <div style={{ display: "flex", gap: 8 }}>
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
                  background: "rgba(0,187,204,0.20)",
                  color: "#00BBCC",
                }}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.50)",
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                }}
                data-ocid={`footer.${label.toLowerCase()}_button`}
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
