import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/yash.sahni54321";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dlm8wyhvi/image/upload/v1689755999/IMG_20190815_215958_784_ufdngo.jpg"
              alt="Developer"
            />
            <Typography>Yash Sahni</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              Welcome to my MERN stack ecommerce project! I'm Yash Sahni, a MERN
              stack developer.
              <br />
              This project was developed as a guided initiative from the YouTube
              channel "6 Pack Programmer" by Abhishek Singh. I extend my
              heartfelt gratitude to him for providing the guidance and
              inspiration throughout this journey.
              <br />
              As a full-stack developer, I embraced the challenge of integrating
              MongoDB, Express.js, React, and Node.js to build a seamless
              shopping experience for our users. From designing the user
              interface to crafting intuitive interactions and implementing
              robust back-end functionalities, it has been a rewarding
              experience to see this project come to life.
              <br />
              I'm dedicated to continuously improving this ecommerce platform
              and expanding its features to meet our users' needs effectively.
              Thank you for being a part of this exciting venture, and I hope
              you enjoy exploring our ecommerce platform.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
