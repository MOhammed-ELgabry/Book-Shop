

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

const BASE_URL = "http://localhost:1337";

export default function RegisterPage() {

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const setUser = useAuthStore(
    (state) => state.setUser
  );

  // ======================
  // GOOGLE LOGIN
  // ======================
  const handleGoogleLogin = async () => {

    try {

      // 🔥 Login
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

      const profile =
        profileRes.data?.data?.[0];

      // 🔥 Normalize
      const normalizedUser =
        normalizeUser(user, profile);

      // 🔥 Save
      setUser(normalizedUser, jwt);

      Swal.fire(
        "Success",
        "Logged in with Google",
        "success"
      );

      navigate("/");

    } catch (err) {

      console.log(err);

      Swal.fire(
        "Error",
        "Google login failed",
        "error"
      );
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
      .oneOf(
        [Yup.ref("password")],
        "Passwords do not match"
      )
      .required("Required"),

    agree: Yup.bool().oneOf(
      [true],
      "Required"
    ),
  });

  // ======================
  // REGISTER
  // ======================
  const registerSubmit = async (
    values,
    { resetForm }
  ) => {

    try {

      // 🔥 Register User
      const registerRes = await axios.post(
        `${BASE_URL}/api/auth/local/register`,
        {
          username: `${values.firstName}_${values.lastName}_${Date.now()}`,
          email: values.email,
          password: values.password,
        }
      );

      const { user, jwt } =
        registerRes.data;

      console.log(
        "REGISTER SUCCESS:",
        registerRes.data
      );

      // 🔥 Create Profile
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
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // 🔥 Fetch Profile
      const profileRes = await axios.get(
        `${BASE_URL}/api/profiles?filters[users_permissions_user][id][$eq]=${user.id}&populate=*`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      const profile =
        profileRes.data?.data?.[0];

      // 🔥 Normalize User
      const normalizedUser =
        normalizeUser(user, profile);

      // 🔥 Save User
      setUser(normalizedUser, jwt);

      Swal.fire(
        "Success",
        "Account created successfully",
        "success"
      );

      resetForm();

      navigate("/");

    } catch (err) {

      console.log(
        "REGISTER ERROR:",
        err
      );

      Swal.fire(
        "Error",
        err.response?.data?.error
          ?.message || "Register failed",
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

                  <label>
                    First Name
                  </label>

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

                  <label>
                    Last Name
                  </label>

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
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  className="input input-bordered w-full p-2 pr-10"
                />

                <span
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
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

                <label>
                  Confirm Password
                </label>

                <Field
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
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

                <Field
                  type="checkbox"
                  name="agree"
                />

                <label>
                  Agree with Terms
                </label>
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
                  onClick={() =>
                    navigate("/login")
                  }
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