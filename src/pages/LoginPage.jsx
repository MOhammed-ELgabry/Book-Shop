
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import LoginSkeleton from "../component/skeletons/auth/LoginSkeleton";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  // 👇 Skeleton loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const initialValues = { identifier: "", password: "" };

  const validationSchema = Yup.object({
    identifier: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const loginSubmit = async (values) => {
    try {
      const res = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: values.identifier,
        password: values.password,
      });

      setUser(res.data.user, res.data.jwt);

      Swal.fire({ title: "Login success", icon: "success" });
      navigate("/");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.error?.message || "Invalid email or password",
      });
    }
  };

  // 👇 هنا الشرط
  if (loading) return <LoginSkeleton />;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
        
        <h2 className="text-center text-[rgba(217,23,108,1)] text-2xl font-semibold">
          Welcome Back
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={loginSubmit}
        >
          <Form className="flex flex-col gap-6">

            <div className="flex flex-col gap-2">
              <label>Email</label>
              <Field
                name="identifier"
                className="input input-bordered w-full p-2"
              />
              <ErrorMessage name="identifier" component="p" className="text-red-600" />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label>Password</label>
              <Field
                type={showPassword ? "text" : "password"}
                name="password"
                className="input input-bordered w-full pr-10 p-2"
              />
              <ErrorMessage name="password" component="p" className="text-red-600" />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <button className="bg-pink-600 text-white py-2 rounded-2xl">
              Login
            </button>

          </Form>
        </Formik>
      </div>
    </div>
  );
}