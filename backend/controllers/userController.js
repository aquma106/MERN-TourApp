import User from "../models/User.js";

// Create a new user
export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to create. Error: ${error.message}`,
    });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to update. Error: ${error.message}`,
    });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to delete. Error: ${error.message}`,
    });
  }
};

// Get single user
export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successful",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to fetch user. Error: ${error.message}`,
    });
  }
};

// Get all users with optional pagination
export const getAllUser = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default pagination values
  const skip = (page - 1) * limit;

  try {
    const users = await User.find({}).skip(skip).limit(Number(limit));
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      success: true,
      count: users.length,
      total: totalUsers,
      message: "Successful",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to fetch users. Error: ${error.message}`,
    });
  }
};
