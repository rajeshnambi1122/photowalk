import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const client = new MongoClient(uri)

export async function GET() {
  try {
    // Connect to MongoDB
    await client.connect()
    const db = client.db("photowalk")
    const collection = db.collection("participants")

    // Fetch all participants
    const participants = await collection.find({}).sort({ registeredAt: -1 }).toArray()

    return NextResponse.json(participants)
  } catch (error) {
    console.error("Fetch participants error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  } finally {
    await client.close()
  }
}
