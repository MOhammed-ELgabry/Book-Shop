
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useState, useEffect } from "react";
// import { useAuthStore } from "../store/auth";
// import RegisterSkeleton from "../component/skeletons/auth/RegisterSkeleton";

// export default function RegisterPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const setUser = useAuthStore((state) => state.setUser);

//   // 👇 fake loading بسيط علشان السكيلتون يظهر
//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 600);
//   }, []);

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agree: false,
//   };

//   const validationSchema = Yup.object({
//     firstName: Yup.string().required("First Name is required"),
//     lastName: Yup.string().required("Last Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Passwords must match")
//       .required("Confirm Password is required"),
//     agree: Yup.bool().oneOf([true], "You must accept the terms"),
//   });

//   const registerSubmit = async (values, { resetForm }) => {
//     try {
//       const res = await axios.post("http://localhost:1337/api/auth/local/register", {
//         username: `${values.firstName}_${values.lastName}`,
//         email: values.email,
//         password: values.password,
//       });

//       setUser(res.data.user, res.data.jwt);

//       Swal.fire({ title: "Register success", icon: "success" });
//       resetForm();
//       navigate("/");
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: err.response?.data?.error?.message || "Error occurred",
//       });
//     }
//   };

//   // 👇 هنا السحر
//   if (loading) return <RegisterSkeleton />;

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
//         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={registerSubmit}>
//           {() => (
//             <Form className="flex flex-col gap-6">

//               <div className="flex flex-col sm:flex-row sm:gap-4 gap-4">
//                 <div className="flex flex-col gap-2 flex-1">
//                   <label>First Name</label>
//                   <Field name="firstName" className="input input-bordered w-full p-2" />
//                   <ErrorMessage name="firstName" component="p" className="text-red-600" />
//                 </div>

//                 <div className="flex flex-col gap-2 flex-1">
//                   <label>Last Name</label>
//                   <Field name="lastName" className="input input-bordered w-full p-2" />
//                   <ErrorMessage name="lastName" component="p" className="text-red-600" />
//                 </div>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label>Email</label>
//                 <Field name="email" className="input input-bordered w-full p-2" />
//                 <ErrorMessage name="email" component="p" className="text-red-600" />
//               </div>

//               <div className="flex flex-col gap-2 relative">
//                 <label>Password</label>
//                 <Field
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   className="input input-bordered w-full pr-10 p-2"
//                 />
//                 <ErrorMessage name="password" component="p" className="text-red-600" />

//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
//                 >
//                   {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                 </span>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label>Confirm Password</label>
//                 <Field
//                   type={showPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   className="input input-bordered w-full p-2"
//                 />
//                 <ErrorMessage name="confirmPassword" component="p" className="text-red-600" />
//               </div>

//               <div className="flex gap-2 items-center">
//                 <Field type="checkbox" name="agree" />
//                 <label>Agree with Terms & Conditions</label>
//               </div>

//               <ErrorMessage name="agree" component="p" className="text-red-600" />

//               <button className="bg-pink-600 text-white py-2 rounded-2xl">
//                 Sign Up
//               </button>

//               <p className="text-center text-sm">
//                 Already have an account?{" "}
//                 <span onClick={() => navigate("/login")} className="text-blue-500 underline cursor-pointer">
//                   Login
//                 </span>
//               </p>

//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// // }

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useState, useEffect } from "react";
// import { useAuthStore } from "../store/auth";
// import RegisterSkeleton from "../component/skeletons/auth/RegisterSkeleton";

// export default function RegisterPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const setUser = useAuthStore((state) => state.setUser);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 600);
//   }, []);

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agree: false,
//   };

//   const validationSchema = Yup.object({
//     firstName: Yup.string().required("First Name is required"),
//     lastName: Yup.string().required("Last Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Passwords must match")
//       .required("Confirm Password is required"),
//     agree: Yup.bool().oneOf([true], "You must accept the terms"),
//   });

//   const registerSubmit = async (values, { resetForm }) => {
//     try {
//       // ✅ 1. Register user
//       const res = await axios.post(
//         "http://localhost:1337/api/auth/local/register",
//         {
//           username: `${values.firstName}_${values.lastName}`,
//           email: values.email,
//           password: values.password,
//         }
//       );

//       const { user: createdUser, jwt: token } = res.data;

//       // ✅ 2. Create profile (Strapi v4)
//       await axios.post(
//         "http://localhost:1337/api/profiles",
//         {
//           data: {
//             firstName: values.firstName,
//             lastName: values.lastName,
//             phone: "",
//             address: "",
//             users_permissions_user: createdUser.id, // 🔥 المهم هنا
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // ✅ 3. Get user with profile
//       const fullUserRes = await axios.get(
//         `http://localhost:1337/api/users/${createdUser.id}?populate=profile.avatar`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const fullUser = fullUserRes.data;
//       const profile = fullUser.profile;

//       // ✅ 4. Merge data
//       const mergedUser = {
//         ...createdUser,
//         firstName: profile?.firstName || values.firstName,
//         lastName: profile?.lastName || values.lastName,
//         phone: profile?.phone || "",
//         address: profile?.address || "",
//         avatar: profile?.avatar?.url
//           ? `http://localhost:1337${profile.avatar.url}`
//           : null,
//       };

//       setUser(mergedUser, token);

//       Swal.fire({
//         icon: "success",
//         title: "Register success",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//       resetForm();
//       navigate("/");
//     } catch (err) {
//       console.error(err);

//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text:
//           err.response?.data?.error?.message ||
//           "Something went wrong",
//       });
//     }
//   };

//   if (loading) return <RegisterSkeleton />;

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={registerSubmit}
//         >
//           {() => (
//             <Form className="flex flex-col gap-6">
              
//               {/* Names */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="flex flex-col gap-2 flex-1">
//                   <label>First Name</label>
//                   <Field name="firstName" className="p-2 border rounded" />
//                   <ErrorMessage name="firstName" component="p" className="text-red-600" />
//                 </div>

//                 <div className="flex flex-col gap-2 flex-1">
//                   <label>Last Name</label>
//                   <Field name="lastName" className="p-2 border rounded" />
//                   <ErrorMessage name="lastName" component="p" className="text-red-600" />
//                 </div>
//               </div>

//               {/* Email */}
//               <div className="flex flex-col gap-2">
//                 <label>Email</label>
//                 <Field name="email" className="p-2 border rounded" />
//                 <ErrorMessage name="email" component="p" className="text-red-600" />
//               </div>

//               {/* Password */}
//               <div className="flex flex-col gap-2 relative">
//                 <label>Password</label>
//                 <Field
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   className="p-2 border rounded pr-10"
//                 />
//                 <ErrorMessage name="password" component="p" className="text-red-600" />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-9 cursor-pointer"
//                 >
//                   {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                 </span>
//               </div>

//               {/* Confirm */}
//               <div className="flex flex-col gap-2">
//                 <label>Confirm Password</label>
//                 <Field
//                   type={showPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   className="p-2 border rounded"
//                 />
//                 <ErrorMessage name="confirmPassword" component="p" className="text-red-600" />
//               </div>

//               {/* Agree */}
//               <div className="flex items-center gap-2">
//                 <Field type="checkbox" name="agree" />
//                 <label>Agree with Terms</label>
//               </div>
//               <ErrorMessage name="agree" component="p" className="text-red-600" />

//               {/* Button */}
//               <button
//                 type="submit"
//                 className="bg-pink-600 text-white py-2 rounded"
//               >
//                 Sign Up
//               </button>

//               {/* Login */}
//               <p className="text-center text-sm">
//                 Already have an account?{" "}
//                 <span
//                   onClick={() => navigate("/login")}
//                   className="text-blue-500 cursor-pointer underline"
//                 >
//                   Login
//                 </span>
//               </p>

//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useState, useEffect } from "react";
// import { useAuthStore } from "../store/auth";
// import RegisterSkeleton from "../component/skeletons/auth/RegisterSkeleton";

// export default function RegisterPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const setUser = useAuthStore((state) => state.setUser);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 600);
//   }, []);

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agree: false,
//   };

//   const validationSchema = Yup.object({
//     firstName: Yup.string().required("First Name is required"),
//     lastName: Yup.string().required("Last Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Passwords must match")
//       .required("Confirm Password is required"),
//     agree: Yup.bool().oneOf([true], "You must accept the terms"),
//   });

//   const registerSubmit = async (values, { resetForm }) => {
//     try {
//       // ======================
//       // 1. REGISTER USER
//       // ======================
//       const res = await axios.post(
//         "http://localhost:1337/api/auth/local/register",
//         {
//           username: `${values.firstName}_${values.lastName}`,
//           email: values.email,
//           password: values.password,
//         }
//       );

//       const { user: createdUser, jwt: token } = res.data;

//       // ======================
//       // 2. CREATE PROFILE
//       // ======================
//       await axios.post(
//         "http://localhost:1337/api/profiles",
//         {
//           data: {
//             firstName: values.firstName,
//             lastName: values.lastName,
//             phone: "",
//             address: "",
//             users_permissions_user: createdUser.id,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // ======================
//       // 3. SET USER BASIC DATA
//       // ======================
//       const baseUser = {
//         id: createdUser.id,
//         email: createdUser.email,
//         username: createdUser.username,
//         firstName: values.firstName,
//         lastName: values.lastName,
//         avatar: null,
//       };

//       setUser(baseUser, token);

//       // ======================
//       // 4. FETCH FULL PROFILE (IMPORTANT 🔥)
//       // ======================
//       await useAuthStore.getState().fetchProfile();

//       Swal.fire({
//         icon: "success",
//         title: "Account created successfully",
//         timer: 1500,
//         showConfirmButton: false,
//       });

//       resetForm();
//       navigate("/");
//     } catch (err) {
//       console.error(err);

//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: err.response?.data?.error?.message || "Something went wrong",
//       });
//     }
//   };

//   if (loading) return <RegisterSkeleton />;

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={registerSubmit}
//         >
//           {() => (
//             <Form className="flex flex-col gap-5">

//               {/* First + Last Name */}
//               <div className="flex gap-3">
//                 <div className="flex-1">
//                   <label>First Name</label>
//                   <Field name="firstName" className="input" />
//                   <ErrorMessage name="firstName" className="text-red-500" component="p" />
//                 </div>

//                 <div className="flex-1">
//                   <label>Last Name</label>
//                   <Field name="lastName" className="input" />
//                   <ErrorMessage name="lastName" className="text-red-500" component="p" />
//                 </div>
//               </div>

//               {/* Email */}
//               <div>
//                 <label>Email</label>
//                 <Field name="email" className="input w-full" />
//                 <ErrorMessage name="email" className="text-red-500" component="p" />
//               </div>

//               {/* Password */}
//               <div className="relative">
//                 <label>Password</label>
//                 <Field
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   className="input w-full"
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-9 cursor-pointer"
//                 >
//                   {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                 </span>
//                 <ErrorMessage name="password" className="text-red-500" component="p" />
//               </div>

//               {/* Confirm Password */}
//               <div>
//                 <label>Confirm Password</label>
//                 <Field
//                   type={showPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   className="input w-full"
//                 />
//                 <ErrorMessage name="confirmPassword" className="text-red-500" component="p" />
//               </div>

//               {/* Agree */}
//               <div className="flex items-center gap-2">
//                 <Field type="checkbox" name="agree" />
//                 <label>I agree to terms</label>
//               </div>
//               <ErrorMessage name="agree" className="text-red-500" component="p" />

//               {/* Submit */}
//               <button
//                 type="submit"
//                 className="bg-pink-600 text-white py-2 rounded"
//               >
//                 Sign Up
//               </button>

//               <p className="text-center text-sm">
//                 Already have an account?{" "}
//                 <span
//                   onClick={() => navigate("/login")}
//                   className="text-blue-500 cursor-pointer underline"
//                 >
//                   Login
//                 </span>
//               </p>

//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useState, useEffect } from "react";
// import { useAuthStore } from "../store/auth";
// import RegisterSkeleton from "../component/skeletons/auth/RegisterSkeleton";
// import { loginWithGoogle } from "../auth/googleAuth"
// export default function RegisterPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const setUser = useAuthStore((state) => state.setUser);

//   const handleGoogleLogin = async () => {
//   try {
//     const user = await loginWithGoogle();

//     // هنا بنحفظه في Zustand (زي نظامك الحالي)
//     setUser(
//       {
//         id: user.id,
//         email: user.email,
//         username: user.name,
//         avatar: user.avatar,
//       },
//       null // مفيش JWT من Strapi هنا
//     );

//     navigate("/");
//   } catch (err) {
//     console.log(err);
//   }
// };
// useEffect(() => {
//   const params = new URLSearchParams(window.location.search);

//   const token = params.get("access_token");

//   if (token) {
//     localStorage.setItem("token", token);

//     navigate("/");
//   }
// }, []);
//   useEffect(() => {
//     setTimeout(() => setLoading(false), 600);
//   }, []);

//   const initialValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     agree: false,
//   };

//   const validationSchema = Yup.object({
//     firstName: Yup.string().required(),
//     lastName: Yup.string().required(),
//     email: Yup.string().email().required(),
//     password: Yup.string().min(6).required(),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Not match")
//       .required(),
//     agree: Yup.bool().oneOf([true]),
//   });

//   const registerSubmit = async (values, { resetForm }) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:1337/api/auth/local/register",
//         {
//           username: `${values.firstName}_${values.lastName}`,
//           email: values.email,
//           password: values.password,
//         }
//       );

//       const { user, jwt } = res.data;

//       await axios.post(
//         "http://localhost:1337/api/profiles",
//         {
//           data: {
//             firstName: values.firstName,
//             lastName: values.lastName,
//             users_permissions_user: user.id,
//           },
//         },
//         {
//           headers: { Authorization: `Bearer ${jwt}` },
//         }
//       );

//       setUser(
//         {
//           id: user.id,
//           email: user.email,
//           firstName: values.firstName,
//           lastName: values.lastName,
//         },
//         jwt
//       );

//       Swal.fire("Success", "Account created", "success");

//       resetForm();
//       navigate("/");
//     } catch (err) {
//       Swal.fire("Error", "Register failed", "error");
//     }
//   };

//   if (loading) return <RegisterSkeleton />;

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
//       <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">

//         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={registerSubmit}>
//           {() => (
//             <Form className="flex flex-col gap-6">

//               <div className="flex flex-col sm:flex-row sm:gap-4 gap-4">
//                 <div className="flex flex-col gap-2 flex-1">
//                   <label>First Name</label>
//                   <Field name="firstName" className="input input-bordered w-full p-2" />
//                   <ErrorMessage name="firstName" component="p" className="text-red-600" />
//                 </div>

//                 <div className="flex flex-col gap-2 flex-1">
//                   <label>Last Name</label>
//                   <Field name="lastName" className="input input-bordered w-full p-2" />
//                   <ErrorMessage name="lastName" component="p" className="text-red-600" />
//                 </div>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label>Email</label>
//                 <Field name="email" className="input input-bordered w-full p-2" />
//                 <ErrorMessage name="email" component="p" className="text-red-600" />
//               </div>

//               <div className="flex flex-col gap-2 relative">
//                 <label>Password</label>
//                 <Field
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   className="input input-bordered w-full pr-10 p-2"
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute top-9 right-3 cursor-pointer"
//                 >
//                   {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                 </span>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label>Confirm Password</label>
//                 <Field
//                   type={showPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   className="input input-bordered w-full p-2"
//                 />
//               </div>

//               <div className="flex gap-2 items-center">
//                 <Field type="checkbox" name="agree" />
//                 <label>Agree with Terms</label>
//               </div>

//               <button className="bg-pink-600 text-white py-2 rounded-2xl">
//                 Sign Up
//               </button>

