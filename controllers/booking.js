const { default: mongoose } = require("mongoose");
const Booking = require("../models/booking");


// Create service Booking
const createBooking = async (req, res) => {
  try {
    const {
      serviceId,
      serviceName,
      serviceImage,
      providerEmail,
      providerName,
      userEmail,
      userName,
      date,
      specialInstruction,
      price,
      serviceLocation,
    } = req.body;

    if (
      !serviceId ||
      !serviceName ||
      !serviceImage ||
      !providerEmail ||
      !providerName ||
      !userEmail ||
      !userName ||
      !date ||
      !price ||
      !serviceLocation
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided." });
    }

    const newBooking = new Booking({
      serviceId,
      serviceName,
      serviceImage,
      providerEmail,
      providerName,
      userEmail,
      userName,
      date,
      specialInstruction,
      price,
      serviceLocation,
    });

    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking created successfully", booking: newBooking });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};


// All bookings booked by the user
const getBookingsByUserEmail = async (req, res) => {
  const { email } = req.user;

  if (!email) {
    return res
      .status(400)
      .json({ error: "Email is required as a query parameter" });
  }
  try {
    const bookings = await Booking.find({ userEmail: email });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: `Internal server error ${error.message}` });
  }
};


// All Booking booked by the client
const getBookingsByProviderEmail = async (req, res) => {
  const { email } = req.user;
  if (!email) {
    return res
      .status(400)
      .json({ error: "email is required as query parameter" });
  }
  try {
    const bookings = await Booking.find({ providerEmail: email });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// update client service status
const updateServiceStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const result = await Booking.updateOne(
      { _id: id },
      { $set: { serviceStatus: status } }
    );

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Booking not found or status unchanged" });
    }

    res.status(200).json({ message: "Service status update successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const cancelBooking = async (req, res) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(401).json({error: 'invalid id'})
  }

  try {
    const result = await Booking.findByIdAndDelete({_id: id});
    if(!result){r
      return res.status(400).json({message: 'booking not found or already deleted'})
    }
    res.status(200).json({message: 'Booking cancel successfully', result})
  } catch (error) {
     res.status(500).json({ message: "internal error", error: error.message });
  }
}

module.exports = {
  createBooking,
  getBookingsByUserEmail,
  getBookingsByProviderEmail,
  updateServiceStatus,
  cancelBooking,
};
