import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    matriculeFiscale: String,
    regime: String,
    subscriptionType: String,
    status: String,
    startDate: Date
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
