import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface EnrolPageProps {
  onBack: () => void;
}

// ──────────────────────────────────────────────────────────────
// Custom accessible dropdown
// ──────────────────────────────────────────────────────────────
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CustomSelectProps {
  id?: string;
  name: string;
  value: string;
  options: SelectOption[];
  placeholder?: string;
  hasError?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

function CustomSelect({
  id,
  name,
  value,
  options,
  placeholder,
  hasError = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  onChange,
  style,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const listboxId = `listbox-${id ?? generatedId}`;

  const selectedOption = options.find((o) => o.value === value);
  const displayLabel = selectedOption
    ? selectedOption.label
    : (placeholder ?? "Select an option");

  const close = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open, close]);

  // Scroll active item into view
  useEffect(() => {
    if (open && activeIndex >= 0 && listRef.current) {
      const items =
        listRef.current.querySelectorAll<HTMLDivElement>("[data-option]");
      items[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [open, activeIndex]);

  function handleKeyDown(e: React.KeyboardEvent) {
    const enabledOptions = options.filter((o) => !o.disabled);
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
        const idx = enabledOptions.findIndex((o) => o.value === value);
        setActiveIndex(idx >= 0 ? idx : 0);
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, enabledOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (activeIndex >= 0) {
        onChange(enabledOptions[activeIndex].value);
        close();
      }
    } else if (e.key === "Tab") {
      close();
    }
  }

  const triggerBorder = hasError
    ? "1.5px solid #e94040"
    : open
      ? "1.5px solid #C8DC00"
      : "1.5px solid rgba(0,187,204,0.20)";

  const triggerBg = hasError
    ? "rgba(233,64,64,0.10)"
    : "rgba(255,255,255,0.06)";

  // Compute active index into the full options list for aria-activedescendant
  const enabledOptions = options.filter((o) => !o.disabled);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", ...style }}
      // Hidden native select for form submission compatibility
    >
      {/* Hidden native input to carry the value in form data */}
      <input type="hidden" name={name} value={value} />

      {/* Trigger — button (natively keyboard-focusable) */}
      <button
        id={id}
        type="button"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        onClick={() => {
          if (open) {
            close();
          } else {
            setOpen(true);
            const idx = enabledOptions.findIndex((o) => o.value === value);
            setActiveIndex(idx >= 0 ? idx : -1);
          }
        }}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          background: triggerBg,
          border: triggerBorder,
          borderRadius: 10,
          padding: "13px 40px 13px 16px",
          fontFamily: "Montserrat, sans-serif",
          fontSize: 14,
          fontWeight: 400,
          color: selectedOption ? "#fff" : "rgba(255,255,255,0.35)",
          outline: "none",
          boxSizing: "border-box",
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          transition: "border-color 0.2s",
        }}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            flex: 1,
            minWidth: 0,
          }}
        >
          {displayLabel}
        </span>
        <span
          style={{
            position: "absolute",
            right: 14,
            top: "50%",
            transform: `translateY(-50%) rotate(${open ? 180 : 0}deg)`,
            transition: "transform 0.22s ease",
            display: "flex",
            alignItems: "center",
            color: open ? "#C8DC00" : "rgba(255,255,255,0.55)",
            pointerEvents: "none",
          }}
        >
          <ChevronDown size={16} strokeWidth={2.5} />
        </span>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={listRef}
            id={listboxId}
            aria-label={ariaLabel}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              right: 0,
              zIndex: 100,
              background: "#0a1235",
              border: "1.5px solid rgba(0,187,204,0.30)",
              borderRadius: 12,
              padding: "6px 0",
              margin: 0,
              boxShadow: "0 12px 40px rgba(0,0,0,0.40)",
              maxHeight: 260,
              overflowY: "auto",
            }}
          >
            {enabledOptions.map((opt, idx) => {
              const isSelected = opt.value === value;
              const isActive = idx === activeIndex;
              return (
                <div
                  key={opt.value}
                  id={`${listboxId}-opt-${idx}`}
                  data-option="true"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(opt.value);
                    close();
                  }}
                  style={{
                    padding: "11px 18px",
                    fontSize: 14,
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: isSelected ? 700 : 400,
                    color: isSelected ? "#C8DC00" : "#fff",
                    background: isActive
                      ? "rgba(0,187,204,0.10)"
                      : "transparent",
                    borderLeft: isActive
                      ? "3px solid #00BBCC"
                      : "3px solid transparent",
                    cursor: "pointer",
                    transition: "background 0.12s, border-color 0.12s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      flex: 1,
                      minWidth: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {opt.label}
                  </span>
                  {isSelected && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                      style={{ flexShrink: 0, marginLeft: 8 }}
                    >
                      <path
                        d="M2 7l3.5 3.5L12 3.5"
                        stroke="#C8DC00"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Option lists
// ──────────────────────────────────────────────────────────────
const COUNTRY_CODES: SelectOption[] = [
  { value: "+91", label: "+91 (India)" },
  { value: "+1", label: "+1 (USA)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+61", label: "+61 (Australia)" },
  { value: "+971", label: "+971 (UAE)" },
  { value: "+65", label: "+65 (Singapore)" },
  { value: "+60", label: "+60 (Malaysia)" },
];

const COURSE_OPTIONS: SelectOption[] = [
  { value: "", label: "Select a programme", disabled: true },
  {
    value: "ecce-12",
    label: "Early Childhood Care and Education (ECCE) - 12 Months",
  },
  { value: "montessori-12", label: "Montessori Teacher Training - 12 Months" },
  {
    value: "ecce-6",
    label: "Early Childhood Care and Education (ECCE) - 6 Months",
  },
  { value: "montessori-6", label: "Montessori Teacher Training - 6 Months" },
  { value: "not-sure", label: "Not Sure Yet / General Enquiry" },
];

const SOURCE_OPTIONS: SelectOption[] = [
  { value: "", label: "Select an option", disabled: true },
  { value: "google", label: "Google Search" },
  { value: "social-media", label: "Social Media (Instagram/Facebook)" },
  { value: "word-of-mouth", label: "Word of Mouth" },
  { value: "school-referral", label: "School/College Referral" },
  { value: "advertisement", label: "Advertisement" },
  { value: "other", label: "Other" },
];

// ──────────────────────────────────────────────────────────────
// Main page
// ──────────────────────────────────────────────────────────────
export default function EnrolPage({ onBack }: EnrolPageProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    countryCode: "+91",
    email: "",
    course: "",
    source: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name])
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name])
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2)
      errs.fullName = "Please enter your full name.";
    if (!form.phone.trim() || !/^\d{7,15}$/.test(form.phone.replace(/\s/g, "")))
      errs.phone = "Please enter a valid contact number.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Please enter a valid email address.";
    if (!form.course) errs.course = "Please select a course of interest.";
    if (!form.message.trim() || form.message.trim().length < 10)
      errs.message = "Please enter a message (at least 10 characters).";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contactChips = [
    {
      bg: "rgba(0,187,204,0.18)",
      label: "Address",
      value: "W445, 5th Street, C Sector, Anna Nagar Extension, Chennai 600102",
      href: undefined as string | undefined,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 1.5C6.41 1.5 3.5 4.41 3.5 8c0 5 6.5 10.5 6.5 10.5S16.5 13 16.5 8C16.5 4.41 13.59 1.5 10 1.5z"
            stroke="#00BBCC"
            strokeWidth="1.5"
          />
          <circle cx="10" cy="8" r="2.2" stroke="#00BBCC" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      bg: "rgba(200,220,0,0.18)",
      label: "Phone",
      value: "+91 96776 23444 · +91 99412 12831",
      href: "tel:+919677623444",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2.5 4a1 1 0 011-1h2.7l1.4 3.5-1.8 1.3a9.5 9.5 0 004.6 4.6l1.3-1.8 3.5 1.4v2.7a1 1 0 01-1 1C7.6 15.7 2.5 9.9 2.5 5V4z"
            stroke="#C8DC00"
            strokeWidth="1.5"
          />
        </svg>
      ),
    },
    {
      bg: "rgba(0,187,204,0.18)",
      label: "Email",
      value: "edumentoria08@gmail.com",
      href: "mailto:edumentoria08@gmail.com",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="2"
            y="4"
            width="16"
            height="12"
            rx="2.5"
            stroke="#00BBCC"
            strokeWidth="1.5"
          />
          <path
            d="M2 4l8 7 8-7"
            stroke="#00BBCC"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  const whyChooseItems = [
    {
      n: "1",
      t: "Structured, Accredited Diplomas",
      d: "Both programmes blend rigorous theory with hands-on classroom practicals in a fully accredited framework.",
    },
    {
      n: "2",
      t: "30-Day School Internship",
      d: "Every student completes a full internship at Phonic Champs, gaining live classroom experience before graduating.",
    },
    {
      n: "3",
      t: "Expert Faculty",
      d: "Our instructors bring years of real-world pre-primary and Montessori teaching experience to every session.",
    },
    {
      n: "4",
      t: "Flexible Programme Lengths",
      d: "Choose between a 12-month diploma or a 6-month Montessori-focused programme based on your goals.",
    },
  ];

  const officeHours = [
    { day: "Monday", time: "9:00 AM – 5:00 PM" },
    { day: "Tuesday", time: "9:00 AM – 5:00 PM" },
    { day: "Wednesday", time: "9:00 AM – 5:00 PM" },
    { day: "Thursday", time: "9:00 AM – 5:00 PM" },
    { day: "Friday", time: "9:00 AM – 4:00 PM" },
    { day: "Saturday", time: "10:00 AM – 1:00 PM" },
    { day: "Sunday", time: null },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a1235",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      <Navbar onHome={onBack} />

      {/* ── SECTION 1: Hero ── */}
      <div
        style={{
          background: "#0d1945",
          padding: "160px 32px 100px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            background: "rgba(0,187,204,0.07)",
            borderRadius: "50%",
            top: -200,
            right: -100,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            background: "rgba(200,220,0,0.05)",
            borderRadius: "50%",
            bottom: -160,
            left: 60,
            pointerEvents: "none",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(200,220,0,0.12)",
              border: "1px solid rgba(200,220,0,0.30)",
              color: "#C8DC00",
              padding: "7px 16px",
              borderRadius: 999,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
              <circle cx="4" cy="4" r="4" fill="#C8DC00" />
            </svg>
            Enquiries Welcome
          </div>

          <h1
            style={{
              fontSize: "clamp(36px,5vw,68px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.0,
              letterSpacing: "-2px",
              marginBottom: 24,
            }}
          >
            Let&apos;s Talk About
            <br />
            <span style={{ color: "#C8DC00" }}>Your Future</span>
          </h1>

          <p
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.78,
              marginBottom: 52,
              maxWidth: 580,
              margin: "0 auto 52px",
            }}
          >
            Whether you are ready to enrol, exploring your options, or simply
            want to learn more about our courses, our team is here to help. Fill
            in the form and we will be in touch within 24 hours.
          </p>

          <div
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
            className="enrol-chips-row"
          >
            {contactChips.map((chip) => (
              <div
                key={chip.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  borderRadius: 16,
                  padding: "14px 20px",
                  flex: "1 1 220px",
                  maxWidth: 320,
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: chip.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {chip.icon}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.45)",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      marginBottom: 3,
                    }}
                  >
                    {chip.label}
                  </div>
                  {chip.href ? (
                    <a
                      href={chip.href}
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#fff",
                        textDecoration: "none",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        display: "block",
                        maxWidth: "100%",
                      }}
                    >
                      {chip.value}
                    </a>
                  ) : (
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#fff",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                      }}
                    >
                      {chip.value}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Diagonal SVG divider ── */}
      <div style={{ marginTop: -2, lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 60"
          aria-hidden="true"
          style={{ width: "100%", display: "block" }}
        >
          <polygon points="0,0 1440,60 1440,0" fill="#0a1235" />
          <polygon points="0,0 0,60 1440,60" fill="#0d1945" />
        </svg>
      </div>

      {/* ── SECTION 2: Form (left) + Why Choose & Office Hours stacked (right) ── */}
      <div
        style={{
          background: "#0a1235",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            pointerEvents: "none",
          }}
        />
        {/* Teal glow blob top-right */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            background: "rgba(0,187,204,0.06)",
            borderRadius: "50%",
            top: -120,
            right: -150,
            pointerEvents: "none",
          }}
        />
        {/* Lime glow blob bottom-left */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            background: "rgba(200,220,0,0.05)",
            borderRadius: "50%",
            bottom: -100,
            left: -120,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "80px 32px 80px",
            position: "relative",
          }}
          className="enrol-form-section"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "55fr 45fr",
              gap: 32,
              alignItems: "start",
            }}
            className="enrol-form-layout"
          >
            {/* ── LEFT: Send an Enquiry form ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: "rgba(255,255,255,0.04)",
                borderRadius: 28,
                padding: 52,
                border: "1px solid rgba(0,187,204,0.18)",
                borderLeft: "3px solid #C8DC00",
                boxShadow:
                  "0 8px 60px rgba(0,187,204,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              className="enrol-form-card"
            >
              {submitted ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "32px 0",
                    background: "rgba(0,187,204,0.08)",
                    border: "1.5px solid rgba(0,187,204,0.30)",
                    borderRadius: 20,
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      background: "#00BBCC",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 14px",
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 14l6 6L23 8"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h4
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#C8DC00",
                      marginBottom: 6,
                    }}
                  >
                    Thank You for Your Enquiry!
                  </h4>
                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.70)",
                      lineHeight: 1.65,
                      margin: "0 0 20px",
                    }}
                  >
                    We have received your message and our admissions team will
                    get back to you within one working day.
                  </p>
                  <button
                    type="button"
                    onClick={onBack}
                    style={{
                      background: "#0d1945",
                      color: "white",
                      border: "none",
                      borderRadius: 999,
                      padding: "12px 28px",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "Montserrat, sans-serif",
                    }}
                  >
                    ← Back to Home
                  </button>
                </div>
              ) : (
                <>
                  <h2
                    style={{
                      fontSize: 26,
                      fontWeight: 800,
                      color: "#fff",
                      marginBottom: 8,
                      letterSpacing: "-.3px",
                    }}
                  >
                    Send an Enquiry
                  </h2>
                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.60)",
                      marginBottom: 36,
                      lineHeight: 1.6,
                    }}
                  >
                    Fill in the details below and our admissions team will
                    respond within one working day.
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    <Field
                      id="fullName"
                      label="Full Name"
                      required
                      error={errors.fullName}
                    >
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Priya Ramesh"
                        autoComplete="name"
                        style={fieldStyle(!!errors.fullName)}
                      />
                    </Field>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 18,
                      }}
                      className="enrol-row"
                    >
                      <Field
                        id="phone"
                        label="Contact Number"
                        required
                        error={errors.phone}
                      >
                        <div style={{ display: "flex", gap: 10 }}>
                          <div style={{ flexShrink: 0, width: 110 }}>
                            <CustomSelect
                              name="countryCode"
                              value={form.countryCode}
                              options={COUNTRY_CODES}
                              aria-label="Country code"
                              onChange={handleSelectChange("countryCode")}
                              style={{ width: 110 }}
                            />
                          </div>
                          <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="98765 43210"
                            autoComplete="tel"
                            style={{ ...fieldStyle(!!errors.phone), flex: 1 }}
                          />
                        </div>
                      </Field>
                      <Field
                        id="email"
                        label="Email Address"
                        required
                        error={errors.email}
                      >
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          autoComplete="email"
                          style={fieldStyle(!!errors.email)}
                        />
                      </Field>
                    </div>

                    <Field
                      id="course"
                      label="Course of Interest"
                      required
                      error={errors.course}
                    >
                      <CustomSelect
                        id="course"
                        name="course"
                        value={form.course}
                        options={COURSE_OPTIONS.filter(
                          (o) => !o.disabled || o.value === "",
                        )}
                        placeholder="Select a programme"
                        hasError={!!errors.course}
                        aria-labelledby="course-label"
                        onChange={handleSelectChange("course")}
                      />
                    </Field>

                    <Field id="source" label="How Did You Hear About Us?">
                      <CustomSelect
                        id="source"
                        name="source"
                        value={form.source}
                        options={SOURCE_OPTIONS.filter(
                          (o) => !o.disabled || o.value === "",
                        )}
                        placeholder="Select an option"
                        aria-labelledby="source-label"
                        onChange={handleSelectChange("source")}
                      />
                    </Field>

                    <Field
                      id="message"
                      label="Message"
                      required
                      error={errors.message}
                    >
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us a bit about yourself and any questions you have about the programmes..."
                        rows={5}
                        style={{
                          ...fieldStyle(!!errors.message),
                          resize: "vertical",
                          lineHeight: 1.6,
                          minHeight: 120,
                        }}
                      />
                    </Field>

                    <p
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.40)",
                        lineHeight: 1.65,
                        marginBottom: 20,
                      }}
                    >
                      By submitting this form, you agree to being contacted by
                      the Edu Mentoria admissions team regarding your enquiry.
                      We respect your privacy and will never share your details
                      with third parties.
                    </p>

                    <motion.button
                      type="submit"
                      whileHover={{
                        y: -2,
                        boxShadow: "0 10px 30px rgba(200,220,0,0.30)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: "100%",
                        background: "#C8DC00",
                        color: "#0d1945",
                        border: "none",
                        borderRadius: 999,
                        padding: "16px 32px",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: 15,
                        fontWeight: 800,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                        marginTop: 8,
                        letterSpacing: ".3px",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1.5 9l6 6L16.5 3"
                          stroke="#0d1945"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Submit Enquiry
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>

            {/* ── RIGHT: Why Choose + Office Hours stacked ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Why Choose Edu Mentoria */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  background: "#0d1945",
                  borderRadius: 28,
                  padding: 36,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: 280,
                    height: 280,
                    background: "rgba(0,187,204,0.10)",
                    borderRadius: "50%",
                    bottom: -100,
                    right: -70,
                    pointerEvents: "none",
                  }}
                />
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#fff",
                    marginBottom: 24,
                    letterSpacing: "-.2px",
                  }}
                >
                  Why Choose Edu Mentoria?
                </h3>
                {whyChooseItems.map((item) => (
                  <div
                    key={item.n}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 9,
                        background: "rgba(200,220,0,0.20)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 800,
                        color: "#C8DC00",
                        flexShrink: 0,
                      }}
                    >
                      {item.n}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#fff",
                          marginBottom: 3,
                        }}
                      >
                        {item.t}
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 400,
                          color: "rgba(255,255,255,0.60)",
                          lineHeight: 1.6,
                        }}
                      >
                        {item.d}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Office Hours — lime/green background */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="enrol-office-hours-card"
                style={{ background: "#C8DC00", borderRadius: 28, padding: 36 }}
              >
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#0d1945",
                    marginBottom: 20,
                  }}
                >
                  Office Hours
                </h3>
                {officeHours.map((row) => (
                  <div
                    key={row.day}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(13,25,69,0.10)",
                      fontSize: 13,
                      gap: 8,
                    }}
                  >
                    <span
                      style={{ fontWeight: 600, color: "#0d1945", minWidth: 0 }}
                    >
                      {row.day}
                    </span>
                    {row.time ? (
                      <span
                        style={{
                          fontWeight: 700,
                          color: "#0d1945",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {row.time}
                      </span>
                    ) : (
                      <span
                        style={{
                          fontWeight: 600,
                          color: "rgba(13,25,69,0.45)",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        Closed
                      </span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .enrol-chips-row { flex-direction: column !important; align-items: stretch !important; }
          .enrol-chips-row > div { max-width: 100% !important; flex: unset !important; }
          .enrol-form-layout { grid-template-columns: 1fr !important; }
          .enrol-form-section { padding: 48px 22px 60px !important; }
          .enrol-form-card { padding: 32px 24px !important; }
          .enrol-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .enrol-office-hours-card { padding: 24px 20px !important; }
        }
        .enrol-form-card input::placeholder,
        .enrol-form-card textarea::placeholder { color: rgba(255,255,255,0.35); }
      `}</style>

      <Footer />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Shared helpers
// ──────────────────────────────────────────────────────────────
function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 7,
        marginBottom: 20,
      }}
    >
      <label
        id={`${id}-label`}
        htmlFor={id}
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#C8DC00",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
        }}
      >
        {label}
        {required && <span style={{ color: "#C8DC00", marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: 11, fontWeight: 600, color: "#e94040" }}>
          {error}
        </span>
      )}
    </div>
  );
}

function fieldStyle(hasError: boolean): React.CSSProperties {
  return {
    width: "100%",
    background: hasError ? "rgba(233,64,64,0.10)" : "rgba(255,255,255,0.06)",
    border: `1.5px solid ${hasError ? "#e94040" : "rgba(0,187,204,0.20)"}`,
    borderRadius: 10,
    padding: "13px 16px",
    fontFamily: "Montserrat, sans-serif",
    fontSize: 14,
    fontWeight: 400,
    color: "#fff",
    outline: "none",
    boxSizing: "border-box",
  };
}
