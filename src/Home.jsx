import React from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  ShieldCheck,
  Package,
  Handshake,
  ArrowUpRight,
  ArrowRight,
  DownloadSimple,
} from "@phosphor-icons/react";
import { useText, Picture, Button, Cta, ProductCards, Faq } from "./components";
import { steps } from "./data";
import HeroVideo from "./HeroVideo";
export default function Home() {
  const { t } = useText();
  const trust = [
    [Leaf, ["Direct from Kalimantan", "Langsung dari Kalimantan"]],
    [ShieldCheck, ["Quality at every step", "Kualitas di setiap tahap"]],
    [Package, ["Carefully processed", "Diproses dengan teliti"]],
    [Handshake, ["Built for partnership", "Untuk kemitraan bisnis"]],
  ];
  return (
    <>
      <section className="hero">
        <HeroVideo />
        <div className="hero-shade" />
        <div className="container hero-content">
          <span className="eyebrow">
            {t(
              "ROOTED IN NATURE. REFINED WITH CARE.",
              "DARI ALAM. DIOLAH DENGAN TELITI.",
            )}
          </span>
          <h1>
            {t(
              "Premium Indonesian Bird Nest",
              "Sarang Walet Premium Indonesia",
            )}
            <span>{t("From Kalimantan", "Dari Kalimantan")}</span>
          </h1>
          <p>
            {t(
              "Delivering high-quality bird nest through professional cleaning, grading, and quality control.",
              "Menghadirkan sarang walet berkualitas melalui pembersihan profesional, grading, dan kontrol kualitas.",
            )}
          </p>
          <div className="hero-buttons">
            <Button to="/products">
              {t("Explore Products", "Jelajahi Produk")}
            </Button>
            <Button to="/contact" outline>
              {t("Contact Us", "Hubungi Kami")}
            </Button>
          </div>
        </div>
      </section>
      <div className="trust-strip">
        <div className="container grid grid-cols-2 lg:grid-cols-4">
          {trust.map(([Icon, title]) => (
            <div key={title[0]}>
              <Icon size={26} weight="light" />
              <span>{t(...title)}</span>
            </div>
          ))}
        </div>
      </div>
      <section className="section container story-section">
        <div className="story-image">
          <Picture
            name="story-bird-nest.png"
            alt={t(
              "Two cleaned bowl-shaped bird nests",
              "Dua sarang walet mangkok yang telah dibersihkan",
            )}
          />
        </div>
        <div className="story-copy">
          <span className="eyebrow">
            {t("THE BORNEO NEST STORY", "CERITA BORNEO NEST")}
          </span>
          <h2>
            {t("Nature’s finest.", "Hasil terbaik alam.")}
            <br />
            {t("Handled with purpose.", "Diolah dengan sepenuh hati.")}
          </h2>
          <p>
            {t(
              "From the heart of Kalimantan, we bring the natural value of Indonesian bird nest to businesses that care about quality.",
              "Dari jantung Kalimantan, kami menghadirkan nilai alami sarang walet Indonesia bagi bisnis yang mengutamakan kualitas.",
            )}
          </p>
          <p>
            {t(
              "Borneo Nest Indonesia focuses on bird nest processing and trading, combining careful manual cleaning with considered grading and quality control.",
              "Borneo Nest Indonesia berfokus pada pengolahan dan perdagangan sarang walet, memadukan pembersihan manual yang teliti dengan grading dan kontrol kualitas.",
            )}
          </p>
          <Link to="/about" className="text-link">
            {t("Discover Our Story", "Kenali Perusahaan Kami")}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="section products-section">
        <div className="container">
          <div className="section-heading">
            <h2>{t("Exceptional by nature.", "Istimewa secara alami.")}</h2>
            <p>
              {t(
                "A considered selection for different markets, needs and possibilities.",
                "Pilihan produk untuk berbagai pasar, kebutuhan, dan peluang.",
              )}
            </p>
          </div>
          <ProductCards />
          <div className="center-link">
            <Link to="/products" className="text-link">
              {t("Explore the collection", "Jelajahi koleksi")}
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
      <section className="section container process-preview">
        <div className="process-heading">
          <h2>{t("Care in every detail.", "Ketelitian di setiap detail.")}</h2>
          <p>
            {t(
              "From raw material to the final package, each stage has a purpose: preserving quality.",
              "Dari bahan baku hingga kemasan akhir, setiap tahap bertujuan menjaga kualitas.",
            )}
          </p>
          <Link to="/process" className="text-link">
            {t("Explore Our Process", "Jelajahi Proses Kami")}
            <ArrowUpRight />
          </Link>
        </div>
        <div className="process-mini">
          {steps.map(([name, desc], i) => (
            <div key={name[0]}>
              <span className="step-no">0{i + 1}</span>
              <h3>{t(...name)}</h3>
              <p>{t(...desc)}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="quality-band">
        <div className="container">
          <ShieldCheck size={42} weight="light" />
          <h2>
            {t(
              "Quality you can build on.",
              "Kualitas untuk fondasi bisnis Anda.",
            )}
          </h2>
          <p>
            {t(
              "Manual cleaning. Clear grading. Thoughtful inspection. A reliable foundation for your next business partnership.",
              "Pembersihan manual. Grading yang jelas. Pemeriksaan teliti. Fondasi yang dapat diandalkan untuk kemitraan bisnis Anda.",
            )}
          </p>
          <Button to="/quality" outline>
            {t("Our Quality Commitment", "Komitmen Kualitas Kami")}
          </Button>
        </div>
      </section>
      <section className="section container why-section">
        <h2>
          {t(
            "Why choose Borneo Nest Indonesia?",
            "Mengapa Borneo Nest Indonesia?",
          )}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-9">
          {[
            [
              Leaf,
              ["Premium source", "Sumber premium"],
              [
                "Rooted in Kalimantan and its bird nest farming community.",
                "Berakar di Kalimantan dan komunitas peternak waletnya.",
              ],
            ],
            [
              ShieldCheck,
              ["Quality assurance", "Jaminan kualitas"],
              [
                "Attention to cleanliness, appearance and product consistency.",
                "Perhatian pada kebersihan, tampilan, dan konsistensi produk.",
              ],
            ],
            [
              Package,
              ["Professional processing", "Pengolahan profesional"],
              [
                "A considered workflow from selection through packaging.",
                "Alur kerja terarah dari pemilihan hingga pengemasan.",
              ],
            ],
            [
              Handshake,
              ["Reliable partnership", "Kemitraan tepercaya"],
              [
                "Clear conversations about specifications and business needs.",
                "Komunikasi jelas tentang spesifikasi dan kebutuhan bisnis.",
              ],
            ],
          ].map(([Icon, title, desc]) => (
            <div className="why-item" key={title[0]}>
              <Icon size={29} weight="light" />
              <div>
                <h3>{t(...title)}</h3>
                <p>{t(...desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="profile-strip container">
        <div>
          <h3>
            {t("Get to know our business.", "Kenali bisnis kami lebih dekat.")}
          </h3>
          <p>
            {t(
              "Our products, process and partnership approach in one profile.",
              "Produk, proses, dan pendekatan kemitraan kami dalam satu profil.",
            )}
          </p>
        </div>
        <a className="button outline" href="/company-profile.pdf" download>
          {t("Download Company Profile", "Unduh Profil Perusahaan")}
          <DownloadSimple size={20} />
        </a>
      </section>
      <Faq />
      <Cta />
    </>
  );
}
