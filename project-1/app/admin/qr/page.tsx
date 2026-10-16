
"use client";

import { useState } from "react";
import CafeQRCode from "@/app/components/CafeQRCode";

export default function QRPage() {
  const [slug, setSlug] = useState("0003");

  const cleanSlug = slug.trim();

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">
        OliveTap QR Generator
      </h1>

      <div className="mb-6 max-w-md">
        <label className="block font-medium mb-2">
          Enter Cafe Slug
        </label>

        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="e.g. 0003"
          className="w-full border rounded-lg p-3"
        />
      </div>

      {cleanSlug ? (
        <div className="border rounded-xl p-6 w-fit">
          <h2 className="text-xl font-semibold mb-4">
            Cafe {cleanSlug}
          </h2>

          <CafeQRCode slug={cleanSlug} />
        </div>
      ) : (
        <p>Please enter a cafe slug.</p>
      )}
    </main>
  );
}
