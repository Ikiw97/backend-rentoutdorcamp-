import Product from "../models/Product.js";

// GET ALL
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
export const createProduct = async (req, res) => {
  try {
    const photos = req.files?.map((f) => f.filename) || [];

    const product = await Product.create({
      ...req.body,
      photos,
    });

    res.json({ message: "Produk berhasil ditambahkan", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    const photos = req.files?.map((f) => f.filename) || [];

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, $push: { photos: { $each: photos } } },
      { new: true }
    );

    res.json({ message: "Produk diperbarui", product });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Produk dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
