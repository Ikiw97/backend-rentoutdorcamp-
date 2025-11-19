import Setting from "../models/Setting.js";

/**
 * getSettings
 */
export const getSettings = async (req, res) => {
  try {
    let s = await Setting.findOne();
    if (!s) {
      s = await Setting.create({});
    }
    res.json(s);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * updateSettings (admin)
 */
export const updateSettings = async (req, res) => {
  try {
    const payload = req.body;
    const updated = await Setting.findOneAndUpdate({}, payload, { new: true, upsert: true });
    res.json({ message: "Pengaturan diperbarui", settings: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
