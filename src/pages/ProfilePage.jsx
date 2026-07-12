
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import Swal from "sweetalert2";
import api from "../api/api";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import { normalizeUser } from "../utils/normalizeUser";
import { getStrapiMedia } from "../utils/getStrapiMedia";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Info,
  Edit3
} from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function ProfilePage() {

  const { user, token, setUser } = useAuthStore();

  const [profileId, setProfileId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    role: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // ======================
  // LOAD PROFILE
  // ======================
  useEffect(() => {

    const loadProfile = async () => {

      if (!token || !user?.id) return;

      try {

        const res = await api.get(
          `/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`
        );

        const profile = res.data?.data?.[0];

        console.log("PROFILE DATA:", profile);

        if (!profile) {

          Swal.fire(
            "Info",
            "No profile found for this user",
            "info"
          );

          return;
        }

        setProfileId(profile.documentId);

        setFormData({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          phone: profile.phone || "",
          address: profile.address || "",
          role: profile.role || "user",
        });

        // ======================
        // AVATAR PREVIEW
        // ======================
        if (profile?.avatar?.url) {

          const avatarUrl = getStrapiMedia(profile.avatar?.url);

          setAvatarPreview(avatarUrl);
        }

      } catch (err) {

        console.log(
          "FETCH PROFILE ERROR:",
          err
        );

        Swal.fire(
          "Error",
          "Failed to load profile",
          "error"
        );
      }
    };

    loadProfile();

    // ======================
    // CLEANUP OBJECT URL
    // ======================
    return () => {

      if (
        avatarPreview &&
        avatarPreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(
          avatarPreview
        );
      }
    };

  }, [user?.id, token]);

  // ======================
  // INPUT CHANGE
  // ======================
  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ======================
  // AVATAR CHANGE
  // ======================
  const handleAvatarChange = (e) => {

    const file = e.target.files?.[0];

    if (!file) return;

    setAvatarFile(file);

    const previewUrl =
      URL.createObjectURL(file);

    setAvatarPreview(previewUrl);
  };

  // ======================
  // UPDATE PROFILE
  // ======================
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!profileId) {

      Swal.fire(
        "Error",
        "Profile not found",
        "error"
      );

      return;
    }

    setLoading(true);

    try {

      let avatarId = null;

      // ======================
      // UPLOAD AVATAR
      // ======================
      if (avatarFile) {

        const form = new FormData();

        form.append(
          "files",
          avatarFile
        );

        const uploadRes =
          await api.post(
            "/upload",
            form
          );

        avatarId =
          uploadRes.data?.[0]?.id;
      }

      // ======================
      // PREPARE UPDATE DATA
      // ======================
      const updatedData = {
        ...formData,
      };

      // 🔥 only update avatar if uploaded
      if (avatarId) {
        updatedData.avatar = avatarId;
      }

      // ======================
      // UPDATE PROFILE
      // ======================
      await api.put(
        `/profiles/${profileId}`,
        {
          data: updatedData,
        }
      );

      // ======================
      // REFETCH PROFILE
      // ======================
      const profileRes =
        await api.get(
          `/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`
        );

      const updatedProfile =
        profileRes.data?.data?.[0];

      // ======================
      // NORMALIZE USER
      // ======================
      const normalizedUser =
        normalizeUser(
          user,
          updatedProfile
        );

      // ======================
      // UPDATE STORE
      // ======================
      setUser(
        normalizedUser,
        token
      );

      // ======================
      // UPDATE PREVIEW
      // ======================
      setAvatarPreview(
        getStrapiMedia(normalizedUser.avatar)
      );
      
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1500,
        showConfirmButton: false,
      });

      setAvatarFile(null);

    } catch (err) {

      console.log(
        "UPDATE PROFILE ERROR:",
        err
      );

      Swal.fire({
        icon: "error",
        title: "Update Failed",
      });

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <NavBar />

      {/* Hero Banner */}
      <div 
        className="relative h-[300px] md:h-[400px] bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 animate__animated animate__fadeIn">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Account <span className="text-orange-500">Settings</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl font-medium max-w-2xl">
            Manage your personal information, preferences, and account security in one place.
          </p>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 -mt-24 md:-mt-32 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Overview Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200/60 border border-white flex flex-col items-center text-center sticky top-24">
              <div className="relative mb-8 group">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img
                    src={avatarPreview || getStrapiMedia(user?.avatar?.url) || "https://i.pravatar.cc/150"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt="avatar"
                  />
                </div>
                <input type="file" id="avatarInput" hidden onChange={handleAvatarChange} />
                <label 
                  htmlFor="avatarInput" 
                  className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-2xl cursor-pointer shadow-lg transition-all hover:scale-110 active:scale-95 group-hover:rotate-12"
                >
                  <Camera size={20} />
                </label>
              </div>

              <h2 className="text-3xl font-black text-slate-900 mb-1">
                {formData.firstName || formData.lastName ? `${formData.firstName} ${formData.lastName}` : user?.username || "User"}
              </h2>
              <p className="text-slate-500 font-medium mb-6 flex items-center justify-center gap-2">
                <Mail size={16} className="text-orange-500" />
                {user?.email}
              </p>

              <div className="flex flex-wrap justify-center gap-3 w-full">
                <span className="px-4 py-2 bg-orange-50 text-orange-600 rounded-xl text-xs font-black uppercase tracking-widest border border-orange-100">
                  {formData.role || "Member"}
                </span>
                <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100">
                  Verified
                </span>
              </div>

              <div className="w-full h-px bg-slate-100 my-8" />

              <div className="grid grid-cols-2 gap-4 w-full text-left">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Profile Ready</p>
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <CheckCircle2 size={16} className="text-orange-500" />
                    100%
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Security</p>
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    High
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information Forms */}
          <div className="lg:col-span-8 space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Personal Information</h3>
                  <p className="text-slate-500 text-sm font-medium">Your public profile details and contact info.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">First Name</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full h-14 pl-12 pr-6 bg-slate-50 border-2 border-transparent rounded-2xl outline-none transition-all focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 font-medium"
                        placeholder="John"
                      />
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Last Name</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full h-14 pl-12 pr-6 bg-slate-50 border-2 border-transparent rounded-2xl outline-none transition-all focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 font-medium"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email (Readonly) */}
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Mail size={18} />
                      </div>
                      <input
                        value={user?.email || ""}
                        disabled
                        className="w-full h-14 pl-12 pr-6 bg-slate-100 border-2 border-transparent rounded-2xl font-medium text-slate-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Phone Number</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                        <Phone size={18} />
                      </div>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full h-14 pl-12 pr-6 bg-slate-50 border-2 border-transparent rounded-2xl outline-none transition-all focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 font-medium"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 uppercase tracking-wider ml-1">Physical Address</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-5 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                      <MapPin size={18} />
                    </div>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full p-6 pl-12 bg-slate-50 border-2 border-transparent rounded-2xl outline-none transition-all focus:bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 font-medium resize-none"
                      placeholder="123 Street Name, City, Country"
                    />
                  </div>
                </div>

                {/* Action Section */}
                <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-3 text-slate-400 text-sm font-medium">
                    <Info size={16} />
                    <span>Last updated: just now</span>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto px-12 h-14 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/30 hover:bg-orange-600 hover:scale-105 active:scale-95 transition-all disabled:bg-slate-200 disabled:shadow-none disabled:scale-100 flex items-center justify-center gap-3"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Edit3 size={20} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Account Status / Extra Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-6 group hover:border-orange-200 transition-colors">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">Account Type</h4>
                  <p className="text-slate-500 font-medium text-sm">Professional {formData.role || "user"}</p>
                </div>
              </div>
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-6 group hover:border-orange-200 transition-colors">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <Clock size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">Member Since</h4>
                  <p className="text-slate-500 font-medium text-sm">Joined April 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}