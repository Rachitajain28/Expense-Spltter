const express = require("express");
const router = express.Router();

const Group = require("../models/Group");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @route   POST /api/groups/create
 * @desc    Create a new group
 * @access  Private
 */
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Group name is required" });
    }

    const newGroup = new Group({
      name,
      members,
      createdBy: req.user.id,
    });

    await newGroup.save();

    res.status(201).json({
      message: "Group created successfully",
      group: newGroup,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * @route   GET /api/groups/my-groups
 * @desc    Get all groups created by logged-in user
 * @access  Private
 */
router.get("/my-groups", authMiddleware, async (req, res) => {
  try {
    const groups = await Group.find({ createdBy: req.user.id });

    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
