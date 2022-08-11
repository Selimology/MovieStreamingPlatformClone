// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

// Define a service using a base URL and expected endpoints
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/' }),
  endpoints: (builder) => ({
    // Get genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    getMovies: builder.query({
      query: ({ categoryName, page }) => {
        // popular, top_rated, and upcoming are string
        // genres are number

        if (categoryName && typeof categoryName === 'string') {
          return `movie/${categoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        if (categoryName && typeof categoryName === 'number') {
          return `discover/movie?api_key=${tmdbApiKey}&page=${page}&with_genres=${categoryName}`;
        }

        //  Get popular movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
  }),
});

// hook is created since query is created with createApi
// format is {use} + service name + endpoint name
export const { useGetMoviesQuery, useGetGenresQuery } = tmdbApi;
