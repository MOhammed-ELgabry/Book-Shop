
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = { email: "", password: "", rememberMe: false };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const loginSubmit = async (values) => {
    try {
      const res = await axios.post("https://bookstore.eraasoft.pro/api/login", {
        email: values.email,
        password: values.password,
      });
      if (values.rememberMe) localStorage.setItem("token", res.data.token);
      else sessionStorage.setItem("token", res.data.token);

      Swal.fire({ title: "Login success", icon: "success" });
      navigate("/");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Oops...", text: err.response?.data?.error?.message || "Invalid email or password" });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
        <h2 className="text-center text-[rgba(217,23,108,1)] text-2xl font-semibold">Welcome Back</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={loginSubmit}>
          <Form className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <Field name="email" className="input input-bordered w-full p-2" placeholder="Enter your email" />
              <ErrorMessage name="email" component="p" className="text-red-600" />
            </div>

            <div className="flex flex-col gap-2 relative">
              <label>Password</label>
              <Field type={showPassword ? "text" : "password"} name="password" className="input input-bordered w-full pr-10 p-2" placeholder="Enter password" />
              <ErrorMessage name="password" component="p" className="text-red-600" />
              <span onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer">
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Field type="checkbox" name="rememberMe" />
                <label>Remember me</label>
              </div>
              <span onClick={() => navigate("/forgot-password")} className="text-[rgba(217,23,108,1)] cursor-pointer">Forgot password?</span>
            </div>

            <button type="submit" className="text-white rounded-2xl bg-[rgba(217,23,108,1)] w-full py-2">Login</button>

            <div className="flex flex-col gap-4 mt-4">
              <button className="flex items-center justify-center gap-2 shadow rounded-lg py-2">
                <FcGoogle size={20} /> Sign up with Google
              </button>
              <button className="flex items-center justify-center gap-2 shadow rounded-lg py-2">
                <FaFacebookF className="bg-blue-700 text-white rounded-full" size={20} /> Sign up with Facebook
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
