"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Cafe {
  id: number;
  name: string;
  description?: string;
  address?: string;
  menu?: string;
  website?: string;
  instagram?: string;
  tiktok?: string;
  whatsapp?: string;
  jazzcash?: string;
  bank_name?: string;
  bank_account_title?: string;
  bank_iban?: string;
}

export default function CafeProfile() {
  const params = useParams();
  const slug = params?.slug as string;

  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
  async function fetchCafe() {
    if (!slug) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("cafes")
      .select("*")
      .eq("slug", slug)
      .single();

    console.log("SLUG:", slug);
    console.log("CAFE DATA:", data);
    console.log("CAFE ERROR:", error);

    if (data) {
      setCafe(data);
    }

    setLoading(false);
  }

  fetchCafe();
}, [slug]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  if (loading) {
    return (
      <main style={{ padding: "4rem 1rem", textAlign: "center", fontFamily: "sans-serif" }}>
        <p style={{ color: "#718096" }}>Loading...</p>
      </main>
    );
  }

  if (!cafe) {
    return (
      <main style={{ padding: "4rem 1rem", textAlign: "center", fontFamily: "sans-serif" }}>
        <h1>Cafe Not Found</h1>
      </main>
    );
  }


  const whatsappUrl = cafe.whatsapp
    ? `https://wa.me/${cafe.whatsapp.replace(/[^0-9]/g, "")}`
    : null;

  const instaUrl = cafe.instagram
    ? cafe.instagram.startsWith("http")
      ? cafe.instagram
      : `https://instagram.com/${cafe.instagram.replace("@", "")}`
    : null;

  const tiktokUrl = cafe.tiktok
    ? cafe.tiktok.startsWith("http")
      ? cafe.tiktok
      : `https://tiktok.com/@${cafe.tiktok.replace("@", "")}`
    : null;

    const websiteUrl = cafe.website
  ? cafe.website.startsWith("http://") || cafe.website.startsWith("https://")
    ? cafe.website
    : `https://${cafe.website}`
  : null;

  return (
    <main style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.avatar}>☕</div>
        <h1 style={styles.title}>{cafe.name}</h1>
        {cafe.description && <p style={styles.description}>{cafe.description}</p>}
        {cafe.address && <p style={styles.address}>📍 {cafe.address}</p>}
      </header>

      {/* Main Social Links */}
      <section style={styles.buttonStack}>
      
        {websiteUrl && (
    <a
      href={websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...styles.btn, backgroundColor: "#2d3748", color: "#fff" }}
    >
      🌐 Visit Website
    </a>
  )}
      
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...styles.btn, backgroundColor: "#25D366", color: "#fff" }}
          >
            💬 Chat on WhatsApp
          </a>
        )}

        {instaUrl && (
          <a
            href={instaUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...styles.btn, backgroundColor: "#E1306C", color: "#fff" }}
          >
            📸  Follow on Instagram
          </a>
        )}

        {tiktokUrl && (
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ ...styles.btn, backgroundColor: "#000000", color: "#fff" }}
          >
            🎵 Follow on TikTok
          </a>
        )}
      </section>

      {/* Payment Options Section */}
      <section style={styles.paymentSection}>
        <h2 style={styles.sectionTitle}>💳 Payment Options</h2>

        {/* JazzCash Card */}
        {cafe.jazzcash && (
          <div style={styles.paymentCard}>
            <div style={styles.paymentHeader}>
              <span style={{ fontWeight: 700, color: "#d53f8c" }}>JazzCash</span>
              <button
                onClick={() => copyToClipboard(cafe.jazzcash!, "jazzcash")}
                style={styles.copyBtn}
              >
                {copiedText === "jazzcash" ? "Copied! ✓" : "Copy Mobile No."}
              </button>
            </div>
            <div style={styles.accountNumber}>{cafe.jazzcash}</div>
          </div>
        )}

        {/* Bank Account Card */}
        {(cafe.bank_iban || cafe.bank_name) && (
          <div style={styles.paymentCard}>
            <div style={styles.paymentHeader}>
              <span style={{ fontWeight: 700, color: "#2b6cb0" }}>
                {cafe.bank_name || "Bank Transfer"}
              </span>
              {cafe.bank_iban && (
                <button
                  onClick={() => copyToClipboard(cafe.bank_iban!, "bank")}
                  style={styles.copyBtn}
                >
                  {copiedText === "bank" ? "Copied! ✓" : "Copy IBAN"}
                </button>
              )}
            </div>
            {cafe.bank_account_title && (
              <p style={styles.paymentDetail}>Title: <b>{cafe.bank_account_title}</b></p>
            )}
            {cafe.bank_iban && (
              <p style={{ ...styles.paymentDetail, fontFamily: "monospace", fontSize: "0.9rem" }}>
                {cafe.bank_iban}
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "420px",
    margin: "0 auto",
    padding: "2.5rem 1.25rem",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#1a202c",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  avatar: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    backgroundColor: "#edf2f7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.2rem",
    margin: "0 auto 1rem auto",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: "800",
    margin: "0 0 0.35rem 0",
  },
  description: {
    fontSize: "0.95rem",
    color: "#4a5568",
    margin: "0 0 0.5rem 0",
  },
  address: {
    fontSize: "0.85rem",
    color: "#718096",
    margin: 0,
  },
  buttonStack: {
    display: "flex",
    flexDirection: "column",
    gap: "0.85rem",
    marginBottom: "2.5rem",
  },
  btn: {
    display: "block",
    width: "100%",
    padding: "1rem",
    borderRadius: "14px",
    textAlign: "center",
    fontWeight: "700",
    fontSize: "1.05rem",
    textDecoration: "none",
    boxSizing: "border-box",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
  },
  paymentSection: {
    borderTop: "1px solid #e2e8f0",
    paddingTop: "1.75rem",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#2d3748",
  },
  paymentCard: {
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    padding: "1rem",
    backgroundColor: "#f7fafc",
    marginBottom: "0.85rem",
  },
  paymentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  copyBtn: {
    backgroundColor: "#edf2f7",
    border: "none",
    padding: "0.35rem 0.75rem",
    borderRadius: "6px",
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    color: "#4a5568",
  },
  accountNumber: {
    fontSize: "1.1rem",
    fontWeight: 700,
    letterSpacing: "0.5px",
    color: "#2d3748",
  },
  paymentDetail: {
    fontSize: "0.875rem",
    color: "#4a5568",
    margin: "0.25rem 0 0 0",
  },
};