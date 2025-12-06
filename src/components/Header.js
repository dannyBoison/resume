import React, { useEffect, useRef, useState } from "react";
import "./Header.css";

function Header() {
  const layer1Ref = useRef(null); // background space
  const layer2Ref = useRef(null); // planets
  const layer3Ref = useRef(null); // icons

  const [loading, setLoading] = useState(false);
  const [warp, setWarp] = useState(false);
  const [dropdown, setDropdown] = useState(false); // <-- new state

  useEffect(() => {
    const layer1 = layer1Ref.current;
    const layer2 = layer2Ref.current;
    const layer3 = layer3Ref.current;

    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;

      if (!loading) {
        layer1.style.transform = `translate(${x * 20}px, ${y * 20}px) scale(1.05)`;
        layer2.style.transform = `translate(${x * 40}px, ${y * 40}px) scale(1.1)`;
        layer3.style.transform = `translate(${x * 60}px, ${y * 60}px) scale(1.15)`;
      }
    };

    const handleScroll = () => {
      const scroll = window.scrollY;

      if (!loading) {
        layer1.style.transform = `translateY(${scroll * 0.1}px) scale(1.05)`;
        layer2.style.transform = `translateY(${scroll * 0.2}px) scale(1.1)`;
        layer3.style.transform = `translateY(${scroll * 0.3}px) scale(1.15)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const handleClick = () => {
    setLoading(true);

    const btn = document.querySelector(".cta-btn");
    btn.classList.add("vibrate", "glow");

    layer3Ref.current.classList.add("loading-float");

    setTimeout(() => setWarp(true), 300);

    setTimeout(() => {
      btn.classList.remove("vibrate", "glow");
      layer3Ref.current.classList.remove("loading-float");
      setWarp(false);

      // Toggle dropdown instead of scrolling
      setDropdown(!dropdown);

      setLoading(false);
    }, 800); // shorten slightly for faster dropdown
  };

  return (
    <header className={`header ${warp ? "warp-flash" : ""}`}>
      <div className="parallax-layer layer1" ref={layer1Ref}></div>
      <div className="parallax-layer layer2" ref={layer2Ref}></div>
      <div className={`parallax-layer layer3`} ref={layer3Ref}></div>

      <div className="overlay"></div>
      <div className="header-content">
        <h1>Daniel Boison</h1>
        <p>Creative Designer • Developer • Innovator</p>
        <div className="cta-container">
          <button className="cta-btn" onClick={handleClick}>
            View My Work
          </button>

          {dropdown && (
            <div className="dropdown">
              <p>
                <a href="https://www.instagram.com/dan_boison/" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </p>
             
              <p>Go to Skills to see more →</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
