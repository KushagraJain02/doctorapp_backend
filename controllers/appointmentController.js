import Appointment from "../models/Appointment.js";

// ✅ Create appointment
export const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      appointment,
      message: "Appointment created successfully",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ success: false, msg: messages.join(", ") });
    }
    res.status(500).json({ success: false, msg: err.message });
  }
};

// ✅ Get all appointments for logged-in user
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user.id });
    res.json({
      success: true,
      appointments,
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// ✅ Update appointment (only by owner)
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // only owner can update
      req.body,
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, msg: "Appointment not found" });
    }

    res.json({
      success: true,
      appointment,
      message: "Appointment updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// ✅ Delete appointment (only by owner)
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, msg: "Appointment not found" });
    }

    res.json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};
