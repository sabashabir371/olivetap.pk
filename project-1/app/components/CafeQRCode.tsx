"use client";

import { QRCodeSVG } from "qrcode.react";

interface CafeQRCodeProps {
  slug: string;
}

export default function CafeQRCode({ slug }: CafeQRCodeProps) {
  const url = `https://olivetap.pk/cafe/${slug}`;

  const downloadQR = () => {
    const svgElement = document.getElementById(`qr-${slug}`);
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = `cafe-${slug}-qr.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white p-4 rounded-xl shadow-sm inline-block">
        <QRCodeSVG
          id={`qr-${slug}`}
          value={url}
          size={300}
          level="H"
        />
      </div>

      <button
        onClick={downloadQR}
        className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800 transition"
      >
        Download QR Code
      </button>
    </div>
  );
}