import mongoose from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from '../models.js'

const connectionString = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}), Team.deleteMany({}), Activity.deleteMany({}),
      Leaderboard.deleteMany({}), Workout.deleteMany({}),
    ])
    const users = await User.create([
      { username: 'alex', email: 'alex@example.com', passwordHash: 'seeded', displayName: 'Alex' },
      { username: 'sam', email: 'sam@example.com', passwordHash: 'seeded', displayName: 'Sam' },
    ])
    const team = await Team.create({ name: 'Mergington Movers', captainId: users[0]._id, memberIds: users.map((user: { _id: mongoose.Types.ObjectId }) => user._id) })
    await User.updateMany({}, { teamId: team._id })
    await Activity.create([
      { userId: users[0]._id, type: 'running', durationMinutes: 30, points: 30, notes: 'Morning run', completedAt: new Date('2026-09-12T07:30:00Z') },
      { userId: users[1]._id, type: 'cycling', durationMinutes: 45, points: 45, notes: 'Ride around the park', completedAt: new Date('2026-09-13T09:00:00Z') },
    ])
    await Leaderboard.create(users.map((user: { _id: mongoose.Types.ObjectId }, index: number) => ({ userId: user._id, points: index === 0 ? 120 : 80 })))
    await Workout.create([
      { title: 'Quick Cardio', description: 'A short, energetic cardio session.', difficulty: 'beginner', durationMinutes: 20, activityType: 'running' },
      { title: 'Strength Basics', description: 'A full-body strength circuit.', difficulty: 'intermediate', durationMinutes: 30, activityType: 'strength' },
    ])

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
