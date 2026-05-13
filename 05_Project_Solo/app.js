// 全局变量
let currentUser = null;
let selectedMerchantId = null;
let selectedRating = 5;

// DOM元素
const merchantList = document.getElementById('merchant-list');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const merchantModal = document.getElementById('merchant-modal');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const reviewForm = document.getElementById('review-form');
const closeBtns = document.querySelectorAll('.close-btn');
const ratingStars = document.querySelectorAll('.rating-stars .star');

// 初始化
function init() {
  loadMerchants();
  bindEvents();
}

// 加载商家列表
async function loadMerchants() {
  try {
    // 模拟API调用
    // const response = await fetch('http://localhost:3000/api/merchants');
    // const merchants = await response.json();
    // renderMerchants(merchants);
    
    // 使用模拟数据
    const mockMerchants = [
      {
        _id: '1',
        name: '海底捞火锅',
        address: '北京市朝阳区建国路88号',
        phone: '010-12345678',
        category: '美食',
        tags: ['火锅', '川菜', '聚餐'],
        rating: 4.8,
        reviews: [
          {
            userId: '1',
            username: '张三',
            content: '服务态度非常好，食材新鲜，推荐！',
            rating: 5,
            createdAt: new Date()
          }
        ],
        images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hotpot%20restaurant&image_size=square_hd']
      },
      {
        _id: '2',
        name: '星巴克咖啡',
        address: '北京市海淀区中关村大街1号',
        phone: '010-87654321',
        category: '咖啡',
        tags: ['咖啡', '休闲', '工作'],
        rating: 4.5,
        reviews: [
          {
            userId: '2',
            username: '李四',
            content: '环境不错，咖啡味道正宗，适合工作学习。',
            rating: 4,
            createdAt: new Date()
          }
        ],
        images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=starbucks%20coffee%20shop&image_size=square_hd']
      },
      {
        _id: '3',
        name: '万达影城',
        address: '北京市朝阳区建国路93号',
        phone: '010-11223344',
        category: '电影',
        tags: ['电影', '娱乐', 'IMAX'],
        rating: 4.6,
        reviews: [
          {
            userId: '3',
            username: '王五',
            content: '影院环境好，音效棒，推荐IMAX厅。',
            rating: 5,
            createdAt: new Date()
          }
        ],
        images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cinema%20theater&image_size=square_hd']
      },
      {
        _id: '4',
        name: '全聚德烤鸭',
        address: '北京市东城区前门大街30号',
        phone: '010-67011379',
        category: '美食',
        tags: ['烤鸭', '北京菜', '老字号'],
        rating: 4.7,
        reviews: [
          {
            userId: '4',
            username: '赵六',
            content: '烤鸭皮脆肉嫩，非常正宗，服务也很好。',
            rating: 5,
            createdAt: new Date()
          }
        ],
        images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peking%20duck%20restaurant&image_size=square_hd']
      },
      {
        _id: '5',
        name: '希尔顿酒店',
        address: '北京市朝阳区东三环北路8号',
        phone: '010-58655000',
        category: '酒店',
        tags: ['五星级', '商务', '会议'],
        rating: 4.9,
        reviews: [
          {
            userId: '5',
            username: '孙七',
            content: '酒店环境豪华，服务一流，早餐品种丰富。',
            rating: 5,
            createdAt: new Date()
          }
        ],
        images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20hotel%20lobby&image_size=square_hd']
      },
      {
        _id: '6',
        name: '欢乐谷',
        address: '北京市朝阳区东四环小武基北路',
        phone: '010-67383333',
        category: '休闲娱乐',
        tags: ['主题公园', '刺激', '亲子'],
        rating: 4.4,
        reviews: [
          {
            userId: '6',
            username: '周八',
            content: '过山车很刺激，适合年轻人，人多的时候需要排队。',
            rating: 4,
            createdAt: new Date()
          }
        ],
        images: ['https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=theme%20park%20roller%20coaster&image_size=square_hd']
      }
    ];
    renderMerchants(mockMerchants);
  } catch (error) {
    console.error('加载商家列表失败:', error);
  }
}

// 渲染商家列表
function renderMerchants(merchants) {
  merchantList.innerHTML = '';
  merchants.forEach(merchant => {
    const card = document.createElement('div');
    card.className = 'merchant-card';
    card.innerHTML = `
      <img src="${merchant.images[0] || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=restaurant%20placeholder&image_size=square_hd'}" alt="${merchant.name}">
      <div class="info">
        <h3>${merchant.name}</h3>
        <div class="rating">${merchant.rating}</div>
        <div class="tags">
          ${merchant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
        <div class="address">${merchant.address}</div>
      </div>
    `;
    card.addEventListener('click', () => showMerchantDetail(merchant));
    merchantList.appendChild(card);
  });
}

