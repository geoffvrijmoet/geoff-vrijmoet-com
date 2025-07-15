import { ObjectId } from "mongodb";

export interface Favorite {
  _id: string;
  title: string;
  year: number;
  note: string;
  imdbID: string;
  poster: string;
  type: string;
}

export interface FavoriteDoc {
  _id: ObjectId;
  title: string;
  year: number;
  note: string;
  imdbID: string;
  poster: string;
  type: string;
}

export function toFavorite(doc: FavoriteDoc): Favorite {
  return {
    _id: doc._id.toString(),
    title: doc.title,
    year: doc.year,
    note: doc.note,
    imdbID: doc.imdbID,
    poster: doc.poster,
    type: doc.type,
  };
} 