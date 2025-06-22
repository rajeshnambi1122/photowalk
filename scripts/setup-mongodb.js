// MongoDB setup script
// This script creates the database and collection with proper indexes

// The 'use' command and 'db' variable are provided by the MongoDB shell and don't need explicit declaration in the script.
// The script is intended to be run within the MongoDB shell environment.

use("photowalk")

// Create participants collection with validation
db.createCollection("participants", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "phone", "age", "registeredAt"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "must be a valid email and is required",
        },
        phone: {
          bsonType: "string",
          description: "must be a string and is required",
        },
        age: {
          bsonType: "int",
          minimum: 16,
          maximum: 80,
          description: "must be an integer between 16 and 80 and is required",
        },
        registeredAt: {
          bsonType: "string",
          description: "must be a string and is required",
        },
      },
    },
  },
})

// Create unique index on email
db.participants.createIndex({ email: 1 }, { unique: true })

// Create index on registeredAt for sorting
db.participants.createIndex({ registeredAt: -1 })

print("Database setup completed successfully!")
