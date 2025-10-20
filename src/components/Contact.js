import React, { useState, useEffect } from "react";
import "./Contact.css";

const contactImages = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
];

function Contact() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % contactImages.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="contact" id="contact">
      <div className="contact-info">
        <h2>Contact Me</h2>
        <p>Email: <b>danielboison31@gmail.com</b></p>
        <p>Phone: <b>+233 55 909 3818</b></p>
        <p>Let’s connect for collaboration or creative projects!</p>
      </div>
      <div className="contact-image">
        <img src={contactImages[index]} alt="Daniel" />
      </div>
    </section>
  );
}

export default Contact;
