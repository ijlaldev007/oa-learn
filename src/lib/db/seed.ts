import { connectToDatabase, disconnectFromDatabase } from './connection';
import { User, UserRole } from './models';

/**
 * Seed the database with initial data
 */
async function seedDatabase() {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();
    
    console.log('Seeding database...');
    
    // Seed admin user
    await seedAdminUser();
    
    // Seed test student user
    await seedTestStudent();
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Disconnect from database
    await disconnectFromDatabase();
  }
}

/**
 * Seed admin user
 */
async function seedAdminUser() {
  try {
    const adminEmail = 'admin@oalearn.com';
    
    // Check if admin user already exists
    const existingAdmin = await User.findByEmail(adminEmail);
    
    if (existingAdmin) {
      console.log('Admin user already exists, skipping...');
      return;
    }
    
    // Create admin user
    const admin = new User({
      email: adminEmail,
      password: 'Admin@123', // This will be hashed by the pre-save hook
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
    });
    
    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error);
    throw error;
  }
}

/**
 * Seed test student user
 */
async function seedTestStudent() {
  try {
    const studentEmail = 'student@oalearn.com';
    
    // Check if test student already exists
    const existingStudent = await User.findByEmail(studentEmail);
    
    if (existingStudent) {
      console.log('Test student already exists, skipping...');
      return;
    }
    
    // Create test student
    const student = new User({
      email: studentEmail,
      password: 'Student@123', // This will be hashed by the pre-save hook
      firstName: 'Test',
      lastName: 'Student',
      role: UserRole.STUDENT,
    });
    
    await student.save();
    console.log('Test student created successfully');
  } catch (error) {
    console.error('Error seeding test student:', error);
    throw error;
  }
}

// Run the seed function
seedDatabase();
