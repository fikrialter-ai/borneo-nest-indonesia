import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { WhatsappLogo } from "@phosphor-icons/react";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import {
  Locale,
  useText,
  nav,
  wa,
  Header,
  Footer,
  NotFound,
} from "./components";
import Home from "./Home";
import {
  About,
  Products,
  ProductDetail,
  Process,
  Quality,
  Sustainability,
} from "./Pages";
import { Gallery, Contact } from "./Interactive";
import "./styles.css";
function RouteEffects() {
  const { pathname } = useLocation();
  const { lang } = useText();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const page = nav.find((n) => n[0] === pathname);
    document.title = `${page ? (lang === "en" ? page[1] : page[2]) : pathname.startsWith("/products/") ? (lang === "en" ? "Product details" : "Detail produk") : pathname === "/gallery" ? (lang === "en" ? "Gallery" : "Galeri") : "Borneo Nest"} | Borneo Nest Indonesia`;
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname, lang]);
  return null;
}
function App() {
  const [lang, setLanguage] = useState(() => {
    try {
      return localStorage.getItem("bn-language") === "id" ? "id" : "en";
    } catch {
      return "en";
    }
  });
  function setLang(value) {
    setLanguage(value);
    try {
      localStorage.setItem("bn-language", value);
    } catch {}
  }
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const t = (en, id) => (lang === "id" ? (id ?? en) : en);
  return (
    <Locale.Provider value={{ lang, setLang, t }}>
      <BrowserRouter>
        <a href="#main" className="skip-link">
          {t("Skip to content", "Lewati ke konten")}
        </a>
        <div id="top-marker" />
        <Header />
        <RouteEffects />
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
            <Route path="/process" element={<Process />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/sustainability" element={<Sustainability />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          className="floating-wa"
          aria-label={t("Chat on WhatsApp", "Chat di WhatsApp")}
        >
          <WhatsappLogo size={27} />
        </a>
      </BrowserRouter>
    </Locale.Provider>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
