
import { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "../component/NavBar";
import Footer from "../component/Footer";

import AboutHero from "../component/about/AboutHero";
import AboutMission from "../component/about/AboutMission";
import AboutContact from "../component/about/AboutContact";
import AboutGrid from "../component/about/AboutGrid";

import AboutContactSkeleton from "../component/skeletons/about/AboutContactSkeleton";
import AboutGridSkeleton from "../component/skeletons/about/AboutGridSkeleton";
import AboutMissionSkeleton from "../component/skeletons/about/AboutMissionSkeleton";
import AboutHeroSkeleton from "../component/skeletons/about/AboutHeroSkeleton";

export default function AboutUs() {
  const [aboutPhoto, setAboutPhoto] = useState([]);
  const [aboutCard, setAboutCard] = useState([]);
  const [aboutGrid, setAboutGrid] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
     try {
  const [grid, photos, cards] = await Promise.all([
    axios.get(`${import.meta.env.VITE_API_URL}/api/about-grids`),
    axios.get(`${import.meta.env.VITE_API_URL}/api/about-photos`),
    axios.get(`${import.meta.env.VITE_API_URL}/api/about-cards`),
  ]);

        setAboutGrid(grid.data.data);
        setAboutPhoto(photos.data.data);
        setAboutCard(cards.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
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