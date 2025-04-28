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

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
