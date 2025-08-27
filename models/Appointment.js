import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    doctorName: { type: String, required: true },
    patientName: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
