import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoginSignup from "./components/LoginSignup";

const App = () => {
  return (
  <Router>
    <Navbar />
    <HeroSection />
    <Services />
    <About />
    <Contact />
    <Footer />
    <Toaster/>
    <LoginSignup/>
  </Router>
  );
};

export default App;