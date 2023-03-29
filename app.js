require('dotenv').config();
require('express-async-errors')

// extra security package
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


const express = require('express');
const app = express();

//connect to db
const connectDB = require('./db/connection');
const authenticateUser = require('./middleware/authentication')

//routes
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
const categoryRouter = require('./routes/postCategory')
const commentRouter = require('./routes/comment')

const notFoundMiddleware = require('./middleware/notFound');
const errorHandlerMddleware = require('./middleware/errorHandler');

// API extra security packages implimentation
app.set('trust proxy', 1);
app.use(
rateLimiter({
  windowMs: 15  * 60 * 1000, // 15 minutes
  max: 100, // limit each IP 100 requests per windowMs
})
);
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())


app.use('/api/auth', authRouter);
app.use('/api/post', authenticateUser, postRouter);
app.use('/api/categories', authenticateUser, categoryRouter);
app.use('/api/comments', authenticateUser, commentRouter);

// error handler
app.use(notFoundMiddleware)
app.use(errorHandlerMddleware)

const port = process.env.PORT || 3000

const start = async ()=>{
  try {
    //connectDB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log(`server is listening port ${port}...`))
  } catch(error){
    console.log(error)
  }
};

start()
