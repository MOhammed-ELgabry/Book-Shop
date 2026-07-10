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

// 🌍 i18n
import { useLanguageStore } from "../store/languageStore";
import { dictionary } from "../i18n/dictionary";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  // 🌍 language
  const lang = useLanguageStore((state) => state.lang);
  const t = dictionary[lang];

  // =========================
  // GOOGLE LOGIN
  // =========================
  const handleGoogleLogin = async () => {
    try {
      const res = await loginWithGoogle();

      const { jwt, user } = res;

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
        title: lang === "en" ? "Logged in with Google" : "تم تسجيل الدخول",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: lang === "en" ? "Google login failed" : "فشل تسجيل الدخول",
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const initialValues = {
    identifier: "",
    password: "",
  };

  const validationSchema = Yup.object({
    identifier: Yup.string()
      .email(lang === "en" ? "Invalid email" : "بريد غير صالح")
      .required(lang === "en" ? "Email is required" : "البريد مطلوب"),

    password: Yup.string().required(
      lang === "en" ? "Password is required" : "كلمة المرور مطلوبة"
    ),
  });

  const loginSubmit = async (values) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/local`,
        values
      );

      const token = res.data.jwt;
      const user = res.data.user;

      const profileRes = await axios.get(
        `${BASE_URL}/api/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const profile = profileRes.data?.data?.[0];
      const normalizedUser = normalizeUser(user, profile);

      setUser(normalizedUser, token);

      Swal.fire({
        icon: "success",
        title: lang === "en" ? "Login Success" : "تم تسجيل الدخول",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: lang === "en" ? "Login Failed" : "فشل تسجيل الدخول",
        text:
          lang === "en"
            ? "Email or password is incorrect"
            : "البريد أو كلمة المرور غير صحيحة",
      });
    }
  };

  if (loading) return <LoginSkeleton />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-slate-100 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/70 bg-white/95 p-6 shadow-xl shadow-slate-200/70 sm:p-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium text-pink-600">
            {lang === "en" ? "Book Shop Account" : "حساب متجر الكتب"}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {lang === "en" ? "Welcome Back" : "مرحبًا بعودتك"}
          </h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={loginSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  {lang === "en" ? "Email" : "البريد الإلكتروني"}
                </label>

                <Field
                  name="identifier"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
                />

                <ErrorMessage
                  name="identifier"
                  component="p"
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  {lang === "en" ? "Password" : "كلمة المرور"}
                </label>

                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>

                <ErrorMessage
                  name="password"
                  component="p"
                  className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting
                  ? lang === "en"
                    ? "Logging in..."
                    : "جاري تسجيل الدخول..."
                  : lang === "en" ? "Login" : "تسجيل الدخول"}
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
              >
                <FcGoogle size={22} />
                <span>
                  {lang === "en"
                    ? "Continue with Google"
                    : "تسجيل بجوجل"}
                </span>
              </button>

              <p className="text-center text-sm text-slate-600">
                {lang === "en"
                  ? "Don't have an account?"
                  : "ليس لديك حساب؟"}{" "}
                <span
                  onClick={() => navigate("/register")}
                  className="cursor-pointer font-semibold text-pink-600 underline-offset-4 hover:underline"
                >
                  {lang === "en" ? "Register" : "إنشاء حساب"}
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
