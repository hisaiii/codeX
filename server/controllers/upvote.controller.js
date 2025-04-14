import Complaint from './models/complaint.model.js';
import ComplaintLog from './models/complaintLog.model.js';

export const upvoteComplaint = async (req, res) => {
  const { complaintId, userId } = req.body;

  try {
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ error: 'Complaint not found' });
    }

    // Increment upvotes
    complaint.upvotes += 1;
    await complaint.save();

    // Log the upvote action
    await ComplaintLog.create({
      complaint: complaintId,
      actionBy: userId,
      actionType: 'upvote',
      message: 'Complaint upvoted'
    });

    res.status(200).json({ message: 'Complaint upvoted successfully', complaint });
  } catch (error) {
    res.status(400).json({ error: 'Error upvoting complaint' });
  }
};
