

import React, { useState } from "react";
// import bgImage from "../images/533643aa8db82414f48d43a992d009dda3961386.png";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

 const navigate=useNavigate()
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  };

  // validation schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    agree: Yup.bool().oneOf([true], "You must accept the terms"),
  });

  // submit function
  const registerSubmit = async (values, { resetForm }) => {
    try {
      
      const res = await axios.post("https://bookstore.eraasoft.pro/api/register", {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
      console.log(res.data);
      resetForm();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={registerSubmit}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-6">
              {/* Name fields */}
              <div className="flex flex-col sm:flex-row sm:gap-4 gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <label>First name </label>
                  <Field
                    name="firstName"
                    className="input input-bordered w-full border-green-500"
                    placeholder="John"
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label>Last Name </label>
                  <Field
                    name="lastName"
                    className="input input-bordered w-full"
                    placeholder="Doe"
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>

             
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <Field
                  name="email"
                  className="input input-bordered w-full"
                  placeholder="Enter Your Email"
                />
                {errors.email && touched.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

             
              <div className="flex flex-col gap-2 relative">
                <label>Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full pr-10"
                  placeholder="Enter password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </span>
                {errors.password && touched.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-2 relative">
                <label>Confirm Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="input input-bordered w-full pr-10"
                  placeholder="Confirm password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </span>
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms */}
              <div className="flex gap-2 text-sm items-center">
                <Field type="checkbox" name="agree" />
                <label>Agree with Terms & Conditions</label>
              </div>
              {errors.agree && touched.agree && (
                <p className="text-red-500 text-sm">{errors.agree}</p>
              )}

           
              <button className="text-white btn rounded-2xl bg-[rgba(217,23,108,1)] w-full py-2">
                Sign Up
              </button>

             
             <p className="text-center text-sm mt-2">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-blue-500 underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
