import { Link } from "react-scroll";
import { useState } from "react";
import Reservation from "./Reservation";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="hero">
      <img src="/1.jpg" alt="OKCU" />
      <div className="item">
        <h3>Indian Community</h3>
        <div>
          <h1>Indian Festival Event Organisation</h1>
          <p>
            We believe that it is about all the Students globally knowing and celebrating
            Indian Festivals together!
          </p>
          <Link to="#" onClick={() => setIsModalOpen(true)}>
            Make A Reservation
          </Link>
        </div>
      </div>
      {/* Reservation Popup */}
      <Reservation isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default HeroSection;
