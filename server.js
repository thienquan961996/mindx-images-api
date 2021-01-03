require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const AuthRouter = require('./modules/auth/auth.route');
const PostRouter = require('./modules/posts/posts.route')
const CommentRouter = require('./modules/comments/comments.route');
const log = require('./modules/shared/log')

// connect mongodb
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) throw err;
  console.log('MongoDB connected');
});

app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(log);

const prefix = 'api';

app.use(`/${prefix}/auth`, AuthRouter);
app.use(`/${prefix}/posts`, PostRouter);
app.use(`/${prefix}/comments`, CommentRouter);

app.get('/ping', (req, res) =>{
  res.send('pong');
})

// khởi tạo server
app.listen(process.env.PORT || 8080 , (err) => {
  if (err) throw err;
  console.log('Server started');
});