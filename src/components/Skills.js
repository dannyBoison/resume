import React, { useState, useEffect, useRef } from "react";
import "./Skills.css";

const skillCategories = [
  {
    title: "Frontend Development",
    description:
      "Building responsive and modern web interfaces using clean code and creative layouts.",
    skills: [
      { name: "HTML5", img: "https://cdn-icons-png.flaticon.com/512/174/174854.png", level: 95, link: "#" },
      { name: "CSS3", img: "https://cdn-icons-png.flaticon.com/512/732/732190.png", level: 90, link: "#" },
      { name: "JavaScript", img: "https://cdn-icons-png.flaticon.com/512/5968/5968292.png", level: 88, link: "#" },
      { name: "React.js", img: "https://cdn-icons-png.flaticon.com/512/1126/1126012.png", level: 85, link: "#" },
    ],
  },
  {
    title: "Creative Design",
    description:
      "Crafting stunning visuals, motion, and digital art that bring ideas to life.",
    skills: [
      { name: "Graphic Design", img: "https://static.thenounproject.com/png/graphic-design-icon-562015-512.png", level: 95, link: "#" },
      { name: "Adobe Photoshop", img: "https://cdn-icons-png.flaticon.com/512/5968/5968520.png", level: 92, link: "#" },
      { name: "CorelDRAW", img: "https://cdn-icons-png.flaticon.com/512/5968/5968846.png", level: 88, link: "#" },
      { name: "Video Editing", img: "https://cdn-icons-png.flaticon.com/512/873/873107.png", level: 90, link: "#" },
      { name: "3D Animation", img: require("../assets/whiteboard.jpeg"), level: 82, link: "#" },
      { name: "2D Animation", img: "https://static.thenounproject.com/png/2d-animation-icon-1640042-512.png", level: 85, link: "#" },
      { name: "Whiteboard Animation", img: "https://img.icons8.com/ios-filled/100/000000/whiteboard.png", level: 88, link: "#" },
    ],
  },
];

function Skills() {
  const [openCategory, setOpenCategory] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const skillsRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  // Animate skill bars when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const bars = entry.target.querySelectorAll(".skill-progress");
          if (entry.isIntersecting) {
            bars.forEach((bar) => bar.classList.add("animate-bar"));
          } else {
            bars.forEach((bar) => bar.classList.remove("animate-bar"));
          }
        });
      },
      { threshold: 0.4 }
    );

    const categories = document.querySelectorAll(".skills-grid");
    categories.forEach((el) => observer.observe(el));
  }, []);

  // Parallax scroll
  useEffect(() => {
    const handleScroll = () => {
      if (skillsRef.current) {
        const offset = window.scrollY * 0.1;
        skillsRef.current.style.transform = `translateY(${offset * -1}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle category
  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  return (
    <section className={`skills ${fadeIn ? "fade-in" : ""}`} id="skills" ref={skillsRef}>
      <div className="floating-bg"></div>
      <canvas id="particles"></canvas>

      <h2 className="skills-title">My Skills</h2>

      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <button
              className={`category-header ${openCategory === index ? "active" : ""}`}
              onClick={() => toggleCategory(index)}
            >
              {category.title}
              <span className={`arrow ${openCategory === index ? "open" : ""}`}>▼</span>
            </button>

            <div className={`category-desc ${openCategory === index ? "show" : ""}`}>
              {category.description}
            </div>

            <div className={`skills-grid-wrapper ${openCategory === index ? "expanded" : ""}`}>
              <div className="skills-grid">
                {category.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="skill-card"
                    title={skill.name}
                    onMouseMove={(e) => {
                      const card = e.currentTarget;
                      const rect = card.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      card.style.setProperty("--x", `${x}px`);
                      card.style.setProperty("--y", `${y}px`);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.setProperty("--x", `50%`);
                      e.currentTarget.style.setProperty("--y", `50%`);
                    }}
                  >
                    <div className="skill-glow"></div>
                    <div className="skill-image-container">
                      <img src={skill.img} alt={skill.name} className="skill-image" />
                    </div>
                    <p className="skill-name">{skill.name}</p>

                    <div className="skill-bar">
                      <div
                        className="skill-progress"
                        style={{ "--level": `${skill.level}%` }}
                      ></div>
                    </div>

                    <a
                      href={skill.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-work"
                    >
                      View Works →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
