import mongoose from "mongoose";

const markerSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      maxlength: 50,
      required: [true, "Name of the marker is required!"]
    },
    latitude: {
      type: Number,
      required: [true, "Latitude of a location is required!"],
    },
    longitude: {
      type: Number,
      required: [true, "Longitude of a location is required!"],
    },
    description: {
      type: String,
      maxlength: 100,
    },
    createdById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required!"],
    },
    createdByName: {
      type: String,
      required: [true, "User name is required!"],
    },
  },
  { timestamps: true, versionKey: false }
);

const Marker = mongoose.model("Marker", markerSchema);

export default Marker;
