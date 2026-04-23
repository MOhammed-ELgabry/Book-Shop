

import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "../component/ui/Skeleton";
import NavBar from "../component/NavBar";
import Footer from "../component/Footer";
import AboutContactSkeleton from "../component/skeletons/about/AboutContactSkeleton";
import AboutGridSkeleton from "../component/skeletons/about/AboutGridSkeleton";
import AboutMissionSkeleton from "../component/skeletons/about/AboutMissionSkeleton";
import AboutHeroSkeleton from "../component/skeletons/about/AboutHeroSkeleton";
import AboutHero from "../component/about/AboutHero";
import AboutMission from "../component/about/AboutMission";
import AboutContact from "../component/about/AboutContact";
import AboutGrid from "../component/about/AboutGrid";

export default function AboutUs() {
  const [aboutPhoto, setaboutPhoto] = useState([]);
  const [aboutCard, setaboutCard] = useState([]);
  const [aboutGrid, setAboutGrid] = useState([]);
const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   axios.get("http://localhost:1337/api/about-grids")
  //     .then(res => setAboutGrid(res.data.data));

  //   axios.get("http://localhost:1337/api/about-photos")
  //     .then(res => setaboutPhoto(res.data.data));

  //   axios.get("http://localhost:1337/api/about-cards")
  //     .then(res => setaboutCard(res.data.data));
  // }, []);
useEffect(() => {
  const fetchData = async () => {
    try {
      const [grid, photos, cards] = await Promise.all([
        axios.get("http://localhost:1337/api/about-grids"),
        axios.get("http://localhost:1337/api/about-photos"),
        axios.get("http://localhost:1337/api/about-cards"),
      ]);

      setAboutGrid(grid.data.data);
      setaboutPhoto(photos.data.data);
      setaboutCard(cards.data.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // 👈 أهم سطر
    }
  };

  fetchData();
}, []);
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

      {/* <AboutHero aboutPhoto={aboutPhoto} /> */}
{loading ? (
  <AboutHeroSkeleton />
) : (
  <AboutHero aboutPhoto={aboutPhoto} />
)}
      
{loading ? (
  <AboutMissionSkeleton />
) : (
  <AboutMission aboutCard={aboutCard} />
)}
    

{loading ? (
  <AboutContactSkeleton />
) : (
  <AboutContact
    initialValues={initialValues}
    handleSubmit={handleSubmit}
  />
)}

   
{loading ? (
  <AboutGridSkeleton />
) : (
  <AboutGrid aboutGrid={aboutGrid} />
)}
      <Footer />

    </div>
  );
}