import { VercelRequest, VercelResponse } from "@vercel/node";
import { deleteFromCollection } from "../utilities/MongoUtils";
import { ObjectId } from "mongodb";
import microCors from "micro-cors";

const cors = microCors();

const handler = async (request: VercelRequest, response: VercelResponse) => {
  try {
    if (request.method === "OPTIONS") {
      return response.status(200).end();
    }

    const id: any = request.query._id;

    const data = await deleteFromCollection("characters", {
      _id: new ObjectId(id),
    });
    response.status(200).send(data);
  } catch (e) {
    console.log(e);
    response.status(504).send(e);
  }
};

export default cors(handler);
