import { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";

const AdminDashboard = () => {
  const [view, setView] = useState("events");
  const [events, setEvents] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => {
        const updatedEvents = data.map(event => {
          const eventData = JSON.parse(localStorage.getItem(event.name));
          if (eventData) {
            event.seatsFilled = event.totalSeats - eventData.availableSeats;
          }
          return event;
        });
        setEvents(updatedEvents);
      })
      .catch((err) => console.error("Error fetching events:", err));

    fetch("/api/reservations")
      .then((res) => res.json())
      .then((data) => setReservations(data))
      .catch((err) => console.error("Error fetching reservations:", err));

    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error("Error fetching rooms:", err));
  }, []);

  const toggleRoomAvailability = async (roomId, currentStatus) => {
    try {
      await axios.put(`/api/rooms/update/${roomId}`, { isAvailable: !currentStatus });
      setRooms(rooms.map(room => room._id === roomId ? { ...room, isAvailable: !currentStatus } : room));
    } catch (err) {
      console.error("Error updating room status:", err);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <div className="tab-toggle">
        <button onClick={() => setView("events")} className={view === "events" ? "active" : ""}>
          Events Overview
        </button>
        <button onClick={() => setView("reservations")} className={view === "reservations" ? "active" : ""}>
          Reservations
        </button>
        <button onClick={() => setView("rooms")} className={view === "rooms" ? "active" : ""}>
          Room Availability
        </button>
      </div>

      {view === "events" && (
        <table>
          <thead> 
            <tr>
              <th>Event Name</th>
              <th>Total Seats</th>
              <th>Seats Filled</th>
              <th>Seats Available</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                <td>{event.name}</td>
                <td>{event.totalSeats}</td>
                <td>{event.seatsFilled}</td>
                <td>{event.totalSeats - event.seatsFilled}</td>
                <td className={event.totalSeats === event.seatsFilled ? "full" : "available"}>
                  {event.totalSeats === event.seatsFilled ? "Full" : "Available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {view === "reservations" && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Event</th>
              <th>Room</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((r, idx) => (
              <tr key={idx}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.event}</td>
                <td>{r.room}</td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {view === "rooms" && (
        <table>
          <thead>
            <tr>
              <th>Room</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td>{room.name}</td>
                <td className={room.isAvailable ? "available" : "unavailable"}>
                  {room.isAvailable ? "Available" : "Unavailable"}
                </td>
                <td>
                  <button onClick={() => toggleRoomAvailability(room._id, room.isAvailable)}>
                    {room.isAvailable ? "Mark Unavailable" : "Mark Available"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
