import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate(); // ✅ React Router navigation

  const services = [
    {
      id: 1,
      url: "/Sankranthi.jpg",
      title: "Sankranthi Event",
      path: "/book-ticket/sankranthi", // ✅ Booking Page Route
    },
    {
      id: 2,
      url: "/Ugadhi.jpg",
      title: "Ugadhi Event",
      path: "/book-ticket/ugadhi",
    },
    {
      id: 3,
      url: "/Holi.jpg",
      title: "Holi Event",
      path: "/book-ticket/holi",
    },
    {
      id: 4,
      url: "/Ganesh Chathurthi.jpg",
      title: "Ganesh Chathurthi Event",
      path: "/book-ticket/ganesh-chaturthi",
    },
    {
      id: 5,
      url: "/Dhussera.jpg",
      title: "Dhussera Event",
      path: "/book-ticket/dussehra",
    },
    {
      id: 6,
      url: "/Diwali.jpg",
      title: "Diwali Event",
      path: "/book-ticket/diwali",
    },
  ];

  return (
    <>
      <div className="services container">
        <h2>INDIAN FESTIVALS</h2>
        <div className="banner">
          {services.map((element) => {
            return (
              <div 
                className="item" 
                key={element.id}
                onClick={() => navigate(element.path)} // ✅ Navigate to Booking Page
                style={{ cursor: "pointer" }}
              >
                <h3>{element.title}</h3>
                <img src={element.url} alt={element.title} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Services;
