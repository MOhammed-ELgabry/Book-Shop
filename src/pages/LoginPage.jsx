// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { FcGoogle } from "react-icons/fc";
// import { useState, useEffect } from "react";
// import { useAuthStore } from "../store/auth";
// import LoginSkeleton from "../component/skeletons/auth/LoginSkeleton";
// import { loginWithGoogle } from "../auth/googleAuth";

// const BASE_URL = "http://localhost:1337";

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const setUser = useAuthStore((state) => state.setUser);

//   // =========================
//   // GOOGLE LOGIN
//   // =========================
// const handleGoogleLogin = async () => {
//   try {

//     // 🔥 Google Login
//     const res = await loginWithGoogle();

//     const { jwt, user } = res;

//     // 🔥 Fetch Full Profile
//     const profileRes = await axios.get(
//       `${BASE_URL}/api/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`,
//       {
//         headers: {
//           Authorization: `Bearer ${jwt}`,
//         },
//       }
//     );

//     const profile = profileRes.data?.data?.[0];

//     // 🔥 Avatar URL
//     let avatar = null;

//     // 🟢 Strapi Media
//     if (profile?.avatar?.url) {
//       avatar = profile.avatar.url.startsWith("http")
//         ? profile.avatar.url
//         : `${BASE_URL}${profile.avatar.url}`;
//     }

//     // 🔥 Unified User Shape
//     const mergedUser = {
//       ...user,
//       firstName: profile?.firstName || "",
//       lastName: profile?.lastName || "",
//       phone: profile?.phone || "",
//       address: profile?.address || "",
//       avatar,
//     };

//     // 🔥 Save in Zustand
//     setUser(mergedUser, jwt);

//     Swal.fire({
//       icon: "success",
//       title: "Logged in with Google",
//       timer: 1500,
//       showConfirmButton: false,
//     });

//     navigate("/");

//   } catch (err) {

//     console.log("GOOGLE LOGIN ERROR:", err);

//     Swal.fire({
//       icon: "error",
//       title: "Google login failed",
//     });
//   }
// };

//   // =========================
//   // SKELETON
//   // =========================
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, []);

//   // =========================
//   // FORMIK
//   // =========================
//   const initialValues = {
//     identifier: "",
//     password: "",
//   };

//   const validationSchema = Yup.object({
//     identifier: Yup.string()
//       .email("Invalid email")
//       .required("Email is required"),

//     password: Yup.string().required("Password is required"),
//   });

//   // =========================
//   // LOGIN SUBMIT
//   // =========================
//   const loginSubmit = async (values) => {
//     try {
//       // LOGIN
//       const res = await axios.post(
//         `${BASE_URL}/api/auth/local`,
//         values
//       );

//       const token = res.data.jwt;
//       const user = res.data.user;

//       // PROFILE
//       const profileRes = await axios.get(
//         `${BASE_URL}/api/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const profile = profileRes.data?.data?.[0];

//       // AVATAR
//       let avatar = null;

//       if (profile?.avatar?.url) {
//         avatar = profile.avatar.url.startsWith("http")
//           ? profile.avatar.url
//           : `${BASE_URL}${profile.avatar.url}`;
//       }

//       const mergedUser = {
//         ...user,
//         firstName: profile?.firstName || "",
//         lastName: profile?.lastName || "",
//         phone: profile?.phone || "",
//         address: profile?.address || "",
//         avatar,
//       };

//       // SAVE
//       setUser(mergedUser, token);

//       Swal.fire({
//         icon: "success",
//         title: "Login Success",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//       navigate("/");
//     } catch (err) {
//       console.log("LOGIN ERROR:", err);

//       Swal.fire({
//         icon: "error",
//         title: "Login Failed",
//         text: "Email or password is incorrect",
//       });
//     }
//   };

//   if (loading) return <LoginSkeleton />;

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md flex flex-col gap-6">
        
//         <h2 className="text-center text-pink-600 text-2xl font-semibold">
//           Welcome Back
//         </h2>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={loginSubmit}
//         >
//           {() => (
//             <Form className="flex flex-col gap-6">

//               {/* EMAIL */}
//               <div className="flex flex-col gap-2">
//                 <label>Email</label>

//                 <Field
//                   name="identifier"
//                   className="input input-bordered w-full p-2 border rounded"
//                 />

//                 <ErrorMessage
//                   name="identifier"
//                   component="p"
//                   className="text-red-600 text-sm"
//                 />
//               </div>

//               {/* PASSWORD */}
//               <div className="flex flex-col gap-2 relative">
//                 <label>Password</label>

//                 <Field
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   className="input input-bordered w-full p-2 border rounded pr-10"
//                 />

