import React, { useState, useEffect } from "react";
import "./Contact.css";
import contact1 from "../assets/contact1.jpg";
import contact2 from "../assets/contact2.jpg";

const contactImages = [contact1, contact2];

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
