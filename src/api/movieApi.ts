import { createApi } from '@reduxjs/toolkit/query/react';
import {fakeBaseQuery} from "@reduxjs/toolkit/query";
import {defaultKeyExtractor} from "@tanstack/react-virtual";

// Генерируем 10 000 фильмов один раз (для теста)
const generateMovies = () => {
    const movies = [];
    for (let i = 1; i <= 10000; i++) {
        movies.push({
            id: i.toString(),
            title: `Фильм №${i}`,
            year: 1990 + Math.floor(Math.random() * 35),
            genre: ['Action', 'Drama', 'Comedy', 'Sci-Fi'][Math.floor(Math.random() * 4)],
            rating: Number((5 + Math.random() * 5).toFixed(1)),
        });
    }
    return movies;
};
const moviesCache = generateMovies(); // сгенерировали один раз
export const movieApi = createApi({
    reducerPath: 'movieApi',           // важно для store
    baseQuery: fakeBaseQuery(), // пока локально
    endpoints: (builder) => ({
        getMovies: builder.query({
            queryFn: () => {
                return { data: moviesCache };
            },
        }),

        getMovieById: builder.query({
            queryFn: (id: string) => {
                const movie = moviesCache.find((m) => m.id === id);
                return { data: movie };
            },
        }),
        getMoviesByYear: builder.query({
            queryFn: (year: number) => {
                const movies = moviesCache.filter((m) => m.year === year);
                return { data: movies };
            },
        }),
    }),
});

export const { useGetMoviesQuery, useGetMovieByIdQuery, useGetMoviesByYearQuery } = movieApi;