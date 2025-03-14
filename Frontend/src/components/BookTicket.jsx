import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./BookTicket.css";

const BookTicket = () => {
  const { eventName } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [numTickets, setNumTickets] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSeats, setAvailableSeats] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Function to fetch available seats
  const fetchAvailableSeats = () => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      fetch(`/api/v1/tickets/available-seats?event=${eventName}&date=${formattedDate}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Available Seats API Response:", data);
          setAvailableSeats(data.availableSeats ?? 150);
        })
        .catch((err) => {
          console.error("Error fetching seats:", err);
          setAvailableSeats(150);
        });
    }
  };

  // ✅ Fetch available seats when the date changes
  useEffect(fetchAvailableSeats, [selectedDate, eventName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!name || !email || !age || !gender || numTickets < 1 || numTickets > availableSeats) {
      setError("All fields are required, and tickets should not exceed available seats.");
      setLoading(false);
      return;
    }

    const formattedDate = selectedDate.toISOString().split("T")[0];

    const ticketData = {
      name,
      email,
      event: eventName.replace("-", " "),
      reservationDate: formattedDate,
      numTickets: Number(numTickets),
      age: Number(age),
      gender,
    };

    console.log("Sending Ticket Data:", ticketData); // ✅ Debugging log

    try {
      const response = await fetch("http://localhost:4000/api/v1/tickets/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(ticketData),
      });

      const data = await response.json();
      console.log("Booking Response:", data);
      if (data.success) {
        setTicket(data.ticket);
        fetchAvailableSeats(); // ✅ Refetch available seats after booking
      } else {
        setError("Failed to book ticket: " + data.message);
      }
    } catch (error) {
      setError("Error booking ticket. Please try again.");
      console.error("Booking error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Book Tickets for {eventName.replace("-", " ")}</h1>

      {error && <p className="error-message">{error}</p>}

      {!ticket ? (
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Available Seats: {availableSeats !== null ? availableSeats : "Loading..."}</label>
          </div>

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
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min="1" max="120" required />
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
            <input type="number" min="1" max={availableSeats} value={numTickets} onChange={(e) => setNumTickets(e.target.value)} required />
          </div>

          <div className="form-group">
            <h3>Select a Date:</h3>
            <Calendar onChange={setSelectedDate} value={selectedDate} />
          </div>

          <button type="submit" className="booking-button" disabled={loading || availableSeats === 0 || numTickets > availableSeats}>
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      ) : (
        <div className="ticket">
          <h2>🎟 Your Ticket</h2>
          <p><strong>Name:</strong> {ticket.name}</p>
          <p><strong>Event:</strong> {ticket.event}</p>
          <p><strong>Email:</strong> {ticket.email}</p>
          <p><strong>Age:</strong> {ticket.age}</p>
          <p><strong>Gender:</strong> {ticket.gender}</p>
          <p><strong>Tickets:</strong> {ticket.numTickets}</p>
          <p><strong>Date:</strong> {new Date(ticket.reservationDate).toLocaleString()}</p>
          <button onClick={() => { window.print(); fetchAvailableSeats(); }} className="print-button">🖨 Print Ticket</button>
        </div>
      )}
    </div>
  );
};

export default BookTicket;
