import { useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./BookTicket.css"; // ✅ Import the new CSS file

const BookTicket = () => {
  const { eventName } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [numTickets, setNumTickets] = useState(1);
  const [ticket, setTicket] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketId = uuidv4().slice(0, 8);

    const newTicket = {
      id: ticketId,
      event: eventName.replace("-", " "),
      name,
      email,
      age,
      gender,
      numTickets,
      date: new Date().toLocaleString(),
    };

    setTicket(newTicket);
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Book Tickets for {eventName.replace("-", " ")}</h1>
      
      {!ticket ? (
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Age:</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min="1" max="120" placeholder="Enter your age" required />
          </div>

          <div className="form-group">
            <label>Gender:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Number of Tickets:</label>
            <input type="number" min="1" max="10" value={numTickets} onChange={(e) => setNumTickets(e.target.value)} required />
          </div>

          <button type="submit" className="booking-button">Book Now</button>
        </form>
      ) : (
        <div className="ticket">
          <h2>🎟 Your Ticket</h2>
          <p><strong>Ticket ID:</strong> {ticket.id}</p>
          <p><strong>Event:</strong> {ticket.event}</p>
          <p><strong>Name:</strong> {ticket.name}</p>
          <p><strong>Age:</strong> {ticket.age}</p>
          <p><strong>Gender:</strong> {ticket.gender}</p>
          <p><strong>Email:</strong> {ticket.email}</p>
          <p><strong>Tickets:</strong> {ticket.numTickets}</p>
          <p><strong>Date:</strong> {ticket.date}</p>
          <button onClick={() => window.print()} className="print-button">🖨 Print Ticket</button>
        </div>
      )}
    </div>
  );
};

export default BookTicket;
