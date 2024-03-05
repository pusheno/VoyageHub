import React, { useEffect } from 'react';
import "../layout/main.scss";
import "../layout/footer.scss";
import { Button } from 'primereact/button';
import InstagramIcon from '../images/instagram.svg';
import TwitterIcon from '../images/twitter.svg';
import FacebookIcon from '../images/facebook.svg';

const Footer = () => {

  return (
    <section className="footer w-100 d-flex justify-content-between align-items-center">
      <h6 className="m-0" >
        <span>Patryk Kuźlik</span>
        <span> - </span>
        <span>Praca Inżynierska</span>
      </h6>
      <div className="footer-socials d-flex align-items-center">
        <Button className="footer-social-icons d-flex justify-content-center align-items-center">
          <img src={InstagramIcon} />
        </Button>
        <Button className="footer-social-icons d-flex justify-content-center align-items-center">
          <img src={FacebookIcon} />
        </Button>
        <Button className="footer-social-icons d-flex justify-content-center align-items-center">
          <img src={TwitterIcon} />
          </Button>
      </div>
    </section>
  );
};

export default Footer;
