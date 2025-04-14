// controllers/authority.controller.js
import Authority from "../models/authority.model.js";
import Complaint from "../models/complaint.model.js";

export const getAuthorityProfile = async (req, res) => {
  try {
    const authority = await Authority.findById(req.user.userId).select("-password");
    if (!authority) {
      return res.status(404).json({ msg: "Authority not found" });
    }
    res.status(200).json({ authority });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const getAuthorityComplaints = async (req, res) => {
  try {
    const authority = await Authority.findById(req.user.userId);
    if (!authority) {
      return res.status(404).json({ msg: "Authority not found" });
    }

    const complaints = await Complaint.find({
      "location.address": { $regex: authority.city, $options: "i" } // Match complaints by city name
    });

    res.status(200).json({ complaints });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // status: "in-progress" or "resolved" or "rejected"

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ msg: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    res.status(200).json({ msg: "Complaint status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};
