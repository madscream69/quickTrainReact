import { useGetMoviesQuery } from '../api/movieApi.ts';
// import {Link} from "react-router-dom";
import { useMemo, useState } from 'react';
import MovieTableVirtual from '../components/MovieTableVirtual.tsx';
import MovieListWindow from '../components/MovieListWindow.tsx';

type Movie = {
    id: string;
    title: string;
    year: number;
    genre: string;
    rating: number;
};

function Catalog() {
    const [searchText, setSearchText] = useState('');
    const { data: movies = [], isLoading } = useGetMoviesQuery();
    //const [filteredMovies, setFilteredMovies] = useState<Movie[] | []>([]);
    const [activeTab, setActiveTab] = useState<'list' | 'table'>('table');
    if (isLoading) return <h2>Загрузка 10 000 фильмов...</h2>;

    // function filteredMoviesByYear(year: number) {
    //     return movies.filter((movie) => movie.year === year);
    // }

    const filteredMovies: Movie[] = useMemo(
        () =>
            searchText ? movies.filter((m) => m.year === +searchText) : movies,
        [movies, searchText],
    );

    return (
        <div>
            <h1>Каталог фильмов ({movies.length} шт.)</h1>

            <label>
                Поиск по годам:
                <input
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        // setFilteredMovies(
                        //     filteredMoviesByYear(+e.target.value),
                        // );
                    }}
                />
            </label>

            {/* Табы */}
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => setActiveTab('table')}
                    style={{
                        fontWeight: activeTab === 'table' ? 'bold' : 'normal',
                    }}
                >
                    Table View (TanStack Virtual)
                </button>
                <button
                    onClick={() => setActiveTab('list')}
                    style={{
                        fontWeight: activeTab === 'list' ? 'bold' : 'normal',
                    }}
                >
                    List View (будет React Window)
                </button>
            </div>

            {activeTab === 'table' && (
                <MovieTableVirtual movies={filteredMovies} />
            )}
            {activeTab === 'list' && (
                <MovieListWindow movies={filteredMovies} />
            )}
        </div>
    );
}
// добавить реакт мема
export default Catalog;
