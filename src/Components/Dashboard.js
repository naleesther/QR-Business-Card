import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
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
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Where Whizzes make it happen</h1>
          <p className="text-gray-500">
            Manage your business profile and be the solution businesses have
            been looking for
          </p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
      <div className="  text-[#0A4174] p-6 rounded-2xl shadow mb-8">
        <h2 className="text-3xl font-bold mb-2">Welcome 👋</h2>
        <p className=" text-xl">
          Create your digital business card and share it with clients instantly.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between h-[470px]">
          <div>
            <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
            <p className="text-gray-500 mb-4">
              Create and manage your business profile
            </p>
          </div>

          <div className="flex gap-3">
                <button
                  onClick={() =>
                    navigate("/profile-form", { state: { mode: "create" } })
                  }
                  className="w-1/2 bg-[#0A4174] hover:bg-blue-300 text-white py-2 rounded-lg"
                >
                  Create Profile
                </button>

                <button
                  onClick={() => navigate("/profile")}
                  className="w-1/2 bg-[#0A4174] hover:bg-blue-300 text-white py-2 rounded-lg"
                >
                  View
                </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2">Edit Profile</h3>
            <p className="text-gray-500 mb-4">
              Update your information anytime
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/profile-form", { state: { mode: "edit" } })
            }
            className="bg-[#0A4174] hover:bg-blue-300 text-white py-2 rounded-lg"
          >
            Edit / Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
