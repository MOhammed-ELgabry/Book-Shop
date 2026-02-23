
import { useEffect, useState } from "react";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import NavBar from "../component/NavBar";
import axios from "axios";
import { FaTruck } from "react-icons/fa";
import { Formik, Form, Field } from "formik";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../component/Footer";
export default function AboutUs() {
const [aboutPhoto,setaboutPhoto]=useState([])
const [aboutCard,setaboutCard]=useState([])
const [aboutGrid,setAboutGrid]=useState([])
useEffect(()=>{
const fetchData = async()=>{
    try {
       const res = await axios.get("http://localhost:1337/api/about-grids")
       setAboutGrid(res.data.data)
    }catch(err){
        console.log(err)
    }
}
fetchData()
}
,[])
useEffect(()=>{
const fetchData= async ()=>{
        try{
            const res = await axios.get("http://localhost:1337/api/about-photos")
            setaboutPhoto(res.data.data)
        }catch(err){
console.log(err)
        }
    }
fetchData()
}
,[])
useEffect(()=>{
    const fetchData=async ()=>{
        try{
            const res= await axios.get("http://localhost:1337/api/about-cards")
            setaboutCard(res.data.data)
        }catch(err){
            console.log(err)
        }
    }
    fetchData()
},[])

  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
 
    <div>
  <NavBar />

  <div
    className="w-full min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    {aboutPhoto.map((el, index) => (
      <div
        key={index}
        className="w-full min-h-screen flex items-center justify-center bg-black/40 px-4"
      >
        <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[50%] flex flex-col gap-5">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl text-white font-bold">
            {el.header}
          </h2>

          <p className="text-justify text-white leading-relaxed text-sm sm:text-base md:text-lg"
          
          style={{ textAlignLast: "center" }}>
            {el.details}
          </p>
        </div>
      </div>
    ))}
  </div>

 
  <div className="container w-full h-dvh  flex flex-col p-3 gap-5 mt-8">
      <div><h2 className="text-2xl font-extrabold text-center">Our Mission </h2></div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 gap-3">
    {
        aboutCard.map((el,index)=>{
            return(
              <div key={index}>
                
                
   
       <div className="p-2  flex flex-col gap-8 justify-center items-start shadow rounded">
         <h2 className="text-lg font-bold">{el.h2}</h2>
        <p  className="text-gray-600">{el.p}</p>
        <button  className="mt-2 px-4 py-2 text-pink-600  rounded cursor-pointer">{el.button}</button>
       </div>
   
              </div>
            )
        })
    }
    </div>
  </div>

  <div className="w-full min-h-screen bg-[#3f364c] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        
     
        <div className="flex flex-col gap-6">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Have a Questions?
            <br />
            Get in Touch
          </h2>

          <p className="text-gray-300 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            ultrices est. Aliquam in justo varius, sagittis neque ut, malesuada
            leo.
          </p>

         
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="flex flex-col gap-4 mt-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  name="name"
                  placeholder="Name"
                  className="bg-transparent border border-gray-400 rounded-lg p-3 text-white outline-none"
                />
                <Field
                  name="email"
                  placeholder="Email Address"
                  className="bg-transparent border border-gray-400 rounded-lg p-3 text-white outline-none"
                />
              </div>

              <Field
                as="textarea"
                name="message"
                placeholder="Your Message"
                className="bg-transparent border border-gray-400 rounded-lg p-3 text-white h-32 outline-none"
              />

              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 transition px-6 py-3 rounded-lg text-white w-fit"
              >
                Send Message
              </button>
            </Form>
          </Formik>
        </div>

      
        <div className="flex flex-col gap-6 justify-center">
          
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-lg text-pink-600">
              <FaPhoneAlt />
            </div>
            <span className="text-gray-200">01006164484</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-lg text-pink-600">
              <FaEnvelope />
            </div>
            <span className="text-gray-200">mohammedelgabry187@gmail.com</span>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-lg text-pink-600">
              <FaMapMarkerAlt />
            </div>
            <span className="text-gray-200 max-w-sm">
              adipiscing elit. Mauris et ultricies est. Aliquam in justo varius
            </span>
          </div>
        </div>
       

      </div>
    </div>
     <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {
                aboutGrid.map((el)=>{
                    return(
                         <div className="flex flex-col items-start gap-3 p-4 shadow-2xl">
     
      <div className="text-gray-500 text-2xl">
        <FaTruck />
      </div>

   
      <h3 className="text-lg font-semibold text-gray-800">
        {el?.title}
      </h3>

     
      <p className="text-gray-500 text-sm leading-relaxed">
        {el?.description}
      </p>
    </div>
                    )
                })
            }
        </div>
        <Footer/>
</div>

  )
}
