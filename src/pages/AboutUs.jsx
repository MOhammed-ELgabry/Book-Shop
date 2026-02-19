
import { useEffect, useState } from "react";
import bgImage from "../assets/images/533643aa8db82414f48d43a992d009dda3961386.png";
import NavBar from "../component/NavBar";
import axios from "axios";
export default function AboutUs() {
const [aboutPhoto,setaboutPhoto]=useState([])
const [aboutCard,setaboutCard]=useState([])
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
</div>

  )
}
