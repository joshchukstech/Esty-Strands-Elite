import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
let isMongoConnected = false;
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      isMongoConnected = true;
    })
    .catch(err => console.error("MongoDB connection error:", err));
} else {
  console.warn("MONGODB_URI is not set. Database features will not work.");
}

// Cloudinary Configuration
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "estys_strands_elite",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  } as any,
});

const upload = multer({ storage: storage });

// Models
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  category: String,
});
const Product = mongoose.model("Product", productSchema);

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});
const Post = mongoose.model("Post", postSchema);

const gallerySchema = new mongoose.Schema({
  imageUrl: String,
  category: String, // 'wig', 'makeup', 'bridal'
});
const Gallery = mongoose.model("Gallery", gallerySchema);

// API Routes
app.get("/api/products", async (req, res) => {
  if (!isMongoConnected) return res.json([]);
  const products = await Product.find();
  res.json(products);
});

app.post("/api/products", upload.single("image"), async (req, res) => {
  if (!isMongoConnected) return res.status(500).json({ error: "DB not connected" });
  const { title, description, price, category } = req.body;
  const imageUrl = req.file?.path;
  const product = new Product({ title, description, price, category, imageUrl });
  await product.save();
  res.json(product);
});

app.delete("/api/products/:id", async (req, res) => {
  if (!isMongoConnected) return res.status(500).json({ error: "DB not connected" });
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.get("/api/posts", async (req, res) => {
  if (!isMongoConnected) return res.json([]);
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

app.get("/api/posts/:id", async (req, res) => {
  if (!isMongoConnected) return res.status(500).json({ error: "DB not connected" });
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

app.post("/api/posts", upload.single("image"), async (req, res) => {
  if (!isMongoConnected) return res.status(500).json({ error: "DB not connected" });
  const { title, content } = req.body;
  const imageUrl = req.file?.path;
  const post = new Post({ title, content, imageUrl });
  await post.save();
  res.json(post);
});

app.delete("/api/posts/:id", async (req, res) => {
  if (!isMongoConnected) return res.status(500).json({ error: "DB not connected" });
  await Post.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.get("/api/gallery", async (req, res) => {
  if (!isMongoConnected) return res.json([]);
  const images = await Gallery.find();
  res.json(images);
});

app.post("/api/gallery", upload.single("image"), async (req, res) => {
  if (!isMongoConnected) return res.status(500).json({ error: "DB not connected" });
  const { category } = req.body;
  const imageUrl = req.file?.path;
  const image = new Gallery({ imageUrl, category });
  await image.save();
  res.json(image);
});

app.delete("/api/gallery/:id", async (req, res) => {
  if (!isMongoConnected) return res.status(500).json({ error: "DB not connected" });
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === (process.env.ADMIN_PASSWORD || "admin123")) {
    res.json({ success: true, token: "admin-token-123" });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
