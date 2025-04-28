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
  "name": "John Doe",
  "email": "john@example.com",
  "passwordHash": "encryptedpassword",
  "role": "student" // or "admin"
}
```

**Subjects Collection**
```json
{
  "name": "Physics",
  "topics": ["Waves", "Mechanics", "Electricity"]
}
```

**Questions Collection**
```json
{
  "subject": "Physics",
  "topic": "Waves",
  "year": 2021,
  "questionText": "Describe the behavior of light waves in different media.",
  "paperPDF": "path/to/paper.pdf",
  "marksSchemePDF": "path/to/marks.pdf"
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

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Project Structure

```
oa-learn/
├── public/             # Static files
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── api/        # API routes
│   │   └── ...         # Page routes
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   └── utils/          # Utility functions
├── .env.example        # Example environment variables
├── .env.development    # Development environment variables
├── .env.production     # Production environment variables
└── ...                 # Config files
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
