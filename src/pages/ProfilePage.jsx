

// import { useState, useEffect } from "react";
// import Footer from "../component/Footer";
// import NavBar from "../component/NavBar";
// import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
// import { useAuthStore } from "../store/auth";
// import Swal from "sweetalert2";

// export default function ProfilePage() {
//   const { user, token, setUser, loadUserFromStorage } = useAuthStore();

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   // Load user from localStorage on mount
//   useEffect(() => {
//     loadUserFromStorage();
//   }, []);

//   // Sync form with user data
//   useEffect(() => {
//     if (!user) return;

//     setFormData({
//       firstName: user.firstName || "",
//       lastName: user.lastName || "",
//       email: user.email || "",
//       phone: user.phone || "",
//       address: user.address || "",
//     });
//   }, [user]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Handle avatar upload
//   const handleAvatarChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file || !token) return;

//     const formDataFile = new FormData();
//     formDataFile.append("files", file);

//     try {
//       const res = await fetch("http://localhost:1337/api/upload", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formDataFile,
//       });

//       const data = await res.json();
//       const avatarUrl = data[0].url;

//       // Update Zustand + localStorage
//       setUser({ ...user, avatar: avatarUrl }, token);

//       Swal.fire({
//         title: "Avatar updated",
//         icon: "success",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (err) {
//       console.error(err);
//       Swal.fire({ title: "Error uploading avatar", icon: "error" });
//     }
//   };

//   // Handle update profile info
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!token || !user) return;

//     try {
//       const res = await fetch(`http://localhost:1337/api/users/${user.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const updatedUser = await res.json();

//       // Update Zustand + localStorage
//       setUser(
//         {
//           ...updatedUser,
//           username: `${updatedUser.firstName} ${updatedUser.lastName}`,
//         },
//         token
//       );

//       Swal.fire({
//         title: "Profile updated",
//         icon: "success",
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (err) {
//       console.error(err);
//       Swal.fire({ title: "Error updating profile", icon: "error" });
//     }
//   };

//   return (
//     <>
//       <NavBar />

//       <div
//         className="w-full h-[350px] bg-cover bg-center"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       ></div>

//       <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
//         {/* User Avatar */}
//         <div className="relative mb-6">
//           <img
//             src={user?.avatar || "https://i.pravatar.cc/150"}
//             className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
//             alt="User Avatar"
//           />
//           <label className="absolute bottom-1 right-1 bg-pink-500 text-white p-2 rounded-full cursor-pointer text-xs">
//             ✏️
//             <input type="file" className="hidden" onChange={handleAvatarChange} />
//           </label>
//         </div>

//         {/* Profile Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-6 rounded-xl shadow w-full max-w-md"
//         >
//           <h2 className="text-center font-semibold mb-6">General information</h2>

//           <div className="flex gap-3 mb-4">
//             <div className="w-full">
//               <label className="text-sm text-gray-500">First Name</label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded mt-1"
//               />
//             </div>

//             <div className="w-full">
//               <label className="text-sm text-gray-500">Last Name</label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded mt-1"
//               />
//             </div>
//           </div>

//           <div className="mb-4">
//             <label className="text-sm text-gray-500">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               disabled
//               className="w-full border p-2 rounded mt-1 bg-gray-100"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="text-sm text-gray-500">Phone number</label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full border p-2 rounded mt-1"
//             />
//           </div>

//           <div className="mb-6">
//             <label className="text-sm text-gray-500">Address</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full border p-2 rounded mt-1"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
//           >
//             Update information
//           </button>
//         </form>
//       </div>

//       <Footer />
//     </>
//   );
// }

import { useState, useEffect } from "react";
import Footer from "../component/Footer";
import NavBar from "../component/NavBar";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import { useAuthStore } from "../store/auth";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const { user, token, setUser, loadUserFromStorage } = useAuthStore();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  // ✅ تحميل من localStorage
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  // ✅ جلب أحدث بيانات من Strapi
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;

      try {
        const res = await fetch("http://localhost:1337/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        console.log("User Data:", data);

        setUser(
          {
            ...data,
            username: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
          },
          token
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, [token]);

  // ✅ مزامنة الفورم مع اليوزر
  useEffect(() => {
    if (!user) return;

    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ رفع الصورة + ربطها باليوزر
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !token) return;

    const formDataFile = new FormData();
    formDataFile.append("files", file);

    try {
      // 1️⃣ رفع الصورة
      const uploadRes = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataFile,
      });

      const uploadData = await uploadRes.json();
      const avatarUrl = uploadData[0].url;

      // 2️⃣ ربط الصورة باليوزر في Strapi
      await fetch(`http://localhost:1337/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          avatar: avatarUrl,
        }),
      });

      // 3️⃣ تحديث Zustand
      setUser({ ...user, avatar: avatarUrl }, token);

      Swal.fire({
        title: "Avatar updated",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({ title: "Error uploading avatar", icon: "error" });
    }
  };

  // ✅ تحديث البيانات
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token || !user) return;

    try {
      const res = await fetch(`http://localhost:1337/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const updatedUser = await res.json();

      setUser(
        {
          ...updatedUser,
          username: `${updatedUser.firstName} ${updatedUser.lastName}`,
        },
        token
      );

      Swal.fire({
        title: "Profile updated",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire({ title: "Error updating profile", icon: "error" });
    }
  };

  return (
    <>
      <NavBar />

      <div
        className="w-full h-[350px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      <div className="flex flex-col items-center py-10 bg-gray-100 min-h-screen">
        {/* Avatar */}
        <div className="relative mb-6">
          <img
            src={
              user?.avatar?.startsWith("http")
                ? user.avatar
                : user?.avatar
                ? `http://localhost:1337${user.avatar}`
                : "https://i.pravatar.cc/150"
            }
            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow"
            alt="User Avatar"
          />
          <label className="absolute bottom-1 right-1 bg-pink-500 text-white p-2 rounded-full cursor-pointer text-xs">
            ✏️
            <input type="file" className="hidden" onChange={handleAvatarChange} />
          </label>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow w-full max-w-md"
        >
          <h2 className="text-center font-semibold mb-6">
            General information
          </h2>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full border p-2 rounded"
            />
          </div>

          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full border p-2 rounded mb-4 bg-gray-100"
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full border p-2 rounded mb-4"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border p-2 rounded mb-6"
          />

          <button className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition">
            Update information
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}