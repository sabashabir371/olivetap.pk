"use client";

import { QRCodeSVG } from "qrcode.react";

interface CafeQRCodeProps {
  slug: string;
}

export default function CafeQRCode({ slug }: CafeQRCodeProps) {
  const url = `https://olivetap.pk/cafe/${slug}`;

  const downloadQR = () => {
    const svg = document.getElementById(`qr-${slug}`);

    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const img = new Image();

    img.onload = () => {
      canvas.width = 1000;
      canvas.height = 1000;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0, 1000, 1000);

      const pngUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `OliveTap-QR-${slug}.png`;

      link.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgString)));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <QRCodeSVG
        id={`qr-${slug}`}
        value={url}
        size={300}
        level="H"
      />

      <button
        onClick={downloadQR}
        className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800"
      >
        Download QR Code
      </button>
    </div>
  );
}