const Services = () => {
  const services = [
    {
      id: 1,
      url: "/Sankranthi.jpg",
      title: "Sankranthi Event",
      link: "https://en.wikipedia.org/wiki/Makar_Sankranti",
    },
    {
      id: 2,
      url: "/Ugadhi.jpg",
      title: "Ugadhi Event",
      link: "https://en.wikipedia.org/wiki/Ugadi",
    },
    {
      id: 3,
      url: "/Holi.jpg",
      title: "Holi Event",
      link: "https://en.wikipedia.org/wiki/Holi",
    },
    {
      id: 4,
      url: "/Ganesh Chathurthi.jpg",
      title: "Ganesh Chathurthi Event",
      link: "https://en.wikipedia.org/wiki/Ganesh_Chaturthi",
    },
    {
      id: 5,
      url: "/Dhussera.jpg",
      title: "Dhussera Event",
      link: "https://en.wikipedia.org/wiki/Dussehra",
    },
    {
      id: 6,
      url: "/Diwali.jpg",
      title: "Diwali Event",
      link: "https://en.wikipedia.org/wiki/Diwali",
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
                onClick={() => window.open(element.link, "_blank")} // ✅ Open Wikipedia in new tab
                style={{ cursor: "pointer" }} // ✅ Make the cursor indicate it's clickable
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
