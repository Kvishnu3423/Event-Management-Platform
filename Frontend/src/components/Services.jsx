import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate(); // ✅ React Router navigation

  const services = [
    {
      id: 1,
      url: "/Sankranthi.jpg",
      title: "Book tickets for this Event on Jan/13/2025",
      path: "/book-ticket/sankranthi",
      link: "https://en.wikipedia.org/wiki/Makar_Sankranti",
    },
    {
      id: 2,
      url: "/Ugadhi.jpg",
      title: "Book tickets for this Event on Mar/30/2025",
      path: "/book-ticket/ugadhi",
      link: "https://en.wikipedia.org/wiki/Ugadi",
    },
    {
      id: 3,
      url: "/Holi.jpg",
      title: "Book tickets for this Event on Mar/13/2025",
      path: "/book-ticket/holi",
      link: "https://en.wikipedia.org/wiki/Holi",
    },
    {
      id: 4,
      url: "/Ganesh Chathurthi.jpg",
      title: "Book tickets for this Event on Aug/26/2025",
      path: "/book-ticket/ganesh-chaturthi",
      link: "https://en.wikipedia.org/wiki/Ganesh_Chaturthi",
    },
    {
      id: 5,
      url: "/Dhussera.jpg",
      title: "Book tickets for this Event on Oct/02/2025",
      path: "/book-ticket/dussehra",
      link: "https://en.wikipedia.org/wiki/Dussehra",
    },
    {
      id: 6,
      url: "/Diwali.jpg",
      title: "Book tickets for this Event on Oct/20/2025",
      path: "/book-ticket/diwali",
      link: "https://en.wikipedia.org/wiki/Diwali",
    },
    {
      id: 7,
      url: "/Bonalu.jpg",
      title: "Book tickets for this Event on Sep/20/2025",
      path: "/book-ticket/bonalu",
      link: "https://en.wikipedia.org/wiki/Bonalu",
    },
    {
      id: 8,
      url: "/Krishna Janmashtami.jpg",
      title: "Book tickets for this Event on Oct/20/2025",
      path: "/book-ticket/diwali",
      link: "https://en.wikipedia.org/wiki/Krishna_Janmashtami",
    },
    {
      id: 9,
      url: "/Srirama Navami.jpg",
      title: "Book tickets for this Event on Oct/20/2025",
      path: "/book-ticket/diwali",
      link: "https://en.wikipedia.org/wiki/Srirama_navami",
    },

  ];

  return (
    <>
      <div className="services container">
        <h2>INDIAN FESTIVALS</h2>
        <div className="banner">
          {services.map((element) => {
            return (
              <div className="item" key={element.id} style={{ cursor: "pointer" }}>
                <img
                  src={element.url}
                  alt={element.title}
                  onClick={() => element.link ? window.open(element.link, "_blank") : navigate(element.path)}
                  style={{ cursor: "pointer" }}
                />
                <h3>
                  <a href={element.path} style={{ textDecoration: "none", color: "inherit" }}>
                    {element.title}
                  </a>
                </h3>
                
                {/* Details Button Below Each Image */}
                <div className="button-container">
                  <button
                    className="details-button"
                    onClick={() => window.open(element.link, "_blank")}
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Services;
