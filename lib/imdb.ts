import { FilmCredit } from '@/types/imdb'

const OMDB_API_KEY = process.env.OMDB_API_KEY

// Your known film IDs from IMDb
const FILM_IDS = [
    
  'tt19862208', // No Place for Nonbelievers
  'tt21046746', // Priest
  'tt11357580', // Luz
  'tt6048582',  // The Falls: Covenant of Grace
  'tt7037366',  // The Mantis Room
  'tt6020356',  // Retro Hero
  'tt7079272',  // Losing Addison
  'tt10426974', // Judith
  'tt6397258',  // A New Promise
  'tt9855190',  // The Altruist
  /*

  'tt19862208': 'Assistant Camera', // No Place for Nonbelievers
    'tt21046746': 'Assistant Camera', // Priest
    'tt11357580': 'Key Grip', // Luz
    'tt6020356': 'Key Grip', // Retro Hero
    'tt7037366': 'Gaffer', // The Mantis Room
    'tt6048582': 'Digital Imaging Technician / Grip, Videotape Editor', // The Falls: Covenant of Grace
    'tt7079272': 'Assistant Digital Imaging Technician', // Losing Addison
    'tt10426974': 'Sound Recordist', // Judith
    'tt6397258': 'Sound Recordist', // A New Promise
    'tt9855190': 'Digital Imaging Technician', // The Altruist
    */
]

interface OMDBResponse {
  Title: string
  Year: string
  imdbRating: string
  Type: string
  Poster: string
}

interface OmdbSearchResult {
  title: string;
  year: string;
  imdbID: string;
  poster: string;
  type: string;
}

// Helper function to get high quality image URL
function getHighQualityPoster(posterUrl: string): string {
  // Convert URL from low quality to high quality
  // Example: 
  // From: https://m.media-amazon.com/images/M/MV5BMTgwNzA3MDQzOV5BMl5BanBnXkFtZTgwMzY2NTYxNzM@._V1_SX300.jpg
  // To:   https://m.media-amazon.com/images/M/MV5BMTgwNzA3MDQzOV5BMl5BanBnXkFtZTgwMzY2NTYxNzM@._V1_SX1000.jpg
  return posterUrl.replace('_V1_SX300', '_V1_SX1000')
}

export async function fetchIMDbCredits(): Promise<FilmCredit[]> {
  if (!OMDB_API_KEY) {
    throw new Error('OMDB API key is not configured')
  }

  try {
    const credits = await Promise.all(
      FILM_IDS.map(async (id) => {
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=${OMDB_API_KEY}`
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch data for film ${id}`)
        }

        const data: OMDBResponse = await response.json()
        console.log('Film data:', data)

        return {
          title: data.Title,
          year: parseInt(data.Year),
          role: getRoleForFilm(id),
          rating: data.imdbRating ? parseFloat(data.imdbRating) : undefined,
          isShort: data.Type === 'short',
          imageUrl: data.Poster !== 'N/A' ? getHighQualityPoster(data.Poster) : undefined
        }
      })
    )

    const sortedCredits = credits.sort((a, b) => b.year - a.year)
    console.log('Final credits:', sortedCredits)
    return sortedCredits
  } catch (error) {
    console.error('Error fetching IMDb credits:', error)
    throw error
  }
}

export async function searchOmdbByTitle(title: string): Promise<OmdbSearchResult[]> {
  if (!OMDB_API_KEY) {
    throw new Error('OMDB API key is not configured');
  }
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=${OMDB_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch OMDB search results');
  }
  const data = await response.json();
  if (data.Response === 'False') {
    return [];
  }
  return (data.Search || []).map((item: {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
    Type: string;
  }) => ({
    title: item.Title,
    year: item.Year,
    imdbID: item.imdbID,
    poster: item.Poster,
    type: item.Type,
  }));
}

function getRoleForFilm(filmId: string): string {
  const roleMap: Record<string, string> = {
    'tt19862208': 'Assistant Camera', // No Place for Nonbelievers
    'tt21046746': 'Assistant Camera', // Priest
    'tt11357580': 'Key Grip', // Luz
    'tt6020356': 'Key Grip', // Retro Hero
    'tt7037366': 'Gaffer', // The Mantis Room
    'tt6048582': 'Digital Imaging Technician / Grip, Videotape Editor', // The Falls: Covenant of Grace
    'tt7079272': 'Assistant Digital Imaging Technician', // Losing Addison
    'tt10426974': 'Sound Recordist', // Judith
    'tt6397258': 'Sound Recordist', // A New Promise
    'tt9855190': 'Digital Imaging Technician', // The Altruist
  }

  return roleMap[filmId] || 'Crew'
} 