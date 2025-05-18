const Contact = require('../models/Contact');

// POST /api/contact
const submitContact = async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  try {
    const contact = new Contact({ name, email, message });
    const saved = await contact.save();
    res.status(201).json({ message: 'Message submitted successfully.', contact: saved });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit message', error: error.message });
  }
};
// GET all contact messages
const getAllContacts = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitContact,
  getAllContacts, // 👈 add this
};
