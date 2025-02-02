import React from "react";
//import './About.css'; // Import the external CSS file
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>
          Discover the story behind <strong>Exploring the Mountains</strong>.
        </p>
      </div>
      <div className="about-content">
        <p>
          <strong>Exploring the Mountains</strong> was founded with a passion
          for bringing people closer to the breathtaking beauty of nature. Our
          mission is to create unforgettable travel experiences by offering
          well-organized and exciting mountain tours that cater to adventure
          seekers, nature lovers, and explorers alike.
        </p>
        <p>
          We believe that every journey tells a story, and our role is to make
          yours extraordinary. From serene landscapes to thrilling hikes, our
          team of experienced guides ensures that your adventure is safe,
          enjoyable, and filled with cherished memories.
        </p>
        <p>
          At <strong>Exploring the Mountains</strong>, we take pride in curating
          tours that not only highlight the beauty of the mountains but also
          promote sustainable tourism, preserving the natural wonders for
          generations to come. Whether you’re traveling solo, with friends, or
          as a family, we’re here to make your dream mountain escape a reality.
        </p>
        <p className="about-tagline">
          Let’s embark on this journey together and discover the magic of the
          mountains!
        </p>
      </div>
    </div>
  );
};

export default About;
