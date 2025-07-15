"use server";
import { clientPromise } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function deleteFavorite(_id: string) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection("favorites").deleteOne({ _id: new ObjectId(_id) });
  return { success: result.deletedCount === 1 };
} 