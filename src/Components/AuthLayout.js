export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Digital Business Cards</h1>

          <p className="text-lg mb-4">
            Create your professional profile and share it instantly using a QR
            code.
          </p>

          <p className="text-sm opacity-80">
            Build your brand. Connect with clients. Grow your business.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
