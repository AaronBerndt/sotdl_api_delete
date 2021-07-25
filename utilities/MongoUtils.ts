import { MongoClient, ObjectID } from "mongodb";

let cachedDb = null;

const uri = process.env.MONGO_URI;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  const db = client.db("sotdl");

  cachedDb = db;
  return db;
}

export async function deleteFromCollection(collectionName: string, query: any) {
  try {
    if (uri === undefined) {
      throw "URI is undefined";
    }

    const database = await connectToDatabase();
    const collection = database.collection(collectionName);

    await collection.deleteOne(query);

    return { message: `Sucessfully deleted document from ${collection}` };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
