
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Confirm Password is required"),
    agree: Yup.bool().oneOf([true], "You must accept the terms"),
  });

 
 
  const registerSubmit = async (values, { resetForm }) => {
  try {
    const username = `${values.firstName} ${values.lastName}`;

    const res = await axios.post(
      "http://localhost:1337/api/auth/local/register",
      {
        username,
        email: values.email,
        password: values.password,
      }
    );

    Swal.fire({ title: "Register success", icon: "success" });
    resetForm();
  } catch (err) {
    consol.log(err)
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: err.response?.data?.error?.message || "Error occurred",
    });
  }
};

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md flex flex-col gap-6">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={registerSubmit}>
          {({ errors, touched }) => (
            <Form className="flex flex-col gap-6">
              {/* Name fields */}
              <div className="flex flex-col sm:flex-row sm:gap-4 gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <label>First Name</label>
                  <Field name="firstName" className="input input-bordered w-full p-2" placeholder="John" />
                  <ErrorMessage name="firstName" component={'p'} className="text-red-600" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label>Last Name</label>
                  <Field name="lastName" className="input input-bordered w-full p-2" placeholder="Doe" />
                  <ErrorMessage name="lastName" component={'p'} className="text-red-600" />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <Field name="email" className="input input-bordered w-full p-2" placeholder="Enter Your Email" />
                <ErrorMessage name="email" component={'p'} className="text-red-600" />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2 relative">
                <label>Password</label>
                <Field type={showPassword ? "text" : "password"} name="password" className="input input-bordered w-full pr-10 p-2" placeholder="Enter password" />
                <ErrorMessage name="password" component={'p'} className="text-red-600" />
                <span onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer">
                  {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </span>
              </div>

           
              <div className="flex flex-col gap-2 relative">
                <label>Confirm Password</label>
                <Field type={showPassword ? "text" : "password"} name="confirmPassword" className="input input-bordered w-full pr-10 p-2" placeholder="Confirm password" />
                <ErrorMessage name="confirmPassword" component={'p'} className="text-red-600" />
              </div>

            
              <div className="flex gap-2 text-sm items-center">
                <Field type="checkbox" name="agree" />
                <label>Agree with Terms & Conditions</label>
              </div>
              <ErrorMessage name="agree" component={'p'} className="text-red-600" />

              {/* Submit */}
              <button type="submit" className="text-white btn rounded-2xl bg-[rgba(217,23,108,1)] w-full py-2">Sign Up</button>

              <p className="text-center text-sm mt-2">
                Already have an account?{" "}
                <span onClick={() => navigate("/login")} className="text-blue-500 underline cursor-pointer">Login</span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
