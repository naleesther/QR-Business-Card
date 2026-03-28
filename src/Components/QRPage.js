// eslint-disable-next-line
import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function QRPage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile/");
      setProfile(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    const phone = prompt("Enter your phone number");

    if (!phone) return;

    try {
      const res = await API.post("pay/", { phone });

      console.log(res.data);
      alert("Payment initiated. Complete on your phone.");
    } catch (err) {
      console.log("PAYMENT ERROR:", err.response?.data || err.message);
      alert("Payment failed");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <button
        onClick={() => navigate("/profile")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Profile
      </button>
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-2">Your QR Code</h2>
        <p className="text-gray-500 mb-6">
          Share your digital business card easily
        </p>

        {profile?.is_paid && profile?.qr_code ? (
          <>
            <img
              src={`http://127.0.0.1:8000${profile.qr_code}`}
              alt="QR Code"
              className="mx-auto w-48 mb-4"
            />

            <a
              href={`http://127.0.0.1:8000${profile.qr_code}`}
              download
              className="text-blue-600 font-medium"
            >
              Download QR Code
            </a>

            <p className="text-green-600 mt-4 font-medium">
              ✅ Payment successful
            </p>
          </>
        ) : (
          <div>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-gray-700 font-medium">
                🔒 Your QR code is locked
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Complete payment to unlock your QR code
              </p>
            </div>

            <button
              onClick={handlePayment}
              disabled={paying}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              {paying ? "Processing..." : "Pay with M-Pesa"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
