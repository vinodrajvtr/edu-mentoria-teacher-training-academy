import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "about" },
  { label: "Courses", href: "courses" },
  { label: "Syllabus", href: "syllabus" },
  { label: "Internship", href: "internship" },
  { label: "Gallery", href: "gallery" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

interface NavbarProps {
  onEnrol?: () => void;
  onHome?: () => void;
}

export default function Navbar({ onEnrol, onHome }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleEnrol = () => {
    if (onEnrol) {
      onEnrol();
    } else {
      scrollTo("contact");
    }
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: "all 0.4s ease",
          background: scrolled ? "rgba(13,25,69,0.88)" : "rgba(13,25,69,1)",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,187,204,0.12)" : "none",
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
            height: 72,
          }}
        >
          {/* LEFT: Logo */}
          <button
            type="button"
            onClick={() => {
              if (onHome) {
                onHome();
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            aria-label="Edu Mentoria Home"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: 4,
                padding: "3px 6px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: 44,
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              <img
                src="/assets/edumentoria-logo-white-019d47e8-b158-7013-bbc0-e3feb097a213.png"
                alt="Edu Mentoria Logo"
                style={{
                  height: 36,
                  objectFit: "contain",
                  display: "block",
                }}
                loading="lazy"
              />
            </div>
          </button>

          {/* CENTER: Nav links desktop */}
          <div
            className="hidden md:flex"
            style={{ gap: 36, alignItems: "center" }}
          >
            {navLinks.map((link) => (
              <NavLink key={link.href} link={link} />
            ))}
          </div>

          {/* RIGHT: Enrol Now + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <motion.button
              type="button"
              onClick={handleEnrol}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 0 4px rgba(200,220,0,0.25)",
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                background: "#C8DC00",
                color: "#0d1945",
                borderRadius: 999,
                padding: "10px 24px",
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                fontFamily: "Montserrat, sans-serif",
                border: "none",
                cursor: "pointer",
              }}
              className="hidden md:inline-block"
              data-ocid="navbar.enrol_button"
            >
              Enrol Now
            </motion.button>

            <button
              type="button"
              className="md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              style={{
                color: "white",
                background: "transparent",
                border: "none",
                padding: 8,
                cursor: "pointer",
              }}
              data-ocid="navbar.hamburger_button"
            >
              <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }}>
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              background: "#0d1945",
              zIndex: 99,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              overflowY: "auto",
              paddingTop: 96,
              paddingBottom: 48,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
                width: "100%",
                flex: 1,
                justifyContent: "center",
                minHeight: "min-content",
              }}
            >
              {navLinks.map((link, i) => (
                <motion.button
                  type="button"
                  key={link.href}
                  onClick={() => {
                    setMobileOpen(false);
                    scrollTo(link.href);
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    color: "white",
                    fontSize: "clamp(20px, 6vw, 28px)",
                    fontWeight: 700,
                    fontFamily: "Montserrat, sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "3px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "14px 24px",
                    minHeight: 56,
                    width: "100%",
                    textAlign: "center",
                  }}
                  data-ocid={`navbar.${link.label.toLowerCase()}_link`}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  handleEnrol();
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                style={{
                  background: "#C8DC00",
                  color: "#0d1945",
                  borderRadius: 999,
                  padding: "14px 36px",
                  fontSize: 14,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  border: "none",
                  cursor: "pointer",
                  marginTop: 16,
                  minHeight: 52,
                }}
                data-ocid="navbar.mobile_enrol_button"
              >
                Enrol Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ link }: { link: { label: string; href: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={() => scrollTo(link.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: hovered ? "white" : "rgba(255,255,255,0.70)",
        background: "none",
        border: "none",
        cursor: "pointer",
        paddingBottom: 6,
        fontFamily: "Montserrat, sans-serif",
        transition: "color 0.2s",
      }}
      data-ocid={`navbar.${link.label.toLowerCase()}_link`}
    >
      {link.label}
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: hovered ? 4 : 0,
          height: 4,
          borderRadius: "50%",
          background: "#C8DC00",
          transition: "width 0.2s",
          display: "block",
        }}
      />
    </button>
  );
}
