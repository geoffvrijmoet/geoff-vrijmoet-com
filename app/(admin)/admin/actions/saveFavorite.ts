"use server";
import { clientPromise } from "@/lib/mongodb";
import { FavoriteDoc } from "@/lib/models/favorite";

interface SaveFavoriteInput {
  title: string;
  year: number;
  note: string;
  imdbID: string;
  poster: string;
  type: string;
}

export async function saveFavorite(input: SaveFavoriteInput) {
  const client = await clientPromise;
  const db = client.db();
  const doc: Omit<FavoriteDoc, "_id"> = {
    title: input.title,
    year: input.year,
    note: input.note,
    imdbID: input.imdbID,
    poster: input.poster,
    type: input.type,
  };
  const result = await db.collection("favorites").insertOne(doc);
  return { insertedId: result.insertedId.toString() };
} 