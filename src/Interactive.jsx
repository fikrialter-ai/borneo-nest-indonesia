import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Check,
  WhatsappLogo,
  MapPin,
  X,
  MagnifyingGlassPlus,
} from "@phosphor-icons/react";
import { useText, wa, Intro, Picture, Cta } from "./components";
import { gallery } from "./data";
export function Gallery() {
  const { t } = useText();
  const [category, setCategory] = useState("all");
  const [active, setActive] = useState(null);
  const dialog = useRef(null);
  const filtered = gallery.filter(
    (x) => category === "all" || x.category === category,
  );
  function show(i) {
    setActive(i);
    dialog.current.showModal();
  }
  function close() {
    dialog.current.close();
    setActive(null);
  }
  useEffect(() => {
    if (active !== null) {
      const old = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = old;
      };
    }
  }, [active]);
  return (
    <>
      <Intro
        label={["OUR GALLERY", "GALERI KAMI"]}
        title={[
          "A closer look at Borneo Nest.",
          "Mengenal Borneo Nest lebih dekat.",
        ]}
        description={[
          "Explore our product selection and materials documenting the development of our business.",
          "Jelajahi pilihan produk dan materi yang mendokumentasikan pengembangan bisnis kami.",
        ]}
      />
      <section className="container gallery-section">
        <div
          className="filter-bar"
          aria-label={t("Gallery categories", "Kategori galeri")}
        >
          {[
            ["all", "All", "Semua"],
            ["products", "Product Gallery", "Galeri Produk"],
            ["production", "Production Gallery", "Galeri Produksi"],
            ["company", "Company Activity", "Aktivitas Perusahaan"],
          ].map(([value, en, id]) => (
            <button
              key={value}
              className={category === value ? "selected" : ""}
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {t(en, id)}
            </button>
          ))}
        </div>
        <div className="gallery-grid">
          {filtered.map((item, i) => (
            <figure key={item.image}>
              <button
                onClick={() => show(i)}
                aria-label={t("Enlarge ", "Perbesar ") + t(...item.title)}
              >
                <Picture name={item.image} alt={t(...item.title)} />
                <span>
                  <MagnifyingGlassPlus size={25} />
                </span>
              </button>
              <figcaption>
                <h3>{t(...item.title)}</h3>
                <p>{t(...item.note)}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="image-note">
          {t(
            "Facility, cleaning, quality-control and partnership photography will be added as verified documentation becomes available.",
            "Foto fasilitas, pembersihan, kontrol kualitas, dan kemitraan akan ditambahkan setelah dokumentasi terverifikasi tersedia.",
          )}
        </p>
      </section>
      <dialog
        ref={dialog}
        aria-label={t("Image viewer", "Penampil gambar")}
        className="lightbox"
        onCancel={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") setActive((active + 1) % filtered.length);
          if (e.key === "ArrowLeft")
            setActive((active - 1 + filtered.length) % filtered.length);
        }}
      >
        {active !== null && (
          <div>
            <button
              className="lightbox-close"
              onClick={close}
              aria-label={t("Close image", "Tutup gambar")}
            >
              <X size={26} />
            </button>
            <Picture
              name={filtered[active].image}
              alt={t(...filtered[active].title)}
              eager
            />
            <div className="lightbox-caption">
              <button
                aria-label={t("Previous image", "Gambar sebelumnya")}
                onClick={() =>
                  setActive((active - 1 + filtered.length) % filtered.length)
                }
              >
                <ArrowLeft />
              </button>
              <p>
                {t(...filtered[active].title)}
                <small>{t(...filtered[active].note)}</small>
              </p>
              <button
                aria-label={t("Next image", "Gambar berikutnya")}
                onClick={() => setActive((active + 1) % filtered.length)}
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        )}
      </dialog>
      <Cta />
    </>
  );
}
export function Contact() {
  const { t } = useText();
  const mapLink = "https://maps.app.goo.gl/T27fcDkVPVW6nCbE8";
  const address =
    "RT.01, Desa Gulinggang, Kec. Juai, Kabupaten Balangan, Kalimantan Selatan 71665";
  const [params] = useSearchParams();
  const [prepared, setPrepared] = useState("");
  const types = [
    "Product Inquiry",
    "Bulk Order",
    "Partnership",
    "Cleaning Service",
  ];
  const typesId = [
    "Informasi Produk",
    "Pesanan Besar",
    "Kemitraan",
    "Jasa Pembersihan",
  ];
  function submit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text = `Hello Borneo Nest Indonesia,\n\nName: ${d.get("name")}\nCompany: ${d.get("company")}\nEmail: ${d.get("email")}\nWhatsApp: ${d.get("phone")}\nCountry: ${d.get("country")}\nInquiry: ${d.get("type")}\n\n${d.get("message")}`;
    setPrepared(`${wa}?text=${encodeURIComponent(text)}`);
  }
  return (
    <>
      <Intro
        label={["LET’S CONNECT", "MARI TERHUBUNG"]}
        title={[
          "Your next partnership starts here.",
          "Kemitraan Anda dimulai di sini.",
        ]}
        description={[
          "Tell us about your business and what you are looking for. We will help you explore the right products and services.",
          "Ceritakan bisnis dan kebutuhan Anda. Kami akan membantu menemukan produk serta layanan yang sesuai.",
        ]}
      />
      <section className="container contact-grid">
        <aside>
          <h2>{t("Speak with our team", "Bicara dengan tim kami")}</h2>
          <p>
            {t(
              "For product information, bulk orders, partnerships and bird nest cleaning services.",
              "Untuk informasi produk, pesanan besar, kemitraan, dan jasa pembersihan sarang walet.",
            )}
          </p>
          <a
            className="contact-method"
            href={wa}
            target="_blank"
            rel="noreferrer"
          >
            <WhatsappLogo size={28} />
            <span>
              WhatsApp<strong>+62 812-5464-2859</strong>
            </span>
            <ArrowUpRight />
          </a>
          <a
            className="contact-method"
            href={mapLink}
            target="_blank"
            rel="noreferrer"
          >
            <MapPin size={28} />
            <span>
              {t("Our location", "Lokasi kami")}
              <strong>{address}</strong>
            </span>
            <ArrowUpRight />
          </a>
          <div className="contact-note">
            <h3>{t("Buying from overseas?", "Membeli dari luar negeri?")}</h3>
            <p>
              {t(
                "Include your destination country and requested quantity so we can discuss availability and requirements.",
                "Sertakan negara tujuan dan jumlah yang dibutuhkan agar kami dapat membahas ketersediaan dan persyaratan.",
              )}
            </p>
          </div>
        </aside>
        <form onSubmit={submit} onChange={() => prepared && setPrepared("")}>
          <h2>{t("Business inquiry", "Permintaan bisnis")}</h2>
          <div className="form-grid">
            {[
              ["name", "Name", "Nama", "text", "name"],
              ["company", "Company", "Perusahaan", "text", "organization"],
              ["email", "Email", "Email", "email", "email"],
              ["phone", "WhatsApp Number", "Nomor WhatsApp", "tel", "tel"],
              ["country", "Country", "Negara", "text", "country-name"],
            ].map(([name, en, id, type, auto]) => (
              <label key={name}>
                {t(en, id)} <span>*</span>
                <input
                  name={name}
                  type={type}
                  autoComplete={auto}
                  required
                  maxLength={name === "email" ? 254 : 100}
                />
              </label>
            ))}
            <label>
              {t("Inquiry Type", "Jenis Permintaan")} <span>*</span>
              <select
                name="type"
                defaultValue={
                  types.includes(params.get("type"))
                    ? params.get("type")
                    : types[0]
                }
              >
                {types.map((x, i) => (
                  <option key={x} value={x}>
                    {t(x, typesId[i])}
                  </option>
                ))}
              </select>
            </label>
            <label className="full">
              {t("Message", "Pesan")} <span>*</span>
              <textarea
                name="message"
                rows={5}
                required
                maxLength={3000}
                defaultValue={
                  params.get("product")
                    ? t(
                        `I would like more information about ${params.get("product")}.`,
                        `Saya ingin informasi lebih lanjut tentang ${params.get("product")}.`,
                      )
                    : ""
                }
                placeholder={t(
                  "Product, grade, estimated quantity and destination...",
                  "Produk, grade, perkiraan jumlah, dan tujuan...",
                )}
              />
            </label>
          </div>
          <p className="form-note">
            {t(
              "Your inquiry is prepared for WhatsApp. You review and send it there. This website does not store your form details.",
              "Permintaan Anda disiapkan untuk WhatsApp. Tinjau dan kirim di sana. Website ini tidak menyimpan detail formulir Anda.",
            )}
          </p>
          <button className="button" type="submit">
            {t("Send Inquiry", "Kirim Permintaan")}
            <ArrowUpRight size={18} />
          </button>
          {prepared && (
            <div className="form-success" role="status">
              <Check size={23} />
              <div>
                <strong>
                  {t("Your inquiry is ready.", "Permintaan Anda siap.")}
                </strong>
                <p>
                  {t(
                    "It has not been sent yet. Continue to WhatsApp to review and send.",
                    "Belum terkirim. Lanjutkan ke WhatsApp untuk meninjau dan mengirim.",
                  )}
                </p>
                <a
                  href={prepared}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  {t("Continue to WhatsApp", "Lanjutkan ke WhatsApp")}
                  <ArrowUpRight />
                </a>
              </div>
            </div>
          )}
        </form>
      </section>
      <section className="container map-section">
        <div className="map-location">
          <h3>PT Borneo Nest Indonesia</h3>
          <p>{address}</p>
          <iframe
            title={t(
              "Map of PT Borneo Nest Indonesia",
              "Peta lokasi PT Borneo Nest Indonesia",
            )}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.3280873085114!2d115.5637384!3d-2.3428313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de551005cb42659%3A0x1a0d6e288709af5!2sPT%20Borneo%20Nest%20Indonesia!5e1!3m2!1sid!2sid!4v1791032456550!5m2!1sid!2sid"
            width="600"
            height="360"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <a
            className="text-link"
            href={mapLink}
            target="_blank"
            rel="noreferrer"
          >
            {t("Open in Google Maps", "Buka di Google Maps")}
            <ArrowUpRight />
          </a>
        </div>
        <div className="social-placeholder">
          <h3>{t("Follow our journey", "Ikuti perjalanan kami")}</h3>
          <p>
            {t(
              "Official social channels are being prepared.",
              "Kanal media sosial resmi sedang disiapkan.",
            )}
          </p>
          <span>
            Instagram <small>{t("Coming soon", "Segera hadir")}</small>
          </span>
          <span>
            Facebook <small>{t("Coming soon", "Segera hadir")}</small>
          </span>
          <span>
            LinkedIn <small>{t("Coming soon", "Segera hadir")}</small>
          </span>
        </div>
      </section>
    </>
  );
}
