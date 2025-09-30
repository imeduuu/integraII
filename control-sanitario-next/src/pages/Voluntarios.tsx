import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VolunteerForm from "../components/VolunteerForm";

const VoluntariosPage = () => {
  return (
    <>
      <Navbar />
      <main>
        <VolunteerForm />
      </main>
      <Footer />
    </>
  );
};

export default VoluntariosPage;
