export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} tidak ditemukan` });
};

export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(500).json({ message: err.message });
};
