# Database Module

This module provides database connectivity and models for the O/A Levels EdTech Platform.

## Setup

1. Make sure you have MongoDB Atlas account and a cluster set up
2. Update the `.env.development` file with your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```

## Usage

### Connecting to the Database

```typescript
import { connectToDatabase } from '@/lib/db';

// Connect to the database
await connectToDatabase();
```

### Using Models

```typescript
import { User, UserRole } from '@/lib/db';

// Create a new user
const user = new User({
  email: 'user@example.com',
  password: 'securepassword',
  firstName: 'John',
  lastName: 'Doe',
  role: UserRole.STUDENT,
});

// Save the user to the database
await user.save();

// Find a user by email
const foundUser = await User.findByEmail('user@example.com');
```

### Database Operations Wrapper

```typescript
import { withDatabase } from '@/lib/db';

// Perform database operations with proper connection management
const result = await withDatabase(async () => {
  // Your database operations here
  const users = await User.find();
  return users;
});
```



## Models

### User

The User model represents users in the system with the following fields:

- `email`: String (required, unique)
- `password`: String (required, hashed)
- `firstName`: String (required)
- `lastName`: String (required)
- `role`: Enum (STUDENT, ADMIN)
- `isActive`: Boolean
- `lastLogin`: Date
- `createdAt`: Date (automatic)
- `updatedAt`: Date (automatic)

Methods:
- `comparePassword(candidatePassword)`: Compares a candidate password with the stored hash
- `fullName()`: Returns the user's full name

Static methods:
- `findByEmail(email)`: Finds a user by email address
