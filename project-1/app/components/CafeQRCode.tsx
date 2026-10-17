"use client";

import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";

interface CafeQRCodeProps {
  slug: string;
}

export default function CafeQRCode({ slug }: CafeQRCodeProps) {
  const url = `https://olivetap.pk/cafe/${slug}`;
  const svgId = `qr-svg-${slug}`;
  const canvasId = `qr-canvas-${slug}`;

  // 1. Download SVG directly from the SVG element
  const downloadSVG = () => {
    const svgElement = document.getElementById(svgId);
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
    URL.revokeObjectURL(svgUrl);
  };

  // 2. Download PNG directly from the Canvas element (No conversion errors!)
  const downloadPNG = () => {
    const canvasElement = document.getElementById(canvasId) as HTMLCanvasElement | null;
    if (!canvasElement) return;

    const pngUrl = canvasElement.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `cafe-${slug}-qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.download = `cafe-${slug}-qr.png`;
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Visual Display & SVG Export */}
      <div className="bg-white p-4 rounded-xl shadow-sm inline-block">
        <QRCodeSVG
          id={svgId}
          value={url}
          size={300}
          level="H"
          imageSettings={{
            src: "/icon.png",
            height: 50,
            width: 50,
            excavate: true,
          }}
        />
      </div>

      {/* Hidden Canvas used exclusively for clean, instant PNG downloads */}
      <div className="hidden">
        <QRCodeCanvas
          id={canvasId}
          value={url}
          size={1000} // High resolution print quality
          level="H"
          imageSettings={{
            src: "/icon.png",
            height: 160,
            width: 160,
            excavate: true,
          }}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={downloadPNG}
          type="button"
          className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800 transition"
        >
          Download PNG
        </button>
        <button
          onClick={downloadSVG}
          type="button"
          className="rounded-lg bg-gray-100 border border-gray-300 px-4 py-2 text-sm text-black hover:bg-gray-200 transition"
        >
          Download SVG
        </button>
      </div>
    </div>
  );
}