//               <p className="text-center text-sm">
//                 Already have an account?{" "}
//                 <span onClick={() => navigate("/login")} className="text-blue-500 underline cursor-pointer">
//                   Login
//                 </span>
//               </p>
//               <button
//   type="button"
//   onClick={handleGoogleLogin}
//   className="w-full border py-2 rounded mt-3 flex items-center justify-center gap-2"
// >
//   Sign in with Google
// </button>
//             </Form>
//           )}
//         </Formik>

//       </div>
//     </div>
//   );
// }
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import RegisterSkeleton from "../component/skeletons/auth/RegisterSkeleton";
import { loginWithGoogle } from "../auth/googleAuth";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  // ======================
  // GOOGLE LOGIN
  // ======================
 const handleGoogleLogin = async () => {
  try {
    const res = await loginWithGoogle();

    const { jwt, user } = res;

    setUser(user, jwt);

    Swal.fire("Success", "Logged in with Google", "success");

    navigate("/");
  } catch (err) {
    console.log(err);
    Swal.fire("Error", "Google login failed", "error");
  }
};
  // ======================
  // LOADING
  // ======================
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // ======================
  // INITIAL VALUES
  // ======================
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  };

  // ======================
  // VALIDATION
  // ======================
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),

    lastName: Yup.string().required("Required"),

    email: Yup.string()
      .email("Invalid email")
      .required("Required"),

    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Required"),

    agree: Yup.bool().oneOf([true], "Required"),
  });

  // ======================
  // REGISTER
  // ======================
  const registerSubmit = async (values, { resetForm }) => {
    try {
      // 🔥 register user
      const registerRes = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username: `${values.firstName}_${values.lastName}_${Date.now()}`,
          email: values.email,
          password: values.password,
        }
      );

      const { user, jwt } = registerRes.data;

      console.log("REGISTER SUCCESS:", registerRes.data);

      // 🔥 create profile
      await axios.post(
        "http://localhost:1337/api/profiles",
        {
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: "",
            address: "",
            users_permissions_user: user.id,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // 🔥 save user in zustand
      setUser(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: values.firstName,
          lastName: values.lastName,
        },
        jwt
      );

      Swal.fire("Success", "Account created successfully", "success");

      resetForm();

      navigate("/");
    } catch (err) {
      console.log("REGISTER ERROR:", err);

      Swal.fire(
        "Error",
        err.response?.data?.error?.message || "Register failed",
        "error"
      );
    }
  };

  // ======================
  // LOADER
  // ======================
  if (loading) {
    return <RegisterSkeleton />;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md flex flex-col gap-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={registerSubmit}
        >
          {() => (
            <Form className="flex flex-col gap-6">

              {/* FIRST + LAST NAME */}
              <div className="flex flex-col sm:flex-row gap-4">

                <div className="flex flex-col gap-2 flex-1">
                  <label>First Name</label>

                  <Field
                    name="firstName"
                    className="input input-bordered w-full p-2"
                  />

                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className="text-red-600 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label>Last Name</label>

                  <Field
                    name="lastName"
                    className="input input-bordered w-full p-2"
                  />

                  <ErrorMessage
                    name="lastName"
                    component="p"
                    className="text-red-600 text-sm"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-2">
                <label>Email</label>

                <Field
                  type="email"
                  name="email"
                  className="input input-bordered w-full p-2"
                />

                <ErrorMessage
                  name="email"
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
                  className="input input-bordered w-full p-2 pr-10"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 cursor-pointer"
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

              {/* CONFIRM PASSWORD */}
              <div className="flex flex-col gap-2">
                <label>Confirm Password</label>

                <Field
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="input input-bordered w-full p-2"
                />

                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-600 text-sm"
                />
              </div>

              {/* TERMS */}
              <div className="flex items-center gap-2">
                <Field type="checkbox" name="agree" />

                <label>Agree with Terms</label>
              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                className="bg-pink-600 text-white py-2 rounded-xl hover:bg-pink-700 transition"
              >
                Sign Up
              </button>

              {/* LOGIN */}
              <p className="text-center text-sm">
                Already have an account؟{" "}

                <span
                  onClick={() => navigate("/login")}
                  className="text-blue-500 underline cursor-pointer"
                >
                  Login
                </span>
              </p>

              {/* GOOGLE */}
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

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}