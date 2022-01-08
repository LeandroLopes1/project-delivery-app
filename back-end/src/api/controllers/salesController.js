const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  try {
    const response = await salesService.createSale(req.body);
    res.status(201).json({ response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSalesByUser = async (req, res) => {
  try {
    const user = req.userId;
    const response = await salesService.getSalesByUser(user);
    res.status(201).json({ response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSale,
  getSalesByUser,
};