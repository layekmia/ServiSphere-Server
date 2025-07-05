const express = require("express");
const {
  addService,
  getAllService,
  getServiceById,
  getServiceByEmail,
  deleteService,
  updateService,
} = require("../controllers/ServiceController");
const verifyFirebaseToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", verifyFirebaseToken, addService);
router.get("/", getAllService);
router.get("/my-services", verifyFirebaseToken, getServiceByEmail);
router.get("/:id", getServiceById);
router.delete("/:id", verifyFirebaseToken, deleteService);
router.put("/update/:id", verifyFirebaseToken, updateService);

module.exports = router;
