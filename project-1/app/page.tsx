
"use client";

import { useEffect, useState } from "react";

const WHATSAPP_NUMBER = "923217056829";

const products = {
  instagram: {
    title: "Smart Instagram NFC Card",
    price: "PKR 2,999",
    tag: "Social Media",
    images: [
      "/smart-instagram-card.png",
      "/smart-instagram-card-back.png",
    ],
    description:
      "A premium NFC smart card designed to help customers instantly connect with your Instagram profile. Simply tap a compatible smartphone on the card — no app required.",
    features: [
      "Built-in NFC chip for instant tap-to-connect",
      "Premium card design",
      "Standard credit-card size",
      "Compatible with supported iPhone and Android devices",
      "Can be programmed to your Instagram or custom link",
      "QR code can also be included",
    ],
  },
  google_review: {
    title: "Google Review NFC Card",
    price: "PKR 2,999",
    tag: "Reviews & Growth",
    images: ["/post-2.png"],
    description:
      "A premium NFC card designed to make Google reviews easier for your customers. Simply tap a compatible smartphone on the card to open your Google review link instantly.",
    features: [
      "Built-in NFC chip for instant tap-to-review",
      "Premium card design",
      "Standard credit-card size",
      "Compatible with supported iPhone and Android devices",
      "Can be programmed to your Google review link",
    ],
  },
};

type ProductKey = keyof typeof products;

