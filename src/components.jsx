import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Leaf,
  Handshake,
  ShieldCheck,
  Package,
  List,
  X,
  GlobeHemisphereEast,
  DownloadSimple,
  CaretDown,
} from "@phosphor-icons/react";
import { products, faqs } from "./data";
export const Locale = createContext();
export const useText = () => useContext(Locale);
export const wa = "https://wa.me/6281254642859";
export const nav = [
  ["/", "Home", "Beranda"],
  ["/about", "About", "Tentang"],
  ["/products", "Products", "Produk"],
  ["/process", "Process", "Proses"],
  ["/quality", "Quality", "Kualitas"],
  ["/sustainability", "Sustainability", "Keberlanjutan"],
  ["/contact", "Contact", "Kontak"],
];
export function Picture({ name, alt, className = "", eager = false }) {
  return (
    <img
      className={className}
      src={`/assets/${name}`}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      width="1200"
      height="900"
    />
  );
}
export function Button({
  to,
  children,
  outline = false,
  className = "",
  ...props
}) {
  return (
    <Link
      to={to}
      className={`button ${outline ? "outline" : ""} ${className}`}
      {...props}
    >
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
export function Brand() {
  return (
    <Link className="brand" to="/">
      <img src="/assets/logo.png" alt="" width="58" height="43" />
      <span>
        BORNEO NEST<small>INDONESIA</small>
      </span>
    </Link>
  );
}
export function Header() {
  const { t, lang, setLang } = useText();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setSolid(!entry.isIntersecting),
    );
    const target = document.getElementById("top-marker");
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    function key(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, []);
  return (
    <header
      className={`header ${solid || location.pathname !== "/" || open ? "solid" : ""}`}
    >
      <div className="nav-wrap">
        <Brand />
        <nav
          id="main-nav"
          aria-label={t("Main navigation", "Navigasi utama")}
          className={open ? "is-open" : ""}
        >
          {nav.map(([path, en, id]) => (
            <NavLink key={path} to={path} end={path === "/"}>
              {t(en, id)}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            className="language"
            onClick={() => setLang(lang === "en" ? "id" : "en")}
            aria-label={`${lang.toUpperCase()}: ${t("Switch to Bahasa Indonesia", "Switch to English")}`}
          >
            <GlobeHemisphereEast size={17} />
            {lang.toUpperCase()}
            <CaretDown size={11} />
          </button>
          <Button to="/contact" className="nav-cta">
            {t("Contact Us", "Hubungi Kami")}
          </Button>
          <button
            className="menu-toggle"
            aria-label={t(
              open ? "Close menu" : "Open menu",
              open ? "Tutup menu" : "Buka menu",
            )}
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
export function Footer() {
  const { t } = useText();
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>
            {t(
              "From Kalimantan, with care.",
              "Dari Kalimantan, dengan ketelitian.",
            )}
            <br />
            {t(
              "Premium bird nest. Lasting partnerships.",
              "Sarang walet premium. Kemitraan berkelanjutan.",
            )}
          </p>
        </div>
        <div>
          <h3>{t("Discover", "Jelajahi")}</h3>
          <Link to="/about">{t("Our company", "Perusahaan kami")}</Link>
          <Link to="/products">{t("Our products", "Produk kami")}</Link>
          <Link to="/process">{t("Our process", "Proses kami")}</Link>
          <Link to="/gallery">{t("Gallery", "Galeri")}</Link>
        </div>
        <div>
          <h3>{t("Build a partnership", "Bangun kemitraan")}</h3>
          <Link to="/contact">
            {t("Business inquiries", "Permintaan bisnis")}
          </Link>
          <a href={wa} target="_blank" rel="noreferrer">
            +62 812-5464-2859 <ArrowUpRight />
          </a>
          <span>Kalimantan, Indonesia</span>
          <a href="/company-profile.pdf" download>
            {t("Download Company Profile", "Unduh Profil Perusahaan")}{" "}
            <DownloadSimple />
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Borneo Nest Indonesia</span>
        <span>
          {t(
            "Naturally sourced. Carefully processed.",
            "Bersumber alami. Diproses dengan teliti.",
          )}
        </span>
      </div>
    </footer>
  );
}
export function Intro({ title, description, label }) {
  const { t } = useText();
  return (
    <section className="page-intro container">
      {label && <span className="eyebrow">{t(...label)}</span>}
      <h1>{t(...title)}</h1>
      {description && <p>{t(...description)}</p>}
    </section>
  );
}
export function Cta() {
  const { t } = useText();
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <div>
          <h2>
            {t(
              "Good partnerships start with a conversation.",
              "Kemitraan baik dimulai dari percakapan.",
            )}
          </h2>
          <p>
            {t(
              "Tell us what your business needs. Let’s find the right bird nest for you.",
              "Ceritakan kebutuhan bisnis Anda. Temukan sarang walet yang sesuai bersama kami.",
            )}
          </p>
        </div>
        <Button to="/contact">
          {t("Let’s Talk Business", "Diskusikan Kebutuhan Anda")}
        </Button>
      </div>
    </section>
  );
}
export function ProductCards() {
  const { t } = useText();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-7 product-grid">
      {products.map((p, i) => (
        <article className="product-card" key={p.slug}>
          <Link
            to={`/products/${p.slug}`}
            className={`product-image product-${i}`}
          >
            <Picture name={p.image} alt={t(...p.name)} />
            <span className="image-link">
              <ArrowUpRight size={23} />
            </span>
          </Link>
          <div className="product-meta">
            <span>{t(...p.grade)}</span>
            <span>0{i + 1}</span>
          </div>
          <h3>
            <Link to={`/products/${p.slug}`}>{t(...p.name)}</Link>
          </h3>
          <p>{t(...p.description)}</p>
          <Link className="text-link" to={`/products/${p.slug}`}>
            {t("View Detail", "Lihat Detail")}
            <ArrowRight size={17} />
          </Link>
        </article>
      ))}
    </div>
  );
}
export function Faq() {
  const { t } = useText();
  return (
    <section className="section container faq-section">
      <div>
        <h2>{t("A little more clarity.", "Informasi yang Anda perlukan.")}</h2>
        <p>
          {t(
            "Common questions from our business partners.",
            "Pertanyaan umum dari mitra bisnis kami.",
          )}
        </p>
      </div>
      <div>
        {faqs.map(([q, a]) => (
          <details key={q[0]}>
            <summary>
              {t(...q)}
              <CaretDown size={18} />
            </summary>
            <p>{t(...a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function NotFound() {
  const { t } = useText();
  return (
    <section className="container not-found">
      <span>404</span>
      <h1>{t("This page could not be found.", "Halaman tidak ditemukan.")}</h1>
      <Button to="/">{t("Back to Home", "Kembali ke Beranda")}</Button>
    </section>
  );
}
