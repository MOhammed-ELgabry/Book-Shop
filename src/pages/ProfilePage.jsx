
// import { useState, useEffect } from "react";
// import { useAuthStore } from "../store/auth";
// import Swal from "sweetalert2";
// import api from "../api/api";
// import NavBar from "../component/NavBar";
// import Footer from "../component/Footer";
// import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";

// const BASE_URL = "http://localhost:1337";

// export default function ProfilePage() {
//   const { user, token, fetchProfile } = useAuthStore();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     address: "",
//   });

//   const [profileId, setProfileId] = useState(null);

//   const [avatarFile, setAvatarFile] = useState(null);

//   const [avatarPreview, setAvatarPreview] = useState("");

//   const [loading, setLoading] = useState(false);

//   // ======================
//   // FETCH PROFILE
//   // ======================
//   useEffect(() => {
//     const loadProfile = async () => {
//       if (!user?.id || !token) return;
//  console.log("TOKEN INSIDE REQUEST:", token);
//       try {
//         const res = await api.get(
//   `/users/me?populate[profile][populate]=avatar`
// );

// const profile = res.data?.profile;

//         if (!profile) return;

//         console.log("PROFILE:", profile);

//         setProfileId(profile.documentId);

//         setFormData({
//           firstName: profile.firstName || "",
//           lastName: profile.lastName || "",
//           phone: profile.phone || "",
//           address: profile.address || "",
//         });

//         // avatar from strapi upload
//         let avatarUrl = "";

//         if (profile.avatar?.url) {
//           avatarUrl = profile.avatar.url.startsWith("http")
//             ? profile.avatar.url
//             : `${BASE_URL}${profile.avatar.url}`;
//         }

//         // fallback google avatar
//         else if (user?.avatar) {
//           avatarUrl = user.avatar;
//         }

//         setAvatarPreview(avatarUrl);
//       } catch (err) {
//         console.log("FETCH PROFILE ERROR:", err);
//       }
//     };

//     loadProfile();
//   }, [user?.id, token]);

//   // ======================
//   // INPUT CHANGE
//   // ======================
//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // ======================
//   // AVATAR CHANGE
//   // ======================
//   const handleAvatarChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     setAvatarFile(file);

//     // preview only
//     const localPreview = URL.createObjectURL(file);

//     setAvatarPreview(localPreview);
//   };

//   // ======================
//   // UPDATE PROFILE
//   // ======================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!profileId) return;

//     setLoading(true);

//     try {
//       let avatarId = null;

//       // upload new image
//       if (avatarFile) {
//         const form = new FormData();

//         form.append("files", avatarFile);

//         const uploadRes = await api.post("/upload", form);

//         avatarId = uploadRes.data?.[0]?.id;

//         console.log("UPLOADED IMAGE:", uploadRes.data);
//       }

//       // update profile
//       await api.put(`/profiles/${profileId}`, {
//         data: {
//           ...formData,

//           ...(avatarId && {
//             avatar: avatarId,
//           }),
//         },
//       });

//       // refresh auth store
//       await fetchProfile();

//       // refresh local preview
//       if (avatarId) {
//         const refreshed = await api.get(
//           `/profiles/${profileId}?populate=*`
//         );

//         const updatedAvatar =
//           refreshed.data?.data?.avatar?.url;

//         if (updatedAvatar) {
//           setAvatarPreview(
//             updatedAvatar.startsWith("http")
//               ? updatedAvatar
//               : `${BASE_URL}${updatedAvatar}`
//           );
//         }
//       }

//       setAvatarFile(null);

//       Swal.fire({
//         icon: "success",
//         title: "Profile Updated",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (err) {
//       console.log("UPDATE PROFILE ERROR:", err);

//       Swal.fire({
//         icon: "error",
//         title: "Update Failed",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <NavBar />

//       <div
//         className="w-full h-[350px] bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//         }}
//       />

//       <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
        
//         {/* AVATAR */}
//         <div className="relative mb-6">
//           <img
//             src={
//               avatarPreview ||
//               "https://i.pravatar.cc/150"
//             }
//             className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
//             alt="User Avatar"
//           />

//           <input
//             id="avatarInput"
//             type="file"
//             accept="image/*"
//             hidden
//             onChange={handleAvatarChange}
//           />

