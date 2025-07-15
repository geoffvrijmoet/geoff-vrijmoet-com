"use server";
import { clientPromise } from "@/lib/mongodb";
import { toFavorite, Favorite, FavoriteDoc } from "@/lib/models/favorite";

export async function getFavorites(): Promise<Favorite[]> {
  const client = await clientPromise;
  const db = client.db();
  const docs = (await db.collection("favorites").find({}).sort({ year: -1 }).toArray()) as FavoriteDoc[];
  return docs.map(toFavorite);
} 