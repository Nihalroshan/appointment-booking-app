import { bookAppointment, getAvailableSlots } from "../services/booking.service.js";

export const getSlotsForDate = async (req, res) => {
  try {
    const availableSlots = await getAvailableSlots(req.params.date);
    res.json(availableSlots);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

export const bookSlot = async (req, res) => {
  const { name, phone, date, timeSlot } = req.body;
  try {
    const success = await bookAppointment(name, phone, date, timeSlot);
    if (success) {
      res.json({ message: "Appointment booked successfully!" });
    } else {
      res.status(400).json({ error: "Slot already booked or invalid time" });
    }
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};
