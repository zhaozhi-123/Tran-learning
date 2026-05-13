const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));

// 数据库连接
mongoose.connect('mongodb://localhost:27017/dianping', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('数据库连接成功');
}).catch(err => {
  console.error('数据库连接失败:', err);
});

// 模型定义
const User = mongoose.model('User', {
  username: String,
  email: String,
  password: String,
  avatar: String
});

const Merchant = mongoose.model('Merchant', {
  name: String,
  address: String,
  phone: String,
  category: String,
  tags: [String],
  rating: Number,
  reviews: [{
    userId: mongoose.Schema.Types.ObjectId,
    username: String,
    content: String,
    rating: Number,
    createdAt: Date
  }],
  images: [String],
  promotions: [{
    title: String,
    description: String,
    startDate: Date,
    endDate: Date
  }]
});

// API路由
app.get('/api/merchants', async (req, res) => {
  try {
    const merchants = await Merchant.find();
    res.json(merchants);
  } catch (err) {
    res.status(500).json({ error: '获取商家列表失败' });
  }
});

app.get('/api/merchants/:id', async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    res.json(merchant);
  } catch (err) {
    res.status(500).json({ error: '获取商家详情失败' });
  }
});

app.post('/api/merchants/:id/reviews', async (req, res) => {
  try {
    const { userId, username, content, rating } = req.body;
    const merchant = await Merchant.findById(req.params.id);
    
    merchant.reviews.push({
      userId,
      username,
      content,
      rating,
      createdAt: new Date()
    });
    
    // 更新平均评分
    const totalRating = merchant.reviews.reduce((sum, review) => sum + review.rating, 0);
    merchant.rating = totalRating / merchant.reviews.length;
    
    await merchant.save();
    res.json(merchant);
  } catch (err) {
    res.status(500).json({ error: '提交评价失败' });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.json({ message: '注册成功' });
  } catch (err) {
    res.status(500).json({ error: '注册失败' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: '用户不存在' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: '密码错误' });
    }
    res.json({ message: '登录成功', user });
  } catch (err) {
    res.status(500).json({ error: '登录失败' });
  }
});

app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: '获取用户信息失败' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});