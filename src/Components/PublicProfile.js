import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

export default function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log("USERNAME:", username);

    API.get(`/public-profile/${username}/`)
      .then((res) => {
        console.log("SUCCESS:", res.data);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log("ERROR:", err.message, err.response);
      });
  }, [username]);

  if (!profile) {
    return <p>Loading Profile....</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 h-80">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">{profile.full_name}</h2>
          <p className="text-gray-500">{profile.job_title}</p>
          <p className="text-sm text-gray-400">{profile.company}</p>
        </div>

        <hr className="mb-4" />

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>📞</strong> {profile.phone}
          </p>
          <p>
            <strong>📧</strong> {profile.email}
          </p>

          {profile.website && (
            <p>
              <strong>🌐</strong>
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
      </div>
    </div>
  );
}
