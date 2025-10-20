import React, { useState, useEffect } from "react";
import "./About.css";
import profile1 from "../assets/profile1.png";

const titles = [
  "Creative Designer",
  "Frontend Developer",
  "3D & 2D Animator",
  "Innovator",
  "UI/UX Designer",
];

const About = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  // Typing Effect
  useEffect(() => {
    if (charIndex < titles[index].length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + titles[index][charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCharIndex(0);
        setDisplayText("");
        setIndex((prev) => (prev + 1) % titles.length);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, index]);

  return (
    <section className="about" id="about">
      <div className="about-image">
        <div className="image-border">
          <img src={profile1} alt="Daniel Boison" />
        </div>
      </div>

      <div className="about-text">
        <h2>
          Hi, I’m <span className="highlight">Daniel Boison</span>
        </h2>
        <h3 className="typing">{displayText}</h3>

        <p>
          I’m a passionate designer and developer from Ghana who blends
          creativity and logic to build beautiful, purposeful digital
          experiences. I specialize in UI/UX design, animation, and web
          development.
        </p>

        <p>
          Currently, I work with <strong>mTicket</strong> as a Creative Designer
          and Programmer, helping to shape the future of smart transportation in
          Ghana. I also founded <strong>Loom Watches</strong> — a Ghana-inspired
          watch brand that fuses technology, culture, and design.
        </p>

        <p>
          My work spans across web design, video editing, animation, and
          software development. I’ve collaborated with brands like{" "}
          <strong>ICM</strong>, <strong>Fbills Micro Credit</strong>,{" "}
          <strong>Kuo Fire Safety</strong>, and <strong>Ghana Union Assurance</strong>.
        </p>

        <div className="stats">
          <div className="stat">
            <h3>5+</h3>
            <p>Years of Creativity</p>
          </div>
          <div className="stat">
            <h3>30+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat">
            <h3>10+</h3>
            <p>Brands Collaborated</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
