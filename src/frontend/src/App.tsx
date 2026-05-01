import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Courses from "./components/Courses";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Internship from "./components/Internship";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";
import Syllabus from "./components/Syllabus";
import { useScrollProgress } from "./hooks/useScrollProgress";
import EnrolPage from "./pages/EnrolPage";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState<"home" | "enrol">("home");
  const progress = useScrollProgress();

  const goEnrol = () => {
    setPage("enrol");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goHome = () => {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "enrol") {
    return <EnrolPage onBack={goHome} />;
  }

  return (
    <>
      <CustomCursor />
      <PageLoader onComplete={() => setLoaded(true)} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Scroll progress bar */}
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "#C8DC00",
            transformOrigin: "left",
            scaleX: progress,
            zIndex: 200,
          }}
        />
        <Navbar onEnrol={goEnrol} />
        <main>
          <Hero />
          <About />
          <Courses />
          <Syllabus />
          <Internship />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
