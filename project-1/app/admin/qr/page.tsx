import CafeQRCode from '../../components/CafeQRCode';

export default function QRPage() {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">
        OliveTap QR Generator
      </h1>

      <div className="border rounded-xl p-6 w-fit">
        <h2 className="text-xl font-semibold mb-2">
          Cafe 0004
        </h2>

        <p className="text-gray-600 mb-5">
          https://olivetap.pk/cafe/0004
        </p>

        <CafeQRCode slug="0004" />
      </div>
    </main>
  );
}