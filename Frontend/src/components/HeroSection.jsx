import { Link } from "react-scroll";

const HeroSection = () => {
  return (
    <section className="hero">
      <img src="/1.jpg" alt="OKCU" />
      <div className="item">
        <h3>Indian Community</h3>
        <div>
          <h1>Indian Festival Event Organisation</h1>
          <p>
            We believe that it is about all the Students globally know and Celebrate
            Indian Festivals together!
          </p>
          <Link to="contact" spy={true} smooth={true} duration={500}>
            BOOK NOW
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;