//           <label
//             htmlFor="avatarInput"
//             className="absolute bottom-1 right-1 bg-pink-500 text-white p-2 rounded-full cursor-pointer text-xs"
//           >
//             ✏️
//           </label>
//         </div>

//         {/* FORM */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-xl shadow w-full max-w-md"
//         >
//           <h2 className="text-center font-semibold mb-6">
//             General Information
//           </h2>

//           <input
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mb-3"
//             placeholder="First Name"
//           />

//           <input
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mb-3"
//             placeholder="Last Name"
//           />

//           <input
//             value={user?.email || ""}
//             disabled
//             className="w-full border p-2 rounded mb-3 bg-gray-100"
//           />

//           <input
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mb-3"
//             placeholder="Phone"
//           />

//           <input
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             className="w-full border p-2 rounded mb-4"
//             placeholder="Address"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-pink-500 text-white py-2 rounded"
//           >
//             {loading ? "Updating..." : "Update"}
//           </button>
//         </form>
//       </div>

//       <Footer />
//     </>
//   );
// }

import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import Swal from "sweetalert2";
import api from "../api/api";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";

const BASE_URL = "http://localhost:1337";

export default function ProfilePage() {

  const { user, token, fetchProfile } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
  });

  const [profileId, setProfileId] = useState(null);

  const [avatarFile, setAvatarFile] = useState(null);

  const [avatarPreview, setAvatarPreview] = useState("");

  const [loading, setLoading] = useState(false);

  // ======================
  // LOAD PROFILE
  // ======================
  useEffect(() => {

    const loadProfile = async () => {

      if (!user?.id || !token) {
        return;
      }

      try {

        console.log("FETCHING PROFILE...");

        const res = await api.get(
          `/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`
        );

        console.log("PROFILE RESPONSE:", res.data);

        const profile = res.data?.data?.[0];

        if (!profile) {
          console.log("NO PROFILE FOUND");
          return;
        }

        setProfileId(profile.id);

        setFormData({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          phone: profile.phone || "",
          address: profile.address || "",
        });

        // 🔥 avatar
        let avatarUrl = "";

        if (profile?.avatar?.url) {

          avatarUrl = profile.avatar.url.startsWith("http")
            ? profile.avatar.url
            : `${BASE_URL}${profile.avatar.url}`;

        } else if (user?.avatar) {

          avatarUrl = user.avatar;

        }

        setAvatarPreview(avatarUrl);

      } catch (err) {

        console.log("FETCH PROFILE ERROR:", err);

      }
    };

    loadProfile();

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

    const preview = URL.createObjectURL(file);

    setAvatarPreview(preview);
  };

  // ======================
  // SUBMIT
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

      // 🔥 upload avatar
      if (avatarFile) {

        const form = new FormData();

        form.append("files", avatarFile);

        const uploadRes = await api.post(
          "/upload",
          form
        );

        avatarId = uploadRes.data?.[0]?.id;
      }

      // 🔥 update profile
      await api.put(`/profiles/${profileId}`, {
        data: {
          ...formData,
          ...(avatarId && {
            avatar: avatarId,
          }),
        },
      });

      // 🔥 refresh store
      await fetchProfile();

      setAvatarFile(null);

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        timer: 1500,
        showConfirmButton: false,
      });

    } catch (err) {

      console.log("UPDATE PROFILE ERROR:", err);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
      });

    } finally {

      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <div
        className="w-full h-[350px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">

        {/* AVATAR */}
        <div className="relative mb-6">

          <img
            src={
              avatarPreview ||
              "https://i.pravatar.cc/150"
            }
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
            alt="User Avatar"
          />

          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            hidden
            onChange={handleAvatarChange}
          />

          <label
            htmlFor="avatarInput"
            className="absolute bottom-1 right-1 bg-pink-500 text-white p-2 rounded-full cursor-pointer text-xs"
          >
            ✏️
          </label>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow w-full max-w-md"
        >

          <h2 className="text-center font-semibold mb-6">
            General Information
          </h2>

          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-3"
            placeholder="First Name"
          />

          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-3"
            placeholder="Last Name"
          />

          <input
            value={user?.email || ""}
            disabled
            className="w-full border p-2 rounded mb-3 bg-gray-100"
          />

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-3"
            placeholder="Phone"
          />

          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4"
            placeholder="Address"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>

        </form>
      </div>

      <Footer />
    </>
  );
}