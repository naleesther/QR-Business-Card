import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useLocation } from "react-router-dom";

export default function ProfileForm() {
    const [errors, setErrors] = useState({});

    const location = useLocation();
    const mode = location.state?.mode || "create";


  const [form, setForm] = useState({
    full_name: "",
    job_title: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    bio: "",
    portfolio_link: "",
  });

  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    if (!form.full_name) newErrors.full_name = "Full name is required";
    if (!form.job_title) newErrors.job_title = "Job title is required";
    if (!form.company) newErrors.company = "Company is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    if (!form.email) newErrors.email = "Email is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

 useEffect(() => {
   if (mode === "edit") {
     API.get("/profile/")
       .then((res) => {
         console.log("EDIT DATA:", res.data);

         setForm({
           full_name: res.data.full_name || "",
           job_title: res.data.job_title || "",
           company: res.data.company || "",
           phone: res.data.phone || "",
           email: res.data.email || "",
           website: res.data.website || "",
           bio: res.data.bio || "",
           portfolio_link: res.data.portfolio_link || "",
         });
       })
       .catch((err) => console.log(err));
   }
 }, [mode]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) return; 

  try {
    await API.post("/profile/", form);
    navigate("/profile");
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Create / Edit Profile</h2>
          <p className="text-gray-500 text-sm">
            Fill in your business details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            placeholder="Full Name"
            className={`w-full border p-2 rounded-lg ${errors.full_name ? "border-red-500" : ""}`}
          />
          {errors.full_name && (
            <p className="text-red-500">{errors.full_name}</p>
          )}

          <input
            name="job_title"
            value={form.job_title}
            onChange={handleChange}
            placeholder="Job Title"
            className={`w-full border p-2 rounded-lg ${errors.job_title ? "border-red-500" : ""}`}
          />
          {errors.job_title && (
            <p className="text-red-500">{errors.job_title}</p>
          )}

          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className={`w-full border p-2 rounded-lg ${errors.company ? "border-red-500" : ""}`}
          />
          {errors.company && <p className="text-red-500">{errors.company}</p>}

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className={`w-full border p-2 rounded-lg ${errors.phone ? "border-red-500" : ""}`}
          />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className={`w-full border p-2 rounded-lg ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Website (optional)"
            className={`w-full border p-2 rounded-lg ${errors.website ? "border-red-500" : ""}`}
          />
          {errors.website && <p className="text-red-500">{errors.website}</p>}

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Short Bio (optional)"
            className={`w-full border p-2 rounded-lg ${errors.bio ? "border-red-500" : ""}`}
          />
          {errors.bio && <p className="text-red-500">{errors.bio}</p>}

          <input
            name="portfolio_link"
            value={form.portfolio_link}
            onChange={handleChange}
            placeholder="Portfolio Link (optional)"
            className={`w-full border p-2 rounded-lg ${errors.portfolio_link ? "border-red-500" : ""}`}
          />
          {errors.portfolio_link && (
            <p className="text-red-500">{errors.portfolio_link}</p>
          )}
          <Link to= "/profile">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Save Profile
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
