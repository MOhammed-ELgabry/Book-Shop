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

    navigate("/");
  } catch (err) {
    console.log(err);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-slate-100 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-white/70 bg-white/95 p-6 shadow-xl shadow-slate-200/70 sm:p-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium text-pink-600">
            {lang === "en" ? "Join Book Shop" : "انضم إلى متجر الكتب"}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {lang === "en" ? "Create Account" : "إنشاء حساب"}
          </h2>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={registerSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    {lang === "en" ? "First Name" : "الاسم الأول"}
                  </label>
                  <Field
                    name="firstName"
                    placeholder={lang === "en" ? "First Name" : "الاسم الأول"}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
                  />
                  <ErrorMessage name="firstName" component="p" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700">
                    {lang === "en" ? "Last Name" : "الاسم الأخير"}
                  </label>
                  <Field
                    name="lastName"
                    placeholder={lang === "en" ? "Last Name" : "الاسم الأخير"}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
                  />
                  <ErrorMessage name="lastName" component="p" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  {lang === "en" ? "Email" : "البريد الإلكتروني"}
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder={lang === "en" ? "Email" : "البريد الإلكتروني"}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
                />
                <ErrorMessage name="email" component="p" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  {lang === "en" ? "Password" : "كلمة المرور"}
                </label>
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={lang === "en" ? "Password" : "كلمة المرور"}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </button>
                </div>

                <ErrorMessage name="password" component="p" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700">
                  {lang === "en" ? "Confirm Password" : "تأكيد كلمة المرور"}
                </label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder={lang === "en" ? "Confirm Password" : "تأكيد كلمة المرور"}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
                />
                <ErrorMessage name="confirmPassword" component="p" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600" />
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <label className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <Field
                    type="checkbox"
                    name="agree"
                    className="h-4 w-4 rounded border-slate-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span>
                    {lang === "en" ? "Agree with Terms" : "الموافقة على الشروط"}
                  </span>
                </label>
                <ErrorMessage name="agree" component="p" className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-1 rounded-xl bg-pink-600 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting
                  ? lang === "en"
                    ? "Creating account..."
                    : "جاري إنشاء الحساب..."
                  : lang === "en" ? "Sign Up" : "إنشاء حساب"}
              </button>

              <p className="text-center text-sm text-slate-600">
                {lang === "en" ? "Already have an account?" : "عندك حساب؟"}{" "}
                <span onClick={() => navigate("/login")} className="cursor-pointer font-semibold text-pink-600 underline-offset-4 hover:underline">
                  {lang === "en" ? "Login" : "تسجيل دخول"}
                </span>
              </p>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
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
