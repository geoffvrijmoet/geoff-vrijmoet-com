import { clientPromise } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

interface FavoriteDoc {
  _id: ObjectId;
  title: string;
  type: string;
  year: number;
  note: string;
}

export default async function FavoritesPage() {
  const client = await clientPromise;
  const db = client.db(); // default DB from URI
  const docs = (await db.collection<FavoriteDoc>("favorites").find({}).toArray()) as FavoriteDoc[];

  // Convert _id to string for React key usage
  const favorites = docs.map((d) => ({ ...d, _id: d._id.toString() }));

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">My Favorite Movies & TV Shows</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          A handpicked list of films and series I think are truly incredible.
        </p>
        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">No favorites found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {favorites.map((fav) => (
              <div
                key={fav._id}
                className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 border border-gray-100 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold">{fav.title}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="px-2 py-0.5 bg-gray-100 rounded-full font-medium">{fav.type}</span>
                  <span>{fav.year}</span>
                </div>
                <p className="text-gray-700 mt-2">{fav.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
