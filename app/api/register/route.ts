import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const client = new MongoClient(uri)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, phone, age } = body

    if (!name || !email || !phone || !age) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Connect to MongoDB
    await client.connect()
    const db = client.db("photowalk")
    const collection = db.collection("participants")

    // Check if email already exists
    const existingParticipant = await collection.findOne({ email })
    if (existingParticipant) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Insert new participant
    const participant = {
      ...body,
      age: Number.parseInt(age),
      registeredAt: new Date(),
    }

    const result = await collection.insertOne(participant)

    return NextResponse.json(
      {
        message: "Registration successful",
        id: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  } finally {
    await client.close()
  }
}
