# 🛡️ O/A Levels EdTech Platform

An educational web application designed to help students prepare for O/A Level examinations by providing access to categorized past paper questions.

## 🎯 Project Overview

This platform allows students to browse, filter, and attempt past paper questions organized by subject and topic. The application includes both a student-facing interface and an admin panel for content management.

## ✨ Core Features

### Student Panel

| Feature | Description |
|:--------|:------------|
| Signup/Login | Email + Password authentication with JWT |
| Browse Subjects | View available subjects |
| Browse Topics | Explore topics within each subject |
| View Questions | Access questions organized by topic |
| Download/View PDFs | View or download past papers and mark schemes |
| Attempt Questions | Type answers to practice questions |
| Filters | Filter by subject, topic, and year |

### Admin Panel

| Feature | Description |
|:--------|:------------|
| Login | Admin authentication |
| Upload Past Papers | Upload PDF files (papers and mark schemes) |
| Categorize Questions | Split papers into individual questions and assign metadata |
| Edit/Delete | Manage uploaded content |

## 🏗️ Tech Stack

| Component | Technology |
|:----------|:-----------|
| Frontend | Next.js 14 (React) |
| API Layer | Axios with Interceptors |
| Data Fetching | React Query (TanStack) |
| Backend | Node.js (Express.js) |
| Database | MongoDB Atlas |
| Authentication | JWT |
| File Storage | Local storage (MVP) |

## 📂 Database Structure

**Users Collection**
```json
{
  "email": "john@example.com",
  "password": "hashedpassword",
  "firstName": "John",
  "lastName": "Doe",
  "role": "student", // or "admin"
  "isActive": true,
  "lastLogin": "2023-05-01T12:00:00Z",
  "createdAt": "2023-01-01T10:00:00Z",
  "updatedAt": "2023-05-01T12:00:00Z"
}
```

**Subjects Collection**
```json
{
  "name": "Physics",
  "description": "Study of matter, energy, and their interactions",
  "imageUrl": "/images/physics.jpg",
  "isActive": true,
  "createdAt": "2023-01-01T10:00:00Z",
  "updatedAt": "2023-01-01T10:00:00Z"
}
```

**Topics Collection**
```json
{
  "name": "Waves",
  "description": "Study of wave properties and behaviors",
  "subjectId": "ObjectId('subject_id_here')",
  "isActive": true,
  "createdAt": "2023-01-01T10:00:00Z",
  "updatedAt": "2023-01-01T10:00:00Z"
}
```

**Questions Collection**
```json
{
  "topicId": "ObjectId('topic_id_here')",
  "year": 2021,
  "examBoard": "Cambridge",
  "paperNumber": "Paper 1",
  "questionNumber": "3a",
  "difficulty": "medium",
  "marks": 5,
  "questionText": "Describe the behavior of light waves in different media.",
  "questionImageUrl": "/uploads/questions/q123.jpg",
  "paperPdfUrl": "/uploads/papers/physics_2021_p1.pdf",
  "markSchemePdfUrl": "/uploads/markschemes/physics_2021_p1_ms.pdf",
  "isActive": true,
  "createdAt": "2023-01-01T10:00:00Z",
  "updatedAt": "2023-01-01T10:00:00Z"
}
```

**Attempts Collection**
```json
{
  "userId": "ObjectId('user_id_here')",
  "questionId": "ObjectId('question_id_here')",
  "answer": "Light waves travel at different speeds in different media, which causes refraction...",
  "status": "completed", // or "in-progress", "saved"
  "startedAt": "2023-05-01T12:00:00Z",
  "completedAt": "2023-05-01T12:30:00Z",
  "createdAt": "2023-05-01T12:00:00Z",
  "updatedAt": "2023-05-01T12:30:00Z"
}
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ijlaldev007/oa-learn.git
   cd oa-learn
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your specific configuration.

   **Environment Configuration:**

   The application uses different environment files for different deployment contexts:

   - `.env.development` - Used during local development (`npm run dev`)
   - `.env.staging` - Used in the staging environment
   - `.env.production` - Used in the production environment
   - `.env.local` - Used to override any of the above (not committed to git)

   **Key Environment Variables:**

   | Variable | Description | Example |
   |:---------|:------------|:--------|
   | `APP_URL` | Base URL of the application | `http://localhost:3000` |
   | `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
   | `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/oa-learn` |
   | `STORAGE_TYPE` | Storage type (`local` or `s3`) | `local` |
   | `S3_BUCKET_NAME` | S3 bucket name (if using S3) | `oa-learn-files` |

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Set up MongoDB Atlas:
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Create a database user with read/write permissions
   - Add your IP address to the IP access list
   - Get your connection string and update it in `.env.development`

6. Seed the database with initial data:
   ```bash
   npm run db:seed
   ```
   This will create:
   - An admin user (admin@oalearn.com / Admin@123)
   - A test student (student@oalearn.com / Student@123)

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Structure

```
oa-learn/
├── public/             # Static files
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── api/        # API routes
│   │   │   └── health/ # Health check endpoint
│   │   └── ...         # Page routes
│   ├── components/     # Reusable UI components
│   │   └── Button.tsx  # Example button component
│   ├── hooks/          # Custom React hooks
│   │   └── useLocalStorage.ts # Local storage hook
│   ├── lib/            # Library code
│   │   ├── db/         # Database module
│   │   │   ├── models/ # Mongoose models
│   │   │   ├── connection.ts # Database connection
│   │   │   ├── utils.ts # Database utilities
│   │   │   ├── init.ts # Database initialization
│   │   │   └── seed.ts # Database seeding
│   │   └── utils.ts    # Utility functions
│   └── utils/          # Utility functions
│       ├── api.ts      # API client utilities
│       └── formatters.ts # Text/data formatting utilities
├── middleware.ts       # Next.js middleware for API security
├── .env.example        # Example environment variables
├── .env.development    # Development environment variables
├── .env.staging        # Staging environment variables
├── .env.production     # Production environment variables
├── tailwind.config.js  # Tailwind CSS configuration
├── next.config.ts      # Next.js configuration
├── postcss.config.mjs  # PostCSS configuration
├── eslint.config.mjs   # ESLint configuration
└── tsconfig.json       # TypeScript configuration
```

## 🎯 Success Metrics

| Metric | Goal |
|:-------|:-----|
| Time to Launch | 4–6 weeks |
| Students using app | 50–100 early users |
| Admin ease of upload | <5 minutes per paper |
| Bugs/Crashes | <5% error rate |

## 🔥 Future Enhancements

- AI-powered question selection
- Enhanced student dashboards
- Mobile application
- Multiple admin roles
- Analytics dashboard
- Cloud storage integration