//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-10 cursor-pointer text-xl"
//                 >
//                   {showPassword ? (
//                     <AiOutlineEyeInvisible />
//                   ) : (
//                     <AiOutlineEye />
//                   )}
//                 </span>

//                 <ErrorMessage
//                   name="password"
//                   component="p"
//                   className="text-red-600 text-sm"
//                 />
//               </div>

//               {/* LOGIN BUTTON */}
//               <button
//                 type="submit"
//                 className="bg-pink-600 text-white py-2 rounded-xl hover:bg-pink-700 transition"
//               >
//                 Login
//               </button>

//               {/* GOOGLE LOGIN */}
//               <button
//                 type="button"
//                 onClick={handleGoogleLogin}
//                 className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-xl hover:bg-gray-50 transition"
//               >
//                 <FcGoogle size={22} />

//                 <span className="font-medium text-gray-700">
//                   Continue with Google
//                 </span>
//               </button>

//               {/* REGISTER */}
//               <p className="text-center text-sm">
//                 Don&apos;t have an account?{" "}
//                 <span
//                   onClick={() => navigate("/register")}
//                   className="text-blue-500 underline cursor-pointer"
//                 >
//                   Register
//                 </span>
//               </p>

//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

//ما قبل اخر تعديل 

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import LoginSkeleton from "../component/skeletons/auth/LoginSkeleton";
import { loginWithGoogle } from "../auth/googleAuth";
import { normalizeUser } from "../utils/normalizeUser";

const BASE_URL = "http://localhost:1337";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  // =========================
  // GOOGLE LOGIN
  // =========================
  const handleGoogleLogin = async () => {
    try {

      // 🔥 Google Login
      const res = await loginWithGoogle();

      const { jwt, user } = res;

      // 🔥 Fetch Profile
      const profileRes = await axios.get(
        `${BASE_URL}/api/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const profile = profileRes.data?.data?.[0];

      // 🔥 Normalize User
      const normalizedUser = normalizeUser(user, profile);

      // 🔥 Save
      setUser(normalizedUser, jwt);

      Swal.fire({
        icon: "success",
        title: "Logged in with Google",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");

    } catch (err) {

      console.log("GOOGLE LOGIN ERROR:", err);

      Swal.fire({
        icon: "error",
        title: "Google login failed",
      });
    }
  };

  // =========================
  // SKELETON
  // =========================
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // =========================
  // FORMIK
  // =========================
  const initialValues = {
    identifier: "",
    password: "",
  };

  const validationSchema = Yup.object({
    identifier: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string().required("Password is required"),
  });

  // =========================
  // LOGIN SUBMIT
  // =========================
  const loginSubmit = async (values) => {

    try {

      // 🔥 Login
      const res = await axios.post(
        `${BASE_URL}/api/auth/local`,
        values
      );

      const token = res.data.jwt;
      const user = res.data.user;

      // 🔥 Fetch Profile
      const profileRes = await axios.get(
        `${BASE_URL}/api/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profile = profileRes.data?.data?.[0];

      // 🔥 Normalize User
      const normalizedUser = normalizeUser(user, profile);

      // 🔥 Save
      setUser(normalizedUser, token);

      Swal.fire({
        icon: "success",
        title: "Login Success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");

    } catch (err) {

      console.log("LOGIN ERROR:", err);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Email or password is incorrect",
      });
    }
  };

  if (loading) return <LoginSkeleton />;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md flex flex-col gap-6">
        
        <h2 className="text-center text-pink-600 text-2xl font-semibold">
          Welcome Back
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={loginSubmit}
        >
          {() => (
            <Form className="flex flex-col gap-6">

              {/* EMAIL */}
              <div className="flex flex-col gap-2">
                <label>Email</label>

                <Field
                  name="identifier"
                  className="input input-bordered w-full p-2 border rounded"
                />

                <ErrorMessage
                  name="identifier"
                  component="p"
                  className="text-red-600 text-sm"
                />
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col gap-2 relative">
                <label>Password</label>

                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full p-2 border rounded pr-10"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 cursor-pointer text-xl"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>

                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-600 text-sm"
                />
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="bg-pink-600 text-white py-2 rounded-xl hover:bg-pink-700 transition"
              >
                Login
              </button>

              {/* GOOGLE LOGIN */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-xl hover:bg-gray-50 transition"
              >
                <FcGoogle size={22} />

                <span className="font-medium text-gray-700">
                  Continue with Google
                </span>
              </button>

              {/* REGISTER */}
              <p className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="text-blue-500 underline cursor-pointer"
                >
                  Register
                </span>
              </p>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}