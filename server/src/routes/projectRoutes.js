const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");
const auth = require("../middleware/auth");

// Create project with image upload
router.post("/",  auth, upload.single("image"), async (req, res) => {
  try {
    const { name, description, liveUrl, features } = req.body;

    if (!name || !description || !req.file) {
      return res.status(400).json({ message: "Missing required fields" });
    }
 
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "gyz-tech-projects",
    });

    const project = await Project.create({
      name,
      description,
      image: result.secure_url,
      liveUrl,
      features: features ? JSON.parse(features) : [],
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
});

// Get all projects
router.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch projects" });
    }
});

module.exports = router;