export default function Home() {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductKey | null>(null);
  const [lightboxImage, setLightboxImage] =
    useState<string | null>(null);

  const product = selectedProduct
    ? products[selectedProduct]
    : null;

  useEffect(() => {
    const modalOpen = Boolean(product || lightboxImage);
    document.body.style.overflow = modalOpen ? "hidden" : "";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedProduct(null);
        setLightboxImage(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, lightboxImage]);

  function orderOnWhatsApp(title: string) {
    const message = `Hi, I want to order the ${title}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="olive-site">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        .olive-site {
          font-family: Arial, Helvetica, sans-serif;
          color: #292524;
          background: white;
          line-height: 1.5;
        }
        .olive-site a { text-decoration: none; }
        .olive-site button { font: inherit; cursor: pointer; }
        .wrap { width: min(1120px, calc(100% - 40px)); margin: auto; }
        .olive-header {
          position: sticky; top: 0; z-index: 40;
          background: rgba(255,255,255,.96);
          border-bottom: 1px solid #e9eddf;
          backdrop-filter: blur(12px);
        }
        .nav-row {
          min-height: 76px; display: flex; align-items: center;
          justify-content: space-between; gap: 20px;
        }
        .brand { display: flex; align-items: center; gap: 12px; }
        .brand img { width: 42px; height: 42px; object-fit: cover; border-radius: 12px; }
        .brand-name { color: #3d492b; font-size: 21px; font-weight: 800; }
        .brand-tag { color: #78716c; font-size: 10px; letter-spacing: 2px; }
        .nav-links { display: flex; align-items: center; gap: 28px; font-size: 14px; font-weight: 600; }
        .nav-links a:not(.btn) { color: #57534e; }
        .nav-links a:hover { color: #60723f; }
        .btn {
          display: inline-flex; align-items: center; justify-content: center;
          border: 0; border-radius: 12px; padding: 12px 20px;
          font-weight: 600; transition: .2s ease;
        }
        .btn-olive { background: #4b5a32; color: white; }
        .btn-olive:hover { background: #353e28; }
        .btn-outline { border: 1px solid #b8c69b; color: #3d492b; background: transparent; }
        .btn-outline:hover { border-color: #7c8f55; background: #f5f7f0; }
        .hero { background: #f8f7f2; }
        .hero-inner { padding-top: 100px; padding-bottom: 100px; }
        .eyebrow {
          display: inline-block; padding: 7px 14px; border-radius: 999px;
          background: #e9eddf; color: #4b5a32; font-size: 11px;
          font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase;
        }
        .hero h1 { font-size: clamp(42px, 6vw, 66px); line-height: 1.08; letter-spacing: -2px; margin: 24px 0 0; }
        .olive-text { color: #60723f; }
        .hero p { max-width: 650px; color: #57534e; font-size: 19px; line-height: 1.8; margin: 22px 0 0; }
        .hero-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }
        .section { padding: 82px 0; }
        .soft-bg { background: #f8f7f2; }
        .section-heading { max-width: 680px; text-align: center; margin: auto; }
        .section-kicker { color: #60723f; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; }
        .section-heading h2 { font-size: clamp(29px, 4vw, 40px); line-height: 1.2; margin: 12px 0; }
        .section-heading p { color: #57534e; margin: 14px 0 0; }
        .product-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 30px; margin-top: 46px; }
        .product-card { background: #f8f7f2; border: 1px solid #d4dcc0; border-radius: 18px; overflow: hidden; display: flex; flex-direction: column; transition: box-shadow .2s; }
        .product-card:hover { box-shadow: 0 10px 28px #0000000d; }
        .product-image { height: 320px; padding: 18px; display: flex; align-items: center; justify-content: center; position: relative; background: #f5f5f4; }
        .product-image img { max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in; transition: transform .25s; }
        .product-image img:hover { transform: scale(1.04); }
        .zoom-label { position: absolute; right: 12px; bottom: 12px; background: #0009; color: white; font-size: 10px; padding: 4px 8px; border-radius: 5px; pointer-events: none; }
        .product-details { padding: 24px; display: flex; flex: 1; flex-direction: column; justify-content: space-between; }
        .product-tag { color: #60723f; font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; }
        .product-details h3 { margin: 5px 0; font-size: 21px; }
        .product-details p { color: #57534e; font-size: 14px; line-height: 1.8; margin: 8px 0 0; }
        .product-bottom { border-top: 1px solid #d4dcc0; margin-top: 24px; padding-top: 17px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .starting { display: block; color: #a8a29e; font-size: 11px; }
        .price { font-size: 23px; font-weight: 800; white-space: nowrap; }
        .small-btn { padding: 10px 14px; font-size: 13px; white-space: nowrap; }
        .feature-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; margin-top: 45px; }
        .feature-card { background: white; border: 1px solid #e9eddf; border-radius: 17px; padding: 26px; }
        .feature-icon { width: 48px; height: 48px; border-radius: 12px; background: #e9eddf; display: grid; place-items: center; font-size: 24px; }
        .feature-card h3 { font-size: 18px; margin: 18px 0 7px; }
        .feature-card p { color: #57534e; font-size: 14px; line-height: 1.8; margin: 0; }
        .contact-section { background: #3d492b; color: white; text-align: center; padding: 80px 20px; }
        .contact-section .section-kicker { color: #d4dcc0; }
        .contact-section h2 { font-size: clamp(29px, 4vw, 40px); line-height: 1.2; margin: 14px 0; }
        .contact-section p { color: #e9eddf; max-width: 570px; margin: 16px auto 0; }
        .contact-section .btn { margin-top: 28px; background: white; color: #3d492b; }
        .contact-section .btn:hover { background: #f5f7f0; }
        .footer { background: #0c0a09; color: #a8a29e; }
        .footer-inner { display: flex; justify-content: space-between; gap: 32px; padding-top: 38px; padding-bottom: 28px; }
        .footer .brand-name { color: white; }
        .footer .brand img { width: 36px; height: 36px; }
        .footer p { font-size: 13px; }
        .footer-title { color: white; font-weight: 700; }
        .copyright { border-top: 1px solid #292524; padding: 20px 0; color: #78716c; text-align: center; font-size: 11px; }
        .overlay { position: fixed; inset: 0; z-index: 50; background: #000b; display: flex; align-items: center; justify-content: center; padding: 18px; }
        .modal { background: white; width: 100%; max-width: 900px; max-height: 90vh; overflow-y: auto; border-radius: 18px; position: relative; }
        .modal-images { padding: 24px; background: #f8f7f2; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .modal-images.single { grid-template-columns: minmax(0, 1fr); }
        .modal-image-box { height: 260px; padding: 14px; border-radius: 12px; background: #f5f5f4; display: flex; align-items: center; justify-content: center; }
        .modal-image-box img { max-width: 100%; max-height: 100%; object-fit: contain; cursor: zoom-in; }
        .modal-body { padding: 28px; }
        .modal-body h2 { font-size: 30px; line-height: 1.2; margin: 8px 0; }
        .modal-price { color: #60723f; font-size: 30px; font-weight: 800; margin-top: 14px; }
        .modal-description { color: #57534e; line-height: 1.8; margin-top: 18px; }
        .feature-list { list-style: none; padding: 0; display: grid; gap: 12px; margin-top: 16px; }
        .feature-list li { display: flex; align-items: flex-start; gap: 10px; color: #57534e; font-size: 14px; }
        .check { color: #60723f; font-weight: 800; }
        .modal-actions { border-top: 1px solid #e7e5e4; padding-top: 22px; margin-top: 26px; display: flex; flex-wrap: wrap; gap: 12px; }
        .close-btn { border: 0; background: #f5f5f4; color: #44403c; border-radius: 50%; width: 40px; height: 40px; font-size: 25px; line-height: 1; }
        .modal-close { position: absolute; top: 12px; right: 12px; z-index: 2; box-shadow: 0 2px 8px #0001; }
        .lightbox-image { max-width: 95vw; max-height: 85vh; object-fit: contain; border-radius: 12px; }
        .lightbox-close { position: absolute; top: 18px; right: 24px; color: white; background: transparent; border: 0; font-size: 38px; }
        @media (max-width: 760px) {
          .nav-links { display: none; }
          .hero-inner { padding-top: 70px; padding-bottom: 70px; }
          .hero p { font-size: 17px; }
          .section { padding: 62px 0; }
          .product-grid, .feature-grid { grid-template-columns: 1fr; }
          .product-image { height: 290px; }
          .footer-inner { flex-direction: column; }
        }
        @media (max-width: 440px) {
          .wrap { width: calc(100% - 28px); }
          .brand-tag { letter-spacing: 1px; }
          .product-bottom { align-items: flex-start; flex-direction: column; }
          .product-bottom .btn { width: 100%; }
          .modal-images { grid-template-columns: 1fr; padding: 14px; }
          .modal-image-box { height: 220px; }
          .modal-body { padding: 20px; }
          .modal-body h2 { font-size: 25px; }
          .modal-actions .btn { width: 100%; }
        }
      `}</style>

      <header className="olive-header">
        <div className="wrap nav-row">
          <a href="#top" className="brand">
            <img src="/monogram.jpg" alt="OliveTap logo" />
            <div>
              <div className="brand-name">OliveTap</div>
              <div className="brand-tag">TAP • CONNECT • GROW</div>
            </div>
          </a>

          <nav className="nav-links">
            <a href="#products">Products</a>
            <a href="#features">Features</a>
            <a href="#contact">Contact</a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-olive"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="wrap hero-inner">
          <span className="eyebrow">Smart NFC Solutions</span>
          <h1>
            Make Every <span className="olive-text">Tap</span> Count.
          </h1>
          <p>
            Premium NFC cards that help businesses connect with customers
            instantly. Tap, connect and grow — without complicated apps.
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn btn-olive">
              View Products
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <div className="wrap">
          <div className="section-heading">
            <span className="section-kicker">Our Products</span>
            <h2>Smart Cards for Smart Businesses</h2>
            <p>
              Give your customers an easier way to connect, review and
              interact with your business.
            </p>
          </div>

         <div className="product-grid" style={{ position: "relative", zIndex: 10 }}>
            {(Object.keys(products) as ProductKey[]).map((key) => {
              const item = products[key];

              return (
                <article className="product-card" key={key}>
                  <div 
                    className="product-image"
                    onClick={() => setLightboxImage(item.images[0])}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                    />
                    <span className="zoom-label">Click to Zoom</span>
                  </div>

                  <div className="product-details">
                    <div>
                      <span className="product-tag">{item.tag}</span>
                      <h3>{item.title}</h3>
                      <p>
                        {key === "instagram"
                          ? "Let customers instantly open your Instagram profile by simply tapping their smartphone on your smart card."
                          : "Make it easier for customers to leave a Google review. Simply tap their phone on the card to open your review link."}
                      </p>
                    </div>

                    <div className="product-bottom">
                      <div>
                        <span className="starting">Starting from</span>
                        <span className="price">{item.price}</span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-olive small-btn"
                        style={{ position: "relative", zIndex: 20, cursor: "pointer" }}
                        onClick={() => {
                          console.log("Button clicked for:", key);
                          setSelectedProduct(key);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section soft-bg" id="features">
        <div className="wrap">
          <div className="section-heading">
            <span className="section-kicker">Why OliveTap</span>
            <h2>Simple. Smart. Professional.</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Instant Connection</h3>
              <p>
                Customers can access your link instantly with a simple NFC
                tap on a compatible smartphone.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Grow Your Business</h3>
              <p>
                Make it easier for customers to discover, review and engage
                with your business.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Custom Branding</h3>
              <p>
                Professional designs that match your business identity and
                brand.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <span className="section-kicker">Get Started</span>
        <h2>Ready to make your business smarter?</h2>
        <p>
          Contact OliveTap and get your custom NFC card designed for your
          business.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="btn"
        >
          WhatsApp Us
        </a>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <div>
            <div className="brand">
              <img src="/monogram.jpg" alt="OliveTap logo" />
              <div className="brand-name">OliveTap</div>
            </div>
            <p>Smart NFC solutions for modern businesses.</p>
          </div>

          <div>
            <div className="footer-title">Contact</div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              <p>+92 321 7056829</p>
            </a>
          </div>
        </div>

        <div className="wrap copyright">
          © 2026 OliveTap.pk. All rights reserved.
        </div>
      </footer>

      {product && (
        <div
          className="overlay"
          onClick={() => setSelectedProduct(null)}
          role="presentation"
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={product.title}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="close-btn modal-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
            >
              ×
            </button>

            <div
              className={`modal-images ${
                product.images.length === 1 ? "single" : ""
              }`}
            >
              {product.images.map((image) => (
                <div className="modal-image-box" key={image}>
                  <img
                    src={image}
                    alt={product.title}
                    onClick={() => setLightboxImage(image)}
                  />
                </div>
              ))}
            </div>

            <div className="modal-body">
              <span className="product-tag">{product.tag}</span>
              <h2>{product.title}</h2>
              <div className="modal-price">{product.price}</div>
              <p className="modal-description">{product.description}</p>

              <h3>Features</h3>
              <ul className="feature-list">
                {product.features.map((feature) => (
                  <li key={feature}>
                    <span className="check">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-olive"
                  onClick={() => orderOnWhatsApp(product.title)}
                >
                  Order on WhatsApp
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setSelectedProduct(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {lightboxImage && (
        <div
          className="overlay"
          style={{ zIndex: 60, background: "#000d" }}
          onClick={() => setLightboxImage(null)}
          role="presentation"
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => setLightboxImage(null)}
            aria-label="Close image preview"
          >
            ×
          </button>
          <img
            className="lightbox-image"
            src={lightboxImage}
            alt="Product preview"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}