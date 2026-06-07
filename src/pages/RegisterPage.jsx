
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
import { normalizeUser } from "../utils/normalizeUser";
import api from "../api/api";
import { useLanguageStore } from "../store/languageStore";
import { dictionary } from "../i18n/dictionary";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function RegisterPage() {
  const lang = useLanguageStore((state) => state.lang);
  const t = dictionary[lang];

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);

  // const handleGoogleLogin = async () => {
  //   try {
  //     const res = await loginWithGoogle();
  //     const { jwt, user } = res;

  //     const profileRes = await axios.get(
  //       `${BASE_URL}/api/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`,
  //       {
  //         headers: { Authorization: `Bearer ${jwt}` },
  //       }
  //     );

  //     const profile = profileRes.data?.data?.[0];
  //     const normalizedUser = normalizeUser(user, profile);

  //     setUser(normalizedUser, jwt);

  //     Swal.fire({
  //       icon: "success",
  //       title: lang === "en" ? "Success" : "تم بنجاح",
  //       text: lang === "en" ? "Logged in with Google" : "تم تسجيل الدخول بجوجل",
  //     });

  //     navigate("/");
  //   } catch (err) {
  //     Swal.fire({
  //       icon: "error",
  //       title: lang === "en" ? "Error" : "خطأ",
  //       text: lang === "en" ? "Google login failed" : "فشل تسجيل الدخول بجوجل",
  //     });
  //   }
  // };


const handleGoogleLogin = async () => {
  try {
    const firebaseRes = await loginWithGoogle();
    const firebaseUser = firebaseRes.user;

    const res = await api.post("/google-auth/googleLogin", {
      email: firebaseUser.email,
      username: firebaseUser.displayName,
      firebaseUid: firebaseUser.uid,
      googleAvatar: firebaseUser.photoURL,
    });

    const { jwt, user } = res.data;

    const profile = user.profile;
    const normalizedUser = normalizeUser(user, profile);

    setUser(normalizedUser, jwt);

    Swal.fire({
      icon: "success",
      title: lang === "en" ? "Success" : "تم بنجاح",
      text: lang === "en" ? "Logged in with Google" : "تم تسجيل الدخول بجوجل",
    });

    navigate("/");
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: lang === "en" ? "Error" : "خطأ",
      text: lang === "en" ? "Google login failed" : "فشل تسجيل الدخول بجوجل",
    });
  }
};
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Required"),
    agree: Yup.bool().oneOf([true], "Required"),
  });

  const registerSubmit = async (values, { resetForm }) => {
    try {
      const registerRes = await axios.post(
        `${BASE_URL}/api/auth/local/register`,
        {
          username: `${values.firstName}_${values.lastName}_${Date.now()}`,
          email: values.email,
          password: values.password,
        }
      );

      const { user, jwt } = registerRes.data;

      await axios.post(
        `${BASE_URL}/api/profiles`,
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
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
   

      const profileRes = await axios.get(
        `${BASE_URL}/api/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`,
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      const profile = profileRes.data?.data?.[0];
      const normalizedUser = normalizeUser(user, profile);

      setUser(normalizedUser, jwt);

      Swal.fire({
        icon: "success",
        title: lang === "en" ? "Success" : "نجاح",
        text:
          lang === "en"
            ? "Account created successfully"
            : "تم إنشاء الحساب بنجاح",
      });

      resetForm();
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: lang === "en" ? "Error" : "خطأ",
        text:
          err.response?.data?.error?.message ||
          (lang === "en" ? "Register failed" : "فشل التسجيل"),
      });
    }
  };

  if (loading) return <RegisterSkeleton />;

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
                  <Field name="firstName" placeholder={lang === "en" ? "First Name" : "الاسم الأول"} />
                  <ErrorMessage name="firstName" component="p" className="text-red-600 text-sm" />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <Field name="lastName" placeholder={lang === "en" ? "Last Name" : "الاسم الأخير"} />
                  <ErrorMessage name="lastName" component="p" className="text-red-600 text-sm" />
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-2">
                <Field
                  type="email"
                  name="email"
                  placeholder={lang === "en" ? "Email" : "البريد الإلكتروني"}
                />
                <ErrorMessage name="email" component="p" className="text-red-600 text-sm" />
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col gap-2 relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={lang === "en" ? "Password" : "كلمة المرور"}
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>

                <ErrorMessage name="password" component="p" className="text-red-600 text-sm" />
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="flex flex-col gap-2">
                <Field
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder={lang === "en" ? "Confirm Password" : "تأكيد كلمة المرور"}
                />
                <ErrorMessage name="confirmPassword" component="p" className="text-red-600 text-sm" />
              </div>

              {/* TERMS */}
              <div className="flex items-center gap-2">
                <Field type="checkbox" name="agree" />
                <label>
                  {lang === "en" ? "Agree with Terms" : "الموافقة على الشروط"}
                </label>
              </div>

              {/* REGISTER BUTTON */}
              <button type="submit" className="bg-pink-600 text-white py-2 rounded-xl">
                {lang === "en" ? "Sign Up" : "إنشاء حساب"}
              </button>

              {/* LOGIN */}
              <p className="text-center text-sm">
                {lang === "en" ? "Already have an account?" : "عندك حساب؟"}{" "}
                <span onClick={() => navigate("/login")} className="text-blue-500 underline cursor-pointer">
                  {lang === "en" ? "Login" : "تسجيل دخول"}
                </span>
              </p>

              {/* GOOGLE */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded-xl"
              >
                <FcGoogle size={22} />
                <span>
                  {lang === "en" ? "Continue with Google" : "المتابعة بجوجل"}
                </span>
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}