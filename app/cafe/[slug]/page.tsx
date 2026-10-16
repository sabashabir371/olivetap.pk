"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Cafe {
  id: number;
  name: string;
  description?: string;
  address?: string;
  logo_url?: string;
  menu?: string; // Stores file path (e.g., 'menus/cafe-menu.pdf') or full URL
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

  // Helper to retrieve the public URL from your Supabase Storage Bucket
  const getMenuUrl = (menuPath: string) => {
    if (menuPath.startsWith("http://") || menuPath.startsWith("https://")) {
      return menuPath;
    }
    // Replace 'menus' with your actual Supabase Storage Bucket name
    const { data } = supabase.storage.from("menus").getPublicUrl(menuPath);
    return data.publicUrl;
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

  const socialLinks = [
    cafe.menu && {
      key: "menu",
      label: "View Menu",
      href: getMenuUrl(cafe.menu),
      bgColor: "#926161",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: "8px" }}
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    cafe.whatsapp && {
      key: "whatsapp",
      label: "Chat on WhatsApp",
      href: `https://wa.me/${cafe.whatsapp.replace(/[^0-9]/g, "")}`,
      bgColor: "#188a7c",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      ),
    },
    cafe.instagram && {
      key: "instagram",
      label: "Follow on Instagram",
      href: cafe.instagram.startsWith("http")
        ? cafe.instagram
        : `https://instagram.com/${cafe.instagram.replace("@", "")}`,
      bgColor: "#c9285e",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    cafe.tiktok && {
      key: "tiktok",
      label: "Follow on TikTok",
      href: cafe.tiktok.startsWith("http")
        ? cafe.tiktok
        : `https://tiktok.com/@${cafe.tiktok.replace("@", "")}`,
      bgColor: "#000000",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: "8px" }}>
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.56-1.28 2.56.02.92.51 1.81 1.27 2.33.9.61 2.08.7 3.05.26.96-.42 1.63-1.33 1.75-2.37.06-1.99.02-3.98.03-5.97V.02z" />
        </svg>
      ),
    },
    cafe.website && {
      key: "website",
      label: "Visit Website",
      href: cafe.website.startsWith("http://") || cafe.website.startsWith("https://")
        ? cafe.website
        : `https://${cafe.website}`,
      bgColor: "#2c45c2",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: "8px" }}
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
  ].filter(Boolean) as Array<{
    key: string;
    label: string;
    href: string;
    bgColor: string;
    icon: React.ReactNode;
  }>;

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <div style={styles.avatar}>
          {cafe.logo_url ? (
            <img
              src={cafe.logo_url}
              alt={`${cafe.name} logo`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          ) : (
            "☕"
          )}
        </div>
        <h1 style={styles.title}>{cafe.name}</h1>
        {cafe.description && <p style={styles.description}>{cafe.description}</p>}
        {cafe.address && <p style={styles.address}>📍 {cafe.address}</p>}
      </header>

      <section style={styles.buttonStack}>
        {socialLinks.map((link) => (
          <a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...styles.btn,
              backgroundColor: link.bgColor,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {link.icon}
            {link.label}
          </a>
        ))}
      </section>

      <section style={styles.paymentSection}>
        <h2 style={styles.sectionTitle}>💳 Payment Options</h2>

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
              <p style={styles.paymentDetail}>
                Title: <b>{cafe.bank_account_title}</b>
              </p>
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
    overflow: "hidden",
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