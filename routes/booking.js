const express = require("express");
const {
  createBooking,
  getBookingsByUserEmail,
  getBookingsByProviderEmail,
  updateServiceStatus,
  cancelBooking,
} = require("../controllers/booking");
const verifyFirebaseToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", verifyFirebaseToken, createBooking);
router.get("/my-bookings", verifyFirebaseToken, getBookingsByUserEmail);
router.get("/my-order", verifyFirebaseToken, getBookingsByProviderEmail);
router.patch('/update-status/:id', verifyFirebaseToken, updateServiceStatus);
router.delete('/cancel/:id', verifyFirebaseToken, cancelBooking)

module.exports = router;
