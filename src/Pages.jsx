import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Check,
  Leaf,
  ShieldCheck,
  Package,
  GlobeHemisphereEast,
  ArrowLeft,
} from "@phosphor-icons/react";
import {
  useText,
  Intro,
  Picture,
  Button,
  Cta,
  ProductCards,
  Faq,
  NotFound,
} from "./components";
import { products, steps, qualities } from "./data";
export function About() {
  const { t } = useText();
  return (
    <>
      <Intro
        label={["OUR COMPANY", "PERUSAHAAN KAMI"]}
        title={[
          "From Kalimantan. For lasting partnerships.",
          "Dari Kalimantan. Untuk kemitraan berkelanjutan.",
        ]}
        description={[
          "Borneo Nest Indonesia is a bird nest processing and trading company focused on premium quality bird nest from Kalimantan.",
          "Borneo Nest Indonesia adalah perusahaan pengolahan dan perdagangan sarang walet yang berfokus pada sarang walet premium dari Kalimantan.",
        ]}
      />
      <section className="container about-feature">
        <Picture
          name="story-bird-nest.png"
          alt={t(
            "Two cleaned bowl-shaped bird nests",
            "Dua sarang walet mangkok yang telah dibersihkan",
          )}
        />
        <div>
          <h2>
            {t(
              "A thoughtful approach to a remarkable natural product.",
              "Pendekatan teliti untuk produk alami yang istimewa.",
            )}
          </h2>
          <p>
            {t(
              "We work across cleaning, grading, quality control and packaging to help traders, distributors and premium buyers find products suited to their needs.",
              "Kami menangani pembersihan, grading, kontrol kualitas, dan pengemasan untuk membantu pedagang, distributor, serta pembeli premium menemukan produk yang sesuai.",
            )}
          </p>
          <div className="check-list">
            {[
              [
                "Direct source from Kalimantan",
                "Sumber langsung dari Kalimantan",
              ],
              [
                "Professional cleaning process",
                "Proses pembersihan profesional",
              ],
              ["Strict quality control", "Kontrol kualitas ketat"],
              [
                "Domestic & international market focus",
                "Fokus pasar domestik & internasional",
              ],
            ].map((x) => (
              <p key={x[0]}>
                <Check />
                {t(...x)}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="section container grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="vision">
          <span className="eyebrow">{t("OUR VISION", "VISI KAMI")}</span>
          <h2>
            {t(
              "Quality that earns trust.",
              "Kualitas yang membangun kepercayaan.",
            )}
          </h2>
          <p>
            {t(
              "To become a trusted bird nest processing company providing high-quality products for domestic and international markets.",
              "Menjadi perusahaan pengolahan sarang walet tepercaya yang menyediakan produk berkualitas tinggi bagi pasar domestik dan internasional.",
            )}
          </p>
        </div>
        <div>
          <h2>{t("Our mission", "Misi kami")}</h2>
          {[
            [
              "Preserve the natural value of bird nest through careful processing.",
              "Menjaga nilai alami sarang walet melalui pengolahan yang teliti.",
            ],
            [
              "Build transparent, long-term relationships with farmers and buyers.",
              "Membangun hubungan terbuka dan jangka panjang dengan peternak serta pembeli.",
            ],
            [
              "Develop consistent quality practices and responsible operations.",
              "Mengembangkan praktik kualitas yang konsisten dan operasional bertanggung jawab.",
            ],
          ].map((x) => (
            <p className="mission-item" key={x[0]}>
              <Check />
              {t(...x)}
            </p>
          ))}
        </div>
      </section>
      <section className="container future-note">
        <Leaf size={30} />
        <div>
          <h3>HOLYGOODNEST</h3>
          <p>
            {t(
              "Our future wellness product direction. Products are in development and are not offered for sale on this website.",
              "Arah pengembangan produk wellness kami. Produk masih dalam pengembangan dan belum ditawarkan di website ini.",
            )}
          </p>
        </div>
      </section>
      <Cta />
    </>
  );
}
export function Products() {
  const { t } = useText();
  return (
    <>
      <Intro
        label={["OUR COLLECTION", "KOLEKSI KAMI"]}
        title={[
          "Naturally distinctive. Carefully selected.",
          "Berkarakter alami. Dipilih dengan teliti.",
        ]}
        description={[
          "Discover bird nest products for premium retail, distribution and processing. Discuss grade, volume and packaging with our team.",
          "Temukan produk sarang walet untuk ritel premium, distribusi, dan pengolahan. Diskusikan grade, volume, dan kemasan bersama tim kami.",
        ]}
      />
      <section className="container collection">
        <ProductCards />
        <p className="image-note">
          {t(
            "Product images are illustrative. Ask for current batch photos and specifications before ordering.",
            "Gambar produk merupakan ilustrasi. Mintalah foto batch terkini dan spesifikasi sebelum memesan.",
          )}
        </p>
      </section>
      <section className="container service-box">
        <div>
          <h2>
            {t(
              "Your bird nest. Our cleaning expertise.",
              "Sarang walet Anda. Keahlian pembersihan kami.",
            )}
          </h2>
          <p>
            {t(
              "Have your own raw material? Discuss our bird nest cleaning, sorting and grading service.",
              "Memiliki bahan baku sendiri? Diskusikan layanan pembersihan, sortasi, dan grading sarang walet kami.",
            )}
          </p>
        </div>
        <Button to="/contact?type=Cleaning%20Service">
          {t("Discuss Cleaning Service", "Diskusikan Jasa Pembersihan")}
        </Button>
      </section>
      <Faq />
      <Cta />
    </>
  );
}
export function ProductDetail() {
  const { slug } = useParams();
  const { t } = useText();
  const product = products.find((p) => p.slug === slug);
  if (!product) return <NotFound />;
  return (
    <>
      <section className="container detail-section">
        <Link className="text-link back-link" to="/products">
          <ArrowLeft />
          {t("All products", "Semua produk")}
        </Link>
        <div className="detail-grid">
          <div>
            <Picture name={product.image} alt={t(...product.name)} eager />
            <p className="image-note">
              {t(
                "Illustrative image. Actual batches may vary in appearance.",
                "Gambar ilustrasi. Tampilan batch aktual dapat berbeda.",
              )}
            </p>
          </div>
          <div>
            <span className="grade-label">{t(...product.grade)}</span>
            <h1>{t(...product.name)}</h1>
            <p>{t(...product.description)}</p>
            <h3>{t("Quality characteristics", "Karakteristik kualitas")}</h3>
            <div className="check-list">
              {product.features.map((x) => (
                <p key={x[0]}>
                  <Check />
                  {t(...x)}
                </p>
              ))}
            </div>
            <h3>{t("Processing information", "Informasi pengolahan")}</h3>
            <p>
              {t(
                "Manually cleaned, graded and inspected before packaging. Share your required grade, quantity and destination for an order-specific proposal.",
                "Dibersihkan manual, dikelompokkan, dan diperiksa sebelum dikemas. Sampaikan grade, jumlah, dan tujuan pengiriman untuk penawaran yang sesuai.",
              )}
            </p>
            <p>{t(...product.use)}</p>
            <Button
              to={`/contact?product=${encodeURIComponent(product.name[0])}`}
            >
              {t("Request Product Information", "Minta Informasi Produk")}
            </Button>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
export function Process() {
  const { t } = useText();
  return (
    <>
      <Intro
        label={["OUR PROCESS", "PROSES KAMI"]}
        title={["Considered at every stage.", "Teliti di setiap tahap."]}
        description={[
          "A careful journey from raw bird nest to a product ready for your business.",
          "Perjalanan yang teliti dari sarang walet mentah menjadi produk siap untuk bisnis Anda.",
        ]}
      />
      <section className="container timeline">
        {steps.map(([name, desc], i) => (
          <article key={name[0]}>
            <span className="step-no">0{i + 1}</span>
            <div>
              <h2>{t(...name)}</h2>
              <p>{t(...desc)}</p>
            </div>
            <Check size={26} />
          </article>
        ))}
      </section>
      <section className="container process-reference">
        <h2>{t("Our cleaning workflow", "Alur jasa pembersihan kami")}</h2>
        <Picture
          name="cleaning-workflow.webp"
          alt={t(
            "Company illustration of receiving, sorting, soaking, manual cleaning, shaping, drying, quality control, packaging and shipping",
            "Ilustrasi penerimaan, sortasi, perendaman, pembersihan manual, pembentukan, pengeringan, kontrol kualitas, pengemasan, dan pengiriman",
          )}
        />
        <p className="image-note">
          {t(
            "Process illustration from company materials.",
            "Ilustrasi proses dari materi perusahaan.",
          )}
        </p>
      </section>
      <Cta />
    </>
  );
}
export function Quality() {
  const { t } = useText();
  return (
    <>
      <Intro
        label={["QUALITY ASSURANCE", "JAMINAN KUALITAS"]}
        title={[
          "The details make the difference.",
          "Detail yang membuat perbedaan.",
        ]}
        description={[
          "Our quality approach brings together careful cleaning, clear grading and inspection before delivery.",
          "Pendekatan kualitas kami memadukan pembersihan teliti, grading yang jelas, dan pemeriksaan sebelum pengiriman.",
        ]}
      />
      <section className="container quality-grid grid grid-cols-1 md:grid-cols-2 gap-6">
        {qualities.map(([title, desc], i) => (
          <article key={title[0]}>
            {i === 0 ? (
              <Leaf size={32} />
            ) : i === 1 ? (
              <ShieldCheck size={32} />
            ) : i === 2 ? (
              <Package size={32} />
            ) : (
              <GlobeHemisphereEast size={32} />
            )}
            <h2>{t(...title)}</h2>
            {i === 3 && (
              <span className="grade-label">
                {t("Planned development", "Rencana pengembangan")}
              </span>
            )}
            <p>{t(...desc)}</p>
          </article>
        ))}
      </section>
      <section className="container service-box">
        <div>
          <h2>
            {t(
              "Make an informed purchase.",
              "Pesan dengan informasi yang jelas.",
            )}
          </h2>
          <p>
            {t(
              "Request current batch photos, available grades and order specifications. Documentation and destination requirements should be confirmed with our team before purchase.",
              "Mintalah foto batch terkini, grade yang tersedia, dan spesifikasi pesanan. Dokumen serta kebutuhan tujuan pengiriman dikonfirmasi bersama tim sebelum pembelian.",
            )}
          </p>
        </div>
        <Button to="/contact">
          {t("Discuss Your Requirements", "Diskusikan Kebutuhan Anda")}
        </Button>
      </section>
      <Cta />
    </>
  );
}
export function Sustainability() {
  const { t } = useText();
  return (
    <>
      <Intro
        label={["RESPONSIBLE BUSINESS", "BISNIS BERTANGGUNG JAWAB"]}
        title={[
          "Rooted in a shared future.",
          "Berakar pada masa depan bersama.",
        ]}
        description={[
          "Our long-term direction connects product quality with farmer relationships, local livelihoods and responsible production.",
          "Arah jangka panjang kami menghubungkan kualitas produk dengan hubungan peternak, ekonomi lokal, dan produksi bertanggung jawab.",
        ]}
      />
      <section className="container sustainability">
        <div className="sustainability-statement">
          <Leaf size={56} weight="light" />
          <h2>
            {t(
              "A better supply chain starts close to home.",
              "Rantai pasok yang lebih baik dimulai dari sekitar kita.",
            )}
          </h2>
          <p>
            {t(
              "These principles guide how we aim to grow. We are developing our practices step by step alongside our business.",
              "Prinsip-prinsip ini memandu pertumbuhan kami. Praktik kami dikembangkan bertahap seiring perkembangan bisnis.",
            )}
          </p>
        </div>
        <div>
          {[
            [
              [
                "Partnership with bird nest farmers",
                "Kemitraan dengan peternak walet",
              ],
              [
                "Build lasting relationships through clear communication about sourcing and quality.",
                "Membangun hubungan berkelanjutan melalui komunikasi jelas tentang sumber bahan dan kualitas.",
              ],
            ],
            [
              ["Supporting the local economy", "Mendukung ekonomi lokal"],
              [
                "Create opportunities around processing and trade within Kalimantan’s bird nest community.",
                "Menciptakan peluang pengolahan dan perdagangan di komunitas sarang walet Kalimantan.",
              ],
            ],
            [
              ["Responsible production", "Produksi bertanggung jawab"],
              [
                "Use careful handling and considered processing to respect the value of each raw material.",
                "Menggunakan penanganan teliti dan pengolahan terarah untuk menghargai setiap bahan baku.",
              ],
            ],
            [
              ["Sustainable supply chain", "Rantai pasok berkelanjutan"],
              [
                "Work toward better sourcing visibility and dependable long-term partnerships.",
                "Mengupayakan kejelasan sumber bahan dan kemitraan jangka panjang yang dapat diandalkan.",
              ],
            ],
          ].map(([title, desc]) => (
            <article key={title[0]}>
              <h3>{t(...title)}</h3>
              <p>{t(...desc)}</p>
            </article>
          ))}
        </div>
      </section>
      <Cta />
    </>
  );
}
