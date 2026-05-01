import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import Marquee from "./Marquee";

const ALL_IMAGES = [
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.10_pm_1-019d32d2-c529-772c-9475-2feb4274143b.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.09_pm_2-019d32d2-c4b8-710c-aa2c-05c7f003b558.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.10_pm-019d32d2-c559-71ed-8d93-f9cb32ef5734.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.08_pm-019d32d2-c584-7488-b8f2-97f1218b0b88.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.11_pm_1-019d32d2-c5d5-73cf-89aa-b719b947f7cf.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.10_pm_2-019d32d2-c5cf-71ae-b310-f865172cf4b6.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.12_pm_1-019d32d2-c5e3-74ab-a190-cdc1ad8d2a7b.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.11_pm-019d32d2-c5f3-711b-b734-f752cdd22f13.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.09_pm_1-019d32d2-c654-7603-8a76-ea75b64efb41.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.07_pm-019d32d2-c651-75ef-9620-1fcdfcff4d6c.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.09_pm-019d32d2-c62f-72fc-9daf-e712ce75704c.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.12_pm_2-019d32d2-c696-7329-bce0-588bd20eb9f3.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.13_pm_1-019d32d2-c7b8-744c-8ed9-5b4863f1f8c0.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.13_pm_2-019d32d2-c7ac-77e7-9ae1-ed06ecdfc770.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_4.48.14_pm_1-019d32d2-c7de-721b-9590-ccf9d8ef4032.jpeg",
  "/assets/uploads/whatsapp_image_2026-03-14_at_5.20.04_pm-019d32d2-c7a6-708d-9f62-fac148723220.jpeg",
];

const GRID_IMAGES = ALL_IMAGES.slice(0, 6);

export default function Gallery() {
  const [slideshow, setSlideshow] = useState<{ open: boolean; index: number }>({
    open: false,
    index: 6,
  });

  const openSlideshow = (index: number) => setSlideshow({ open: true, index });
  const closeSlideshow = useCallback(
    () => setSlideshow((s) => ({ ...s, open: false })),
    [],
  );
  const prev = useCallback(
    () =>
      setSlideshow((s) => ({
        ...s,
        index: (s.index - 1 + ALL_IMAGES.length) % ALL_IMAGES.length,
      })),
    [],
  );
  const next = useCallback(
    () =>
      setSlideshow((s) => ({ ...s, index: (s.index + 1) % ALL_IMAGES.length })),
    [],
  );

  useEffect(() => {
    if (!slideshow.open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") closeSlideshow();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [slideshow.open, prev, next, closeSlideshow]);

  return (
    <section
      id="gallery"
      style={{
        background: "#F2F5FF",
        position: "relative",
        overflow: "hidden",
        padding: "100px 0",
      }}
    >
      <div
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
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          style={{ marginBottom: 48 }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#1A2B8C",
              marginBottom: 16,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            GALLERY
          </div>
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(36px,5vw,56px)",
                fontWeight: 300,
                color: "#1A2B8C",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Life at
            </h2>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(36px,5vw,56px)",
                fontWeight: 900,
                color: "#1A2B8C",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              Edu Mentoria.
            </h2>
          </div>
        </motion.div>

        {/* Uniform grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {GRID_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={() => openSlideshow(i)}
              style={{
                height: 280,
                borderRadius: 10,
                overflow: "hidden",
                cursor: "pointer",
                willChange: "transform",
                position: "relative",
              }}
              data-ocid={`gallery.item.${i + 1}`}
            >
              <img
                src={src}
                alt={`Edu Mentoria gallery ${i + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(13,25,69,0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    fontFamily: "Montserrat, sans-serif",
                    background: "rgba(200,220,0,0.85)",
                    color: "#0d1945",
                    padding: "6px 14px",
                    borderRadius: 999,
                  }}
                >
                  View
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Gallery button */}
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
        >
          <motion.button
            type="button"
            onClick={() => openSlideshow(6)}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 0 5px rgba(200,220,0,0.25)",
            }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: "#C8DC00",
              color: "#0d1945",
              border: "none",
              borderRadius: 999,
              padding: "14px 40px",
              fontSize: 12,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Montserrat, sans-serif",
              cursor: "pointer",
            }}
            data-ocid="gallery.open_modal_button"
          >
            View Gallery
          </motion.button>
        </div>
      </div>

      {/* Dual marquee strips */}
      <div style={{ marginTop: 48 }}>
        <Marquee
          text="TRAINING SESSIONS · CLASSROOM ACTIVITY · INTERNSHIP DAYS · GRADUATION CEREMONY · MONTESSORI WORKSHOP · CAMPUS LIFE · STUDENT PROJECTS · FACULTY TEAM · "
          direction="left"
          bgColor="#1A2B8C"
          textColor="white"
          fontSize="20px"
        />
        <Marquee
          text="ART AND CRAFT · FIELD VISITS · ANNUAL DAY · AWARD CEREMONY · GUEST LECTURES · LIBRARY SESSIONS · ROLE PLAY ACTIVITY · PARENT INTERACTIONS · "
          direction="right"
          bgColor="#C8DC00"
          textColor="#0d1945"
          fontSize="20px"
        />
      </div>

      {/* Slideshow popup */}
      <AnimatePresence>
        {slideshow.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeSlideshow}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.92)",
              zIndex: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            data-ocid="gallery.modal"
          >
            <div
              style={{
                position: "absolute",
                top: 24,
                right: 72,
                fontSize: 13,
                fontWeight: 600,
                color: "rgba(255,255,255,0.70)",
                fontFamily: "Montserrat, sans-serif",
                zIndex: 10,
              }}
            >
              {slideshow.index + 1} / {ALL_IMAGES.length}
            </div>
            <button
              type="button"
              onClick={closeSlideshow}
              aria-label="Close gallery"
              style={{
                position: "absolute",
                top: 20,
                right: 24,
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
                zIndex: 10,
              }}
              data-ocid="gallery.close_button"
            >
              <X size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              style={{
                position: "absolute",
                left: 24,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.18)",
                border: "none",
                borderRadius: "50%",
                width: 52,
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
                zIndex: 10,
              }}
              data-ocid="gallery.pagination_prev"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              style={{
                position: "absolute",
                right: 24,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.18)",
                border: "none",
                borderRadius: "50%",
                width: 52,
                height: 52,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "white",
                zIndex: 10,
              }}
              data-ocid="gallery.pagination_next"
            >
              <ChevronRight size={28} />
            </button>
            <AnimatePresence mode="wait">
              <motion.img
                key={slideshow.index}
                src={ALL_IMAGES[slideshow.index]}
                alt={`Edu Mentoria gallery ${slideshow.index + 1}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxHeight: "80vh",
                  maxWidth: "90vw",
                  objectFit: "contain",
                  borderRadius: 8,
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                  display: "block",
                }}
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
