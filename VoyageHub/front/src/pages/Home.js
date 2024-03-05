import "../layout/style.scss";
import React, { useEffect } from 'react';
import Browser from "../components/Browser";
import Recommended from "../components/Recommended";
import AboutUs from "../components/AboutUs";
import Instruction from "../components/Instruction";
import Attractions from "../components/Attractions";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import connection from '../services/connection';


const Home = () => {

  useEffect(() => {
    const user = async () => {
        const user = await connection.getCurrentUser();
        console.log("UŻYTKOWNIK: ", user)
    };

    user();
  }, []);

  return (
    <>
      <section id="main" className="pad-page">
        <div className="home">
          <div  className="main-container">
            <div className="main d-flex justify-content-center w-100 position-absolute"></div>
          </div>
          <Browser/>
        </div>
      </section>
      <Recommended/>
      <AboutUs/>
      <Attractions/>
      <Instruction/>
      <Contact/>
      <Footer/>
    </>
  );
  
};

export default Home;