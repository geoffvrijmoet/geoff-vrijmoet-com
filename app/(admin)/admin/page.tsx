"use client";
import { useState, useRef, useEffect } from "react";
import { searchOmdb } from "./actions/searchOmdb";
import { saveFavorite } from "./actions/saveFavorite";
import { getFavorites } from "./actions/getFavorites";
import { deleteFavorite } from "./actions/deleteFavorite";

interface OmdbResult {
  title: string;
  year: string;
  imdbID: string;
  poster: string;
  type: string;
}

interface Favorite {
  _id: string;
  title: string;
  year: number;
  note: string;
  imdbID: string;
  poster: string;
  type: string;
}

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<OmdbResult[]>([]);
  const [selected, setSelected] = useState<OmdbResult | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);
  const [favoritesError, setFavoritesError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Fetch favorites on mount and after save
  useEffect(() => {
    const fetchFavorites = async () => {
      setFavoritesLoading(true);
      setFavoritesError(null);
      try {
        const favs = await getFavorites();
        setFavorites(favs);
      } catch {
        setFavoritesError("Failed to load favorites. Please try again later.");
      } finally {
        setFavoritesLoading(false);
      }
    };
    fetchFavorites();
  }, [success]);

  // Debounced search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setSelected(null);
    setNote("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const res = await searchOmdb(value);
      setResults(res);
      setLoading(false);
    }, 400);
  };

  const handleSelect = (result: OmdbResult) => {
    setSelected(result);
    setSearch(result.title);
    setResults([]);
  };

  // Placeholder for save handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    try {
      await saveFavorite({
        title: selected.title,
        year: parseInt(selected.year),
        note,
        imdbID: selected.imdbID,
        poster: selected.poster,
        type: selected.type,
      });
      setSuccess(true);
      setSelected(null);
      setSearch("");
      setNote("");
      setTimeout(() => setSuccess(false), 2000);
    } catch {
      setSuccess(false);
      setFavoritesError("Failed to save favorite. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteLoading(id);
    setDeleteError(null);
    try {
      const res = await deleteFavorite(id);
      if (!res.success) {
        setDeleteError("Failed to delete favorite. Please try again.");
      } else {
        setFavorites((prev) => prev.filter((f) => f._id !== id));
      }
    } catch {
      setDeleteError("Failed to delete favorite. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin: Add Favorite</h1>
        <label className="block mb-2 font-medium">Search for a movie or show</label>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2 mb-2 focus:outline-none focus:ring"
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Start typing a title..."
        />
        {loading && <div className="text-sm text-gray-500 mb-2">Searching...</div>}
        {results.length > 0 && (
          <ul className="bg-white border border-gray-200 rounded shadow mb-4 max-h-64 overflow-y-auto">
            {results.map((r) => (
              <li
                key={r.imdbID}
                className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(r)}
              >
                <img
                  src={r.poster !== "N/A" ? r.poster : "/images/no-poster.png"}
                  alt={r.title}
                  className="w-10 h-14 object-cover rounded"
                />
                <div>
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs text-gray-500">{r.year} &middot; {r.type}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {selected && (
          <form onSubmit={handleSave} className="mt-6">
            <div className="flex gap-4 items-start mb-4">
              <img
                src={selected.poster !== "N/A" ? selected.poster : "/images/no-poster.png"}
                alt={selected.title}
                className="w-20 h-28 object-cover rounded shadow"
              />
              <div>
                <div className="font-semibold text-lg">{selected.title}</div>
                <div className="text-gray-500 text-sm mb-1">{selected.year} &middot; {selected.type}</div>
                <div className="text-xs text-blue-600 underline break-all">
                  <a href={`https://www.imdb.com/title/${selected.imdbID}/`} target="_blank" rel="noopener noreferrer">
                    IMDB: {selected.imdbID}
                  </a>
                </div>
              </div>
            </div>
            <label className="block mb-1 font-medium">Note</label>
            <textarea
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a personal note (optional)"
              rows={3}
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
              Save to Favorites
            </button>
            {success && (
              <div className="mt-3 text-green-600 text-center font-medium">Saved!</div>
            )}
          </form>
        )}
      </div>
      {/* Existing favorites list */}
      <div className="w-full max-w-xl mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Current Favorites</h2>
        {favoritesLoading && (
          <div className="text-blue-600 text-center mb-4 animate-pulse">Loading favorites...</div>
        )}
        {favoritesError && (
          <div className="text-red-600 text-center mb-4">{favoritesError}</div>
        )}
        {favorites.length === 0 && !favoritesLoading && !favoritesError && (
          <div className="text-gray-500 text-center">No favorites yet. Add one above!</div>
        )}
        <div className="grid gap-6 sm:grid-cols-2">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 border border-gray-100 hover:shadow-lg transition relative"
            >
              <button
                type="button"
                title="Delete"
                onClick={() => handleDelete(fav._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
                disabled={deleteLoading === fav._id}
              >
                {deleteLoading === fav._id ? (
                  <span className="animate-spin">🗑️</span>
                ) : (
                  <span role="img" aria-label="Delete">🗑️</span>
                )}
              </button>
              <div className="flex gap-4 items-start">
                <img
                  src={fav.poster && fav.poster !== "N/A" ? fav.poster : "/images/no-poster.png"}
                  alt={fav.title}
                  className="w-16 h-24 object-cover rounded shadow"
                />
                <div className="flex-1">
                  <div className="font-semibold">{fav.title}</div>
                  <div className="text-gray-500 text-sm mb-1">{fav.year} &middot; {fav.type}</div>
                  <a
                    href={`https://www.imdb.com/title/${fav.imdbID}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 underline mt-2 inline-block"
                  >
                    View on IMDB
                  </a>
                  {fav.note && <div className="text-xs text-gray-600 mt-2">Note: {fav.note}</div>}
                </div>
              </div>
              {deleteError && deleteLoading === null && (
                <div className="text-red-600 text-xs mt-2 text-center">{deleteError}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
