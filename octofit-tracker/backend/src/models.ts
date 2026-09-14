import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  displayName: { type: String, required: true, trim: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true })

const teamSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  captainId: { type: Schema.Types.ObjectId, ref: 'User' },
  memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true })

const activitySchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['running', 'walking', 'strength', 'cycling', 'other'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  points: { type: Number, required: true, min: 0 },
  notes: { type: String, trim: true },
  completedAt: { type: Date, default: Date.now },
}, { timestamps: true })

const leaderboardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, default: 0, min: 0 },
  rank: { type: Number, min: 1 },
}, { timestamps: true })

const workoutSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  activityType: { type: String, required: true },
}, { timestamps: true })

export const User = mongoose.models.User ?? mongoose.model('User', userSchema)
export const Team = mongoose.models.Team ?? mongoose.model('Team', teamSchema)
export const Activity = mongoose.models.Activity ?? mongoose.model('Activity', activitySchema)
export const Leaderboard = mongoose.models.Leaderboard ?? mongoose.model('Leaderboard', leaderboardSchema)
export const Workout = mongoose.models.Workout ?? mongoose.model('Workout', workoutSchema)