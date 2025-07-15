"use server";
import { searchOmdbByTitle } from "@/lib/imdb";

export async function searchOmdb(query: string) {
  if (!query || query.trim().length < 2) return [];
  return await searchOmdbByTitle(query.trim());
} 