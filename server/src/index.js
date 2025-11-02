import express from 'express'
import cors from 'cors'
import connectDB from './database/config.js'
import authRouter from './routes/auth.js'
import crudRouter from './routes/crud.js'
import enhanceRouter from './routes/aiupdate.js'
import feedRoute from './routes/feed.js'
import likeRouter from './routes/likeRoute.js'
import commentRouter from './routes/comment.js'

const app = express()
const port = 5500

app.use(express.json())
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL || ['http://localhost:5173'] }))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('welcome to Blog app')
})

//routes
app.use('/api/auth', authRouter)
app.use('/api/blogs', crudRouter)
app.use('/api/blogs/enhance', enhanceRouter)
app.use('/api/feed', feedRoute)
app.use('/api/blogs/likes', likeRouter)
app.use('/api/comments', commentRouter)

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Something went wrong' })
})

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on ${port}`)
    })
  })
  .catch(err => {
    console.log('mongodb connection error', err)
  })
