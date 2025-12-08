// User model for managing user data
// The 'password' field must meet complexity requirements
// 'isDeleted' indicates if the user account is marked for deletion
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }, // Password must be hashed and complex
  isDeleted: { type: Boolean, default: false }, // Indicates if the user is deleted
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
