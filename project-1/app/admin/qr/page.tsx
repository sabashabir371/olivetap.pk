"use client";

import { useState } from "react";
import CafeQRCode from "@/app/components/CafeQRCode";

export default function AdminQRPage() {
  const [slug, setSlug] = useState("0004"); // Default code

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          OliveTap QR Generator
        </h1>

        {/* Code Input Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1">
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Enter Cafe / Venue Code
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. 0003, 0005, cafe-name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Quick Select Buttons for Fast Testing */}
          <div className="flex items-end gap-2">
            {["0001", "0002", "0003", "0004", "0005"].map((code) => (
              <button
                key={code}
                onClick={() => setSlug(code)}
                className={`px-3 py-2 text-xs font-medium rounded-lg border transition ${
                  slug === code
                    ? "bg-black text-white border-black"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Active Cafe Code Display & QR Component */}
        <div className="border-t border-gray-100 pt-6">
          <p className="text-xl font-semibold text-gray-800 mb-1">
            Cafe: <span className="font-mono text-black">{slug || "..."}</span>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            URL: <span className="font-mono text-gray-700">https://olivetap.pk/cafe/{slug}</span>
          </p>

          {slug ? (
            <CafeQRCode slug={slug} />
          ) : (
            <p className="text-sm text-red-500">Please enter a valid cafe code above.</p>
          )}
        </div>
      </div>
    </div>
  );
}