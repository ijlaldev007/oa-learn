import mongoose, { Document, Model, Schema } from 'mongoose';
import { hash, compare } from 'bcrypt';

// Define the user roles
export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
}

// Define the user interface
export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define the user document interface (includes methods)
export interface IUserDocument extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
  fullName(): string;
}

// Define the user model interface (includes statics)
export interface IUserModel extends Model<IUserDocument> {
  findByEmail(email: string): Promise<IUserDocument | null>;
}

// Create the user schema
const userSchema = new Schema<IUserDocument, IUserModel>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
    },
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.STUDENT,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Add index for email for faster lookups
userSchema.index({ email: 1 });

// Hash the password before saving
userSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Generate a salt and hash the password
    const saltRounds = 10;
    this.password = await hash(this.password, saltRounds);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return compare(candidatePassword, this.password);
};

// Method to get full name
userSchema.methods.fullName = function (): string {
  return `${this.firstName} ${this.lastName}`;
};

// Static method to find user by email
userSchema.statics.findByEmail = function (email: string): Promise<IUserDocument | null> {
  return this.findOne({ email: email.toLowerCase() });
};

// Create and export the User model
export const User = (mongoose.models.User as IUserModel) || 
  mongoose.model<IUserDocument, IUserModel>('User', userSchema);
