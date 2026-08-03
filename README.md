# LinkZen

LinkZen is a modern Linktree-inspired web application that lets users create and share a personalized profile containing all of their important links in one place. Users can sign in with GitHub, create a unique handle, manage their links, and share a clean public profile with others.

## ✨ Features

- GitHub Authentication using Auth.js
- Create a unique public profile
- Edit your profile and links
- Delete your profile
- Public profile pages with custom handles
- Explore profiles created by other users
- Fully responsive design
- Fast and optimized with Next.js App Router
- Modern UI built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- React 19
- Tailwind CSS
- React Icons

### Backend
- Next.js Route Handlers
- Server Actions

### Database
- MongoDB
- Mongoose

### Authentication
- Auth.js (NextAuth v5)
- GitHub OAuth

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/linkzen.git
```

### 2. Navigate to the project

```bash
cd linkzen
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env.local` file

```env
MONGODB_URI=your_mongodb_connection_string

AUTH_SECRET=your_auth_secret
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret
```

### 5. Run the development server

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

## 📖 Usage

1. Sign in with GitHub.
2. Choose a unique handle.
3. Add your links.
4. Save your profile.
5. Share your personalized LinkZen page with anyone.

---

Made with ❤️ using Next.js and MongoDB.