export interface Itrending {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: 328
}
export interface Idetails {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: any;
    budget: number;
    genres: { id: number, name: string }[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: any;
    production_countries: any
    release_date: string;
    revenue: number;
    runtime: number;
    title: string;
    status: string;
    tagline: string;
    spoken_languages: { english_name: string, iso_639_1: string, name: string }[];
    video: boolean;
    vote_average: number;
    vote_count: 328
}