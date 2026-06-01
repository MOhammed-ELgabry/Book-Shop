
// import { useState, useEffect } from "react";
// import { useAuthStore } from "../store/auth";
// import Swal from "sweetalert2";
// import api from "../api/api";
// import NavBar from "../component/NavBar";
// import Footer from "../component/Footer";
// import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
// import { normalizeUser } from "../utils/normalizeUser";

// const BASE_URL = "http://localhost:1337";

// export default function ProfilePage() {

//   const { user, token, setUser } = useAuthStore();

//   const [profileId, setProfileId] = useState(null);
 
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     phone: "",
//     address: "",
//   });

//   const [avatarFile, setAvatarFile] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState("");

//   // ======================
//   // LOAD PROFILE
//   // ======================
//   useEffect(() => {

//     const loadProfile = async () => {

//       if (!token || !user?.id) return;

//       try {

//         const res = await api.get(
//           `/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`
//         );

//         const profile = res.data?.data?.[0];

//         if (!profile) {

//           Swal.fire(
//             "Info",
//             "No profile found for this user",
//             "info"
//           );

//           return;
//         }

//         setProfileId(profile.documentId);

//         setFormData({
//           firstName: profile.firstName || "",
//           lastName: profile.lastName || "",
//           phone: profile.phone || "",
//           address: profile.address || "",
//         });

//         // ======================
//         // AVATAR PREVIEW
//         // ======================
//         if (profile?.avatar?.url) {

//           const avatarUrl =
//             profile.avatar.url.startsWith("http")
//               ? profile.avatar.url
//               : `${BASE_URL}${profile.avatar.url}`;

//           setAvatarPreview(avatarUrl);
//         }

//       } catch (err) {

//         console.log(
//           "FETCH PROFILE ERROR:",
//           err
//         );

//         Swal.fire(
//           "Error",
//           "Failed to load profile",
//           "error"
//         );
//       }
//     };

//     loadProfile();

//     // ======================
//     // CLEANUP OBJECT URL
//     // ======================
//     return () => {

//       if (
//         avatarPreview &&
//         avatarPreview.startsWith("blob:")
//       ) {
//         URL.revokeObjectURL(
//           avatarPreview
//         );
//       }
//     };

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

//     const previewUrl =
//       URL.createObjectURL(file);

//     setAvatarPreview(previewUrl);
//   };

//   // ======================
//   // UPDATE PROFILE
//   // ======================
//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     if (!profileId) {

//       Swal.fire(
//         "Error",
//         "Profile not found",
//         "error"
//       );

//       return;
//     }

//     setLoading(true);

//     try {

//       let avatarId = null;

//       // ======================
//       // UPLOAD AVATAR
//       // ======================
//       if (avatarFile) {

//         const form = new FormData();

//         form.append(
//           "files",
//           avatarFile
//         );

//         const uploadRes =
//           await api.post(
//             "/upload",
//             form
//           );

//         avatarId =
//           uploadRes.data?.[0]?.id;
//       }

//       // ======================
//       // PREPARE UPDATE DATA
//       // ======================
//       const updatedData = {
//         ...formData,
//       };

//       // 🔥 only update avatar if uploaded
//       if (avatarId) {
//         updatedData.avatar = avatarId;
//       }

//       // ======================
//       // UPDATE PROFILE
//       // ======================
//       await api.put(
//         `/profiles/${profileId}`,
//         {
//           data: updatedData,
//         }
//       );

//       // ======================
//       // REFETCH PROFILE
//       // ======================
//       const profileRes =
//         await api.get(
//           `/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`
//         );

//       const updatedProfile =
//         profileRes.data?.data?.[0];

//       // ======================
//       // NORMALIZE USER
//       // ======================
//       const normalizedUser =
//         normalizeUser(
//           user,
//           updatedProfile
//         );

//       // ======================
//       // UPDATE STORE
//       // ======================
//       setUser(
//         normalizedUser,
//         token
//       );

//       // ======================
//       // UPDATE PREVIEW
//       // ======================
//       if (
//         normalizedUser.avatar
//       ) {
//         setAvatarPreview(
//           normalizedUser.avatar
//         );
//       }

//       Swal.fire({
//         icon: "success",
//         title: "Profile Updated",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//       setAvatarFile(null);

//     } catch (err) {

//       console.log(
//         "UPDATE PROFILE ERROR:",
//         err
//       );

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
//           backgroundImage:
//             `url(${bgImage})`,
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
//             alt="avatar"
//           />

//           <input
//             type="file"
//             id="avatarInput"
//             hidden
//             onChange={
//               handleAvatarChange
//             }
//           />

//           <label
//             htmlFor="avatarInput"
//             className="absolute bottom-1 right-1 bg-pink-500 text-white p-2 rounded-full cursor-pointer"
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
//             {loading
//               ? "Updating..."
//               : "Update"}
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
import { normalizeUser } from "../utils/normalizeUser";

const BASE_URL = "http://localhost:1337";

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

          const avatarUrl =
            profile.avatar.url.startsWith("http")
              ? profile.avatar.url
              : `${BASE_URL}${profile.avatar.url}`;

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
      if (
        normalizedUser.avatar
      ) {
        setAvatarPreview(
          normalizedUser.avatar
        );
      }

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
    <>
      <NavBar />

      <div
        className="w-full h-[350px] bg-cover bg-center"
        style={{
          backgroundImage:
            `url(${bgImage})`,
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
            alt="avatar"
          />

          <input
            type="file"
            id="avatarInput"
            hidden
            onChange={
              handleAvatarChange
            }
          />

          <label
            htmlFor="avatarInput"
            className="absolute bottom-1 right-1 bg-pink-500 text-white p-2 rounded-full cursor-pointer"
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
            className="w-full border p-2 rounded mb-3"
            placeholder="Address"
          />

       

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded"
          >
            {loading
              ? "Updating..."
              : "Update"}
          </button>

        </form>
      </div>

      <Footer />
    </>
  );
}