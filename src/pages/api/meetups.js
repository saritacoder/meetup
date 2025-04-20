import { MongoClient, ObjectId } from "mongodb"

// Combined API handler for all meetup operations
async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://john:see1L$oc$@cluster0.vkrrcow.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0",
  )
  const db = client.db()
  const meetupsCollection = db.collection("meetups")

  // POST - Create new meetup
  if (req.method === "POST") {
    const data = req.body
    const result = await meetupsCollection.insertOne(data)
    client.close()
    res.status(201).json({ message: "Meetup inserted!", meetupId: result.insertedId })
  }
  // GET - Fetch all meetups or a specific meetup
  else if (req.method === "GET") {
    const { id } = req.query

    if (id) {
      // Get specific meetup
      const meetup = await meetupsCollection.findOne({ _id: new ObjectId(id) })
      client.close()
      res.status(200).json(meetup)
    } else {
      // Get all meetups
      const meetups = await meetupsCollection.find().toArray()
      client.close()
      res.status(200).json(meetups)
    }
  }
  // Default response for unsupported methods
  else {
    client.close()
    res.status(405).json({ message: "Method not allowed" })
  }
}

export default handler