// 显示商家详情
function showMerchantDetail(merchant) {
  selectedMerchantId = merchant._id;
  document.getElementById('merchant-name').textContent = merchant.name;
  document.getElementById('merchant-rating').textContent = merchant.rating;
  document.getElementById('merchant-address').textContent = merchant.address;
  document.getElementById('merchant-phone').textContent = merchant.phone;
  
  const tagsContainer = document.getElementById('merchant-tags');
  tagsContainer.innerHTML = '';
  merchant.tags.forEach(tag => {
    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.textContent = tag;
    tagsContainer.appendChild(tagElement);
  });
  
  const reviewList = document.getElementById('review-list');
  reviewList.innerHTML = '';
  merchant.reviews.forEach(review => {
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    reviewItem.innerHTML = `
      <div class="user">${review.username}</div>
      <div class="rating">${'★'.repeat(Math.floor(review.rating))}${review.rating % 1 ? '☆' : ''}</div>
      <div class="content">${review.content}</div>
    `;
    reviewList.appendChild(reviewItem);
  });
  
  merchantModal.classList.add('show');
}

// 绑定事件
function bindEvents() {
  // 登录按钮
  loginBtn.addEventListener('click', () => {
    loginModal.classList.add('show');
  });
  
  // 注册按钮
  registerBtn.addEventListener('click', () => {
    registerModal.classList.add('show');
  });
  
  // 关闭按钮
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').classList.remove('show');
    });
  });
  
  // 登录表单
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
      // 模拟登录
      // const response = await fetch('http://localhost:3000/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();
      // if (data.message === '登录成功') {
      //   currentUser = data.user;
      //   loginModal.classList.remove('show');
      //   alert('登录成功');
      // } else {
      //   alert(data.error);
      // }
      
      // 模拟登录成功
      currentUser = { _id: '1', username: '测试用户', email: email };
      loginModal.classList.remove('show');
      alert('登录成功');
    } catch (error) {
      console.error('登录失败:', error);
    }
  });
  
  // 注册表单
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    
    try {
      // 模拟注册
      // const response = await fetch('http://localhost:3000/api/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ username, email, password })
      // });
      // const data = await response.json();
      // if (data.message === '注册成功') {
      //   registerModal.classList.remove('show');
      //   alert('注册成功，请登录');
      // } else {
      //   alert(data.error);
      // }
      
      // 模拟注册成功
      registerModal.classList.remove('show');
      alert('注册成功，请登录');
    } catch (error) {
      console.error('注册失败:', error);
    }
  });
  
  // 评分星星
  ratingStars.forEach((star, index) => {
    star.addEventListener('click', () => {
      selectedRating = index + 1;
      ratingStars.forEach((s, i) => {
        s.classList.toggle('active', i <= index);
      });
    });
  });
  
  // 评价表单
  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('请先登录');
      return;
    }
    
    const formData = new FormData(reviewForm);
    const content = formData.get('content');
    
    try {
      // 模拟提交评价
      // const response = await fetch(`http://localhost:3000/api/merchants/${selectedMerchantId}/reviews`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     userId: currentUser._id,
      //     username: currentUser.username,
      //     content,
      //     rating: selectedRating
      //   })
      // });
      // const merchant = await response.json();
      // showMerchantDetail(merchant);
      // alert('评价提交成功');
      
      // 模拟评价提交成功
      alert('评价提交成功');
      // 刷新商家列表
      loadMerchants();
    } catch (error) {
      console.error('提交评价失败:', error);
    }
  });
  
  // 分类导航
  const categoryItems = document.querySelectorAll('.category-nav li');
  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      categoryItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      // 这里可以根据分类筛选商家
    });
  });
  
  // 筛选功能
  const filterSelects = document.querySelectorAll('.filter-item select');
  filterSelects.forEach(select => {
    select.addEventListener('change', () => {
      // 这里可以根据筛选条件过滤商家
    });
  });
  
  // 搜索功能
  const searchBar = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-bar button');
  
  searchBtn.addEventListener('click', () => {
    const keyword = searchBar.value;
    // 这里可以根据关键词搜索商家
  });
  
  searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const keyword = searchBar.value;
      // 这里可以根据关键词搜索商家
    }
  });
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);