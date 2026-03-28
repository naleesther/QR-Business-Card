import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/profile/").then((res) => setProfile(res.data));
  }, []);

  const handlePayment = async () => {
    const phone = prompt("Enter phone number");
    if (!phone) return;

    try{
      await API.post("pay/", {phone});
      alert ("Complete payment");

      const interval = setInterval(async () =>{
        const res = await API.get("/profile");

        if (res.data.is_paid) {
          clearInterval(interval);
          alert("Payment confirmed!");
          navigate("/qr");
        }
        },1000);

    }catch (err) {
      alert("Payment failed")
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </button>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">{profile.full_name}</h2>
          <p className="text-gray-500">{profile.job_title}</p>
          <p className="text-sm text-gray-400">{profile.company}</p>
        </div>

        <hr className="mb-4" />
        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>📞 Phone:</strong> {profile.phone}
          </p>
          <p>
            <strong>📧 Email:</strong> {profile.email}
          </p>

          {profile.website && (
            <p>
              <strong>🌐 Website:</strong>{" "}
              <a href={profile.website} className="text-blue-600">
                {profile.website}
              </a>
            </p>
          )}
        </div>

        {profile.bio && (
          <>
            <hr className="my-4" />
            <p className="text-gray-600 text-sm">{profile.bio}</p>
          </>
        )}

        <button
          onClick={handlePayment}
          className="w-full mt-6 bg-[#0A4174] hover:bg-blue-300 text-white py-2 rounded-lg"
        >
          Get QR Code
        </button>
      </div>
    </div>
  );
}
