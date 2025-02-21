
const Services = () => {
  const services = [
    {
      id: 1,
      url: "/Sankranthi.jpg",
      title: "Sankranthi Event",
    },
    {
      id: 2,
      url: "/Ugadhi.jpg",
      title: "Ugadhi Event",
    },
    {
      id: 3,
      url: "/Holi.jpg",
      title: "Holi Event",
    },
    {
      id: 4,
      url: "/Ganesh Chathurthi.jpg",
      title: "Ganesh Chathurthi Event",
    },
    {
      id: 5,
      url: "/Dhussera.jpg",
      title: "Dhussera Event",
    },
    {
      id: 6,
      url: "/Diwali.jpg",
      title: "Diwali Event",
    },
  ];
  return (
    <>
      <div className="services container">
        <h2>INDIAN FESTIVALS</h2>
        <div className="banner">
          {services.map((element) => {
            return (
              <div className="item" key={element.id}>
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