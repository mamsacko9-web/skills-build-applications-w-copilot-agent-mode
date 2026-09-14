import crypto from 'node:crypto'
import express from 'express'
import { connectDatabase } from './config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from './models.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/users', async (_request, response) => {
  response.json(await User.find().select('-passwordHash').populate('teamId', 'name').lean())
})

app.post('/api/users', async (request, response) => {
  const { username, email, password, displayName } = request.body
  if (!username || !email || !password || !displayName) {
    response.status(400).json({ error: 'username, email, password, and displayName are required' })
    return
  }
  const passwordHash = crypto.createHash('sha256').update(String(password)).digest('hex')
  const user = await User.create({ username, email, displayName, passwordHash })
  await Leaderboard.create({ userId: user._id })
  response.status(201).json({ id: user._id, username, email, displayName })
})

app.get('/api/teams', async (_request, response) => {
  response.json(await Team.find().populate('captainId', 'displayName').populate('memberIds', 'displayName').lean())
})

app.post('/api/teams', async (request, response) => {
  const { name, captainId } = request.body
  if (!name) {
    response.status(400).json({ error: 'name is required' })
    return
  }
  const team = await Team.create({ name, captainId, memberIds: captainId ? [captainId] : [] })
  if (captainId) await User.findByIdAndUpdate(captainId, { teamId: team._id })
  response.status(201).json(team)
})

app.get('/api/activities', async (request, response) => {
  const filter = request.query.userId ? { userId: request.query.userId } : {}
  response.json(await Activity.find(filter).populate('userId', 'displayName username').sort({ completedAt: -1 }).lean())
})

app.post('/api/activities', async (request, response) => {
  const { userId, type, durationMinutes, notes, completedAt } = request.body
  if (!userId || !type || !durationMinutes) {
    response.status(400).json({ error: 'userId, type, and durationMinutes are required' })
    return
  }
  const points = Math.round(Number(durationMinutes) * (type === 'strength' ? 2 : 1))
  const activity = await Activity.create({ userId, type, durationMinutes, points, notes, completedAt })
  await Leaderboard.findOneAndUpdate({ userId }, { $inc: { points } }, { upsert: true, new: true })
  response.status(201).json(activity)
})

app.get('/api/leaderboard', async (_request, response) => {
  const entries = await Leaderboard.find().sort({ points: -1 }).populate('userId', 'displayName username').lean()
  response.json(entries.map((entry, index) => ({ ...entry, rank: index + 1 })))
})

app.get('/api/workouts', async (request, response) => {
  const filter = request.query.difficulty ? { difficulty: request.query.difficulty } : {}
  response.json(await Workout.find(filter).sort({ createdAt: -1 }).lean())
})

app.post('/api/workouts', async (request, response) => {
  const { title, description, difficulty, durationMinutes, activityType } = request.body
  if (!title || !description || !difficulty || !durationMinutes || !activityType) {
    response.status(400).json({ error: 'title, description, difficulty, durationMinutes, and activityType are required' })
    return
  }
  response.status(201).json(await Workout.create(request.body))
})

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
})

connectDatabase().catch((error: unknown) => {
  console.error('MongoDB unavailable:', error)
})

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`)
})

export default app