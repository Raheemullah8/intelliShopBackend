import database from "../database/db";

export async function createuserTable() {
    try {
        const query = `
         CREATE TABLE IF NOT EXISTS users (
         id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
         name VARCHAR(100) NOT NULL CHECK (length(name) >= 3),
         email VARCHAR(100) UNIQUE NOT NULL,
         pasword text NOT NULL,
         role VARCHAR(10) DEFAULT 'user' CHECK (role IN ('user','admin')), 
         avatar JSONB DEFAULT NULL,
         reset_password_token TEXT DEFAULT NULL,
         reset_password_expire TIMESTAMP DEFAULT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
         );
         `;

        await database.query(query);
    } catch (error) {
        console.error("Error creating users table:", error);
        process.exit(1);
    }
}