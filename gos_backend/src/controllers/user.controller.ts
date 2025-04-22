import { BAD_REQUEST, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from "../constants/http";
import UserModel from "../models/user.model";
import { calculateAndUpdateUserStats } from "../services/userStats.service";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

// GET /user - Get current user
export const getUserHandler = catchErrors(async (req, res) => {
  const user = await UserModel.findById(req.userId);
  appAssert(user, NOT_FOUND, "User not found");
  return res.status(OK).json(user.omitPassword());
});

// GET /user/all - Get all users (no passwords)
export const getAllUsersHandler = catchErrors(async (req, res) => {
  const users = await UserModel.find({}, { password: 0 }); // exclude password
  return res.status(OK).json(users.map((user) => user.omitPassword()));
});

// PUT /user/username - Update username
export const updateUsernameHandler = catchErrors(async (req, res) => {
  const userId = req.userId;
  const { newUsername } = req.body;

  appAssert(newUsername, BAD_REQUEST, "New username is required");

  const existing = await UserModel.findOne({ username: newUsername });
  appAssert(!existing, BAD_REQUEST, "Username already taken");

  const user = await UserModel.findByIdAndUpdate(
    userId,
    { username: newUsername },
    { new: true }
  );

  appAssert(user, NOT_FOUND, "User not found");
  return res.status(OK).json(user.omitPassword());
});

// PUT /user/password - Update password
export const updatePasswordHandler = catchErrors(async (req, res) => {
  const userId = req.userId;
  const { newPassword } = req.body;

  appAssert(newPassword, BAD_REQUEST, "New password is required");

  const user = await UserModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");

  user.password = newPassword; // Will be hashed by pre('save')
  await user.save();

  return res.status(OK).json({ message: "Password updated successfully" });
});

// DELETE /user - Delete account
export const deleteUserHandler = catchErrors(async (req, res) => {
  const userId = req.userId;

  const user = await UserModel.findByIdAndDelete(userId);
  appAssert(user, NOT_FOUND, "User not found");

  return res.status(OK).json({ message: "User account deleted successfully" });
});

// GET /user/leaderboard - Get top 10 users based on thier net worth
export const getLeaderboardUsersHandler = catchErrors(async (req, res) => {
  // Fetch top 10 users sorted by netWorth in descending order
  const topUsers = await UserModel.find()
  .sort({ netWorth: -1, createdAt: 1 }) // primary sort by netWorth, secondary sort by createdAt
  .limit(10)
  .select("username netWorth gainLoss"); // Select only the required fields

  appAssert(topUsers, INTERNAL_SERVER_ERROR, "Error fetching users for the leaderboard");

  return res.status(OK).json(topUsers.map((user) => user.omitPassword()));
});

// POST /user/update-stats - Update user stats when trading stocks
export const triggerUserStatsUpdateHandler = catchErrors(async (req, res) => {
  await calculateAndUpdateUserStats();
  return res.status(OK).json({ message: "User stats update triggered successfully"});
})