# 🧠 Orbit Brain - Your Second Brain

A modern, responsive second brain application built with React, TypeScript, and Node.js. Organize, search, and manage your digital content in one beautiful interface.

![Orbit Brain Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![Node Version](https://img.shields.io/badge/Node-16%2B-green)

## 🌟 Features

- **📱 Fully Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **🔐 User Authentication** - Secure signup/signin with JWT tokens
- **📝 Content Management** - Add, organize, and delete your content
- **🔍 Smart Search** - Find your content quickly with real-time search
- **🏷️ Tags & Filters** - Organize content by type (Twitter, YouTube, Notion, etc.)
- **📊 Multiple Views** - Switch between grid and list layouts
- **🔗 Content Sharing** - Share your brain with others via secure links
- **🎨 Modern UI** - Beautiful gradient design with smooth animations
- **☁️ Cloud Sync** - Your data is safely stored in MongoDB Atlas

## 🚀 Live Demo

- **Frontend**: [https://orbitsecondbrain.netlify.app](https://orbitsecondbrain.netlify.app)
- **Backend API**: [https://orbitbackend-production-429c.up.railway.app](https://orbitbackend-production-429c.up.railway.app)

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Vite** - Fast build tool

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe backend
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## 📁 Project Structure

```
Orbit-Brain/
├── Frontend/                 # React Frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── icons/          # Custom SVG icons
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React Context providers
│   │   ├── types/          # TypeScript type definitions
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json
├── Backend/                 # Node.js Backend
│   ├── src/
│   │   ├── index.ts        # Main server file
│   │   ├── db.ts           # Database connection
│   │   ├── middleware.ts   # Express middleware
│   │   └── utils.ts        # Utility functions
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- MongoDB Atlas account (free)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Parvaggarwal01/Orbit-Brain.git
cd Orbit-Brain
```

### 2. Backend Setup

```bash
# Navigate to backend
cd Backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB connection string and JWT secret
```

**Backend .env variables:**

```env
MONGO_URL=your-mongodb-url
JWT_SECRET=your-super-secret-jwt-key
PORT=10000
NODE_ENV=development
```

```bash
# Build and start backend
npm run build
npm start
```

### 3. Frontend Setup

```bash
# Navigate to frontend (new terminal)
cd Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app!

## 🌐 Deployment

### Backend (Railway)

1. Push code to GitHub
2. Connect Railway to your repository
3. Set root directory to `Backend`
4. Add environment variables
5. Deploy!

### Frontend (Netlify)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects for React Router

## 🎨 Design System

- **Colors**: Blue to Purple gradient theme
- **Typography**: Modern, readable font stack
- **Spacing**: Consistent 4px grid system
- **Breakpoints**: Mobile-first responsive design
- **Animations**: Smooth transitions and hover effects

## 🔧 API Endpoints

```
POST /api/v1/signup        - User registration
POST /api/v1/signin        - User authentication
POST /api/v1/content       - Add new content
GET  /api/v1/content       - Get user's content
DELETE /api/v1/content/:id - Delete content
POST /api/v1/brain/share   - Generate share link
GET  /api/v1/brain/:hash   - View shared brain
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Parv Aggarwal**

- GitHub: [@Parvaggarwal01](https://github.com/Parvaggarwal01)
- LinkedIn: [Parv Aggarwal](www.linkedin.com/in/parvaggarwal02)

## 🙏 Acknowledgments

- Icons from custom SVG icon library
- UI inspiration from modern web applications
- Built with love and lots of coffee ☕

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Parvaggarwal01/Orbit_Backend?style=social)
![GitHub forks](https://img.shields.io/github/forks/Parvaggarwal01/Orbit_Backend?style=social)
![GitHub issues](https://img.shields.io/github/issues/Parvaggarwal01/Orbit_Backend)
![GitHub PRs](https://img.shields.io/github/issues-pr/Parvaggarwal01/Orbit_Backend)

---

⭐ **Star this repository if you found it helpful!** ⭐

## 🔮 Future Features

- [ ] Dark mode theme
- [ ] Bulk content import
- [ ] Advanced search filters
- [ ] Content categories
- [ ] Export functionality
- [ ] Mobile app version
- [ ] AI-powered content suggestions

---

**Made with ❤️ by Parv Aggarwal**
