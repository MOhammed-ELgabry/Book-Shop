


import Header from "../component/Header";
import Footer from "../component/Footer";
import { Outlet } from "react-router-dom";
import NavBar from "../component/NavBar";

export default function PublicLayout() {
  return (
    <>
      <NavBar />
      <Header />
      <main className="pt-[92px]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
