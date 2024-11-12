import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';

// Define types for user details
interface UserDetails {
  id?: string;
  password?: string;
  email?: string;
  role?: string;
  active?: boolean;
}

// Function to create a MySQL connection
async function createDbConnection(): Promise<mysql.Connection> {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'acc_db',
  });
}

export class User {
  constructor(
    public id?: string,
    public password?: string,
    public email?: string,
    public role?: string,
    public active: boolean = true
  ) {}

  // Create User method
  static async CreateUser(id: string, password: string, email: string, role: string): Promise<User | null> {
    let connection: mysql.Connection | null = null;

    try {
      connection = await createDbConnection();

      // Check if user with the same ID or email already exists
      const [existingUser]: any = await connection.execute(
        'SELECT * FROM user_acc WHERE id = ? OR email = ?',
        [id, email]
      );

      if (existingUser.length > 0) {
        throw new Error('User ID or email already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user into the database
      await connection.execute(
        'INSERT INTO user_acc (id, password, email, role, active) VALUES (?, ?, ?, ?, ?)',
        [id, hashedPassword, email, role, 1]
      );

      return new User(id, undefined, email, role, true);
    } catch (error) {
      console.error(`Error creating user: ${error.message}`);
      return null;
    } finally {
      if (connection) await connection.end();
    }
  }

  // View Account by ID method
  static async ViewAcc(id: string): Promise<User | null> {
    let connection: mysql.Connection | null = null;

    try {
      connection = await createDbConnection();

      // Query user by ID
      const [results]: any = await connection.execute(
        'SELECT * FROM user_acc WHERE id = ?',
        [id]
      );

      if (results.length > 0) {
        const user = results[0];
        return new User(user.id, undefined, user.email, user.role, user.active);
      }

      return null; // User not found
    } catch (error) {
      console.error(`Error fetching user: ${error.message}`);
      return null;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Update Account method
  static async UpdateAcc(password: string, email: string, role: string, id: string): Promise<User | null> {
    let connection: mysql.Connection | null = null;

    try {
      connection = await createDbConnection();

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update user details
      await connection.execute(
        'UPDATE user_acc SET password = ?, email = ?, role = ? WHERE id = ?',
        [hashedPassword, email, role, id]
      );

      return await User.ViewAcc(id); // Return updated user
    } catch (error) {
      console.error(`Error updating user: ${error.message}`);
      return null;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Suspend Account method
  static async SuspendAcc(id: string): Promise<User | null> {
    let connection: mysql.Connection | null = null;

    try {
      connection = await createDbConnection();

      // Suspend the user by setting `active` to 0
      await connection.execute(
        'UPDATE user_acc SET active = 0 WHERE id = ?',
        [id]
      );

      return await User.ViewAcc(id); // Return suspended user
    } catch (error) {
      console.error(`Error suspending user: ${error.message}`);
      return null;
    } finally {
      if (connection) await connection.end();
    }
  }

  // Search Account method
  static async SearchAcc(id: string): Promise<User[]> {
    let connection: mysql.Connection | null = null;

    try {
      connection = await createDbConnection();

      // Search user by ID
      const [results]: any = await connection.execute(
        'SELECT * FROM user_acc WHERE id LIKE ?',
        [`%${id}%`]
      );

      return results.map(
        (row: any) => new User(row.id, undefined, row.email, row.role, row.active)
      );
    } catch (error) {
      console.error(`Error searching users: ${error.message}`);
      return [];
    } finally {
      if (connection) await connection.end();
    }
  }

  
    // Create Profile
    static async CreateProfile(
      id: string,
      name: string,
      hp: number,
      preference: string,
      age: number
    ): Promise<boolean> {
      let connection: mysql.Connection | null = null;
  
      try {
        connection = await createDbConnection();
  
        // Check if the user ID exists
        const [existingUser]: any = await connection.execute(
          'SELECT * FROM user_acc WHERE id = ?',
          [id]
        );
  
        if (existingUser.length === 0) {
          throw new Error('User account not found');
        }
  
        // Insert profile details into user_profile table
        await connection.execute(
          'INSERT INTO user_profile (user_id, name, hp, preference, age) VALUES (?, ?, ?, ?, ?)',
          [id, name, hp, preference, age]
        );
  
        return true;
      } catch (error) {
        console.error(`Error creating profile: ${error.message}`);
        return false;
      } finally {
        if (connection) await connection.end();
      }
    }
  
    // Update Profile
    static async UpdateProfile(
      id: string,
      name: string,
      hp: number,
      preference: string,
      age: number
    ): Promise<boolean> {
      let connection: mysql.Connection | null = null;
  
      try {
        connection = await createDbConnection();
  
        // Update profile details in user_profile table
        await connection.execute(
          'UPDATE user_profile SET name = ?, hp = ?, preference = ?, age = ? WHERE user_id = ?',
          [name, hp, preference, age, id]
        );
  
        return true;
      } catch (error) {
        console.error(`Error updating profile: ${error.message}`);
        return false;
      } finally {
        if (connection) await connection.end();
      }
    }
  
    // Suspend Profile
    static async SuspendProfile(name: string): Promise<boolean> {
      let connection: mysql.Connection | null = null;
  
      try {
        connection = await createDbConnection();
  
        // Suspend the profile by marking active as false
        await connection.execute(
          'UPDATE user_profile SET active = 0 WHERE name = ?',
          [name]
        );
  
        return true;
      } catch (error) {
        console.error(`Error suspending profile: ${error.message}`);
        return false;
      } finally {
        if (connection) await connection.end();
      }
    }
  
    // Search Profile
    static async SearchProfile(name: string): Promise<UserDetails[]> {
      let connection: mysql.Connection | null = null;
  
      try {
        connection = await createDbConnection();
  
        // Search profiles by name
        const [results]: any = await connection.execute(
          'SELECT * FROM user_profile WHERE name LIKE ?',
          [`%${name}%`]
        );
  
        return results;
      } catch (error) {
        console.error(`Error searching profiles: ${error.message}`);
        return [];
      } finally {
        if (connection) await connection.end();
      }
    }
  
    // Process Logout
    static processLogout(): boolean {
      // Perform logout operations, e.g., invalidate tokens or clean session storage
      console.log('User logged out successfully');
      return true;
    }
  
    // View Profile by User ID
    static async ViewProfile(id: string): Promise<UserDetails | null> {
      let connection: mysql.Connection | null = null;
  
      try {
        connection = await createDbConnection();
  
        // Fetch profile details by user ID
        const [results]: any = await connection.execute(
          'SELECT * FROM user_profile WHERE user_id = ?',
          [id]
        );
  
        if (results.length > 0) {
          return results[0];
        }
  
        return null; // Profile not found
      } catch (error) {
        console.error(`Error fetching profile: ${error.message}`);
        return null;
      } finally {
        if (connection) await connection.end();
      }
    }
  }
  
