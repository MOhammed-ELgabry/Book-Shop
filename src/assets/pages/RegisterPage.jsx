

import React, { useState } from "react";
import bgImage from "../images/533643aa8db82414f48d43a992d009dda3961386.png";
import logo from "../images/book-bookmark 1.png"
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { AiOutlineClose, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

import { FcGoogle } from "react-icons/fc";   
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
const [menuOpen, setMenuOpen] = useState(false);
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

 

const registerSubmit = async (values, { resetForm }) => {
  try {
    const res = await axios.post(
      "https://bookstore.eraasoft.pro/api/register",
      {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmPassword,
      }
    );

    console.log(res.data);
    resetForm();
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};


  return (
    <div className=" flex justify-center flex-col gap-4 relative">

 <div className="fixed h-[92px] w-full bg-[rgba(255,255,255,0.5)] top-0 right-0 z-50 flex justify-between items-center px-10">
      {/* Logo & Links */}
      <div className="flex gap-2 items-center">
        <img src={logo} alt="logo" />
        <a href="#" className="text-2xl text-white font-semibold border-r-2 px-2 hidden md:inline-block">
          Book Shop
        </a>
        <a href="#" className="text-2xl text-white px-2 hidden md:inline-block">Home</a>
        <a href="#" className="text-2xl text-white px-2 hidden md:inline-block">Books</a>
        <a href="#" className="text-2xl text-white px-2 hidden md:inline-block">About Us</a>
      </div>

      {/* Desktop Buttons */}
      <div className="flex gap-3 p-3 hidden md:flex">
        <button onClick={() => navigate("/login")} className="btn bg-[rgba(217,23,108,1)] p-3 rounded font-semibold text-white">Log in</button>
        <button onClick={() => navigate("/register")} className="btn bg-white p-3 font-semibold rounded text-[rgba(217,23,108,1)]">Sign Up</button>
      </div>

      {/* Hamburger for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <AiOutlineClose size={25} className="text-white" /> : <AiOutlineMenu size={25} className="text-white" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-[92px] left-0 w-full bg-[rgba(255,255,255,0.95)] flex flex-col items-center py-4 space-y-3 md:hidden shadow-md">
          <a href="#" className="text-2xl text-[rgba(217,23,108,1)]">Book Shop</a>
          <a href="#" className="text-xl text-gray-800">Home</a>
          <a href="#" className="text-xl text-gray-800">Books</a>
          <a href="#" className="text-xl text-gray-800">About Us</a>
          <button onClick={() => navigate("/login")} className="w-3/4 py-2 bg-[rgba(217,23,108,1)] text-white rounded font-semibold">Log in</button>
          <button onClick={() => navigate("/register")} className="w-3/4 py-2 border border-[rgba(217,23,108,1)] text-[rgba(217,23,108,1)] rounded font-semibold">Sign Up</button>
        </div>
      )}
    </div>

       <div
  className="w-full h-[338px] bg-cover bg-center bg-fixed "
  style={{ backgroundImage: `url(${bgImage})` }}
></div>
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
                    className="input input-bordered w-full  p-2"
                    placeholder="John"
                  />
                  <ErrorMessage name="firstName" component={'p'} className="text-red-600"/>
                 
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label>Last Name </label>
                  <Field
                    name="lastName"
                    className="input input-bordered w-full p-2"
                    placeholder="Doe"
                  />
                  <ErrorMessage name="lastName" component={'p'} className="text-red-600"/>
                  
                </div>
              </div>

             
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <Field
                  name="email"
                  className="input input-bordered w-full p-2"
                  placeholder="Enter Your Email"
                />
                   <ErrorMessage name="email" component={'p'} className="text-red-600"/>
               
              </div>

             
              <div className="flex flex-col gap-2 relative">
                <label>Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full pr-10 p-2"
                  placeholder="Enter password"
                />
                  <ErrorMessage name="password" component={'p'} className="text-red-600"/>
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </span>
                
              </div>

              
              <div className="flex flex-col gap-2 relative">
                <label>Confirm Password</label>
                <Field
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="input input-bordered w-full pr-10 p-2"
                  placeholder="Confirm password"
                />
  <ErrorMessage name="confirmPassword" component={'p'} className="text-red-600"/>
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </span>
              
              </div>

         
              <div className="flex gap-2 text-sm items-center">
                <Field type="checkbox" name="agree"  />
                <label>Agree with Terms & Conditions</label>
              </div>
              <ErrorMessage name="agree" component={'p'} className="text-red-600"/>

           
              <button className="text-white btn rounded-2xl bg-[rgba(217,23,108,1)] w-full py-2"
              type="submit"
              >
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

              <div className="flex flex-col gap-4 mt-4">
  <button className="flex items-center justify-center gap-2 cursor-pointer shadow rounded-lg py-2">
    <FcGoogle size={20} />
    Sign up with Google
  </button>

  <button className="flex items-center justify-center gap-2 shadow cursor-pointer rounded-lg py-2 text-black">
    <FaFacebookF className="bg-blue-700 text-white rounded-full" size={20} />
    Sign up with Facebook
  </button>
</div>

            </Form>
          )}
        </Formik>
      </div>
    </div>



<footer className="bg-[#3b2f4a] text-gray-300 px-6 py-10">
  <div className="max-w-7xl mx-auto">

    {/* Top Section */}
    <div className="flex flex-col md:flex-row justify-between gap-8 border-b border-gray-500 pb-8">
      
      {/* LEFT */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img src={logo} alt="logo" className="h-10 w-auto" />

        <ul className="flex gap-6 text-sm">
          <li className="hover:text-white cursor-pointer">Home</li>
          <li className="hover:text-white cursor-pointer">Books</li>
          <li className="hover:text-white cursor-pointer">About Us</li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-center md:items-end gap-4">
        <div className="flex gap-4 text-lg">
          <FaFacebookF className="hover:text-white cursor-pointer" />
          <FaInstagram className="hover:text-white cursor-pointer" />
          <FaYoutube className="hover:text-white cursor-pointer" />
          <FaXTwitter className="hover:text-white cursor-pointer" />
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
      
      <p className="text-center md:text-left">
        Developed by EraaSoft © All Rights Reserved 2024
      </p>

      <div className="flex items-center gap-2 border border-gray-400 rounded px-3 py-1 cursor-pointer hover:border-white">
        <HiOutlineGlobeAlt />
        <span>English</span>
      </div>

    </div>

  </div>
</footer>



    </div>
  );
}
