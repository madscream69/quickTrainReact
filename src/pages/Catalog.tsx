import {useGetMoviesQuery} from "../api/movieApi.ts";
// import {Link} from "react-router-dom";
import {useState} from "react";
import MovieTableVirtual from "../components/MovieTableVirtual.tsx";
import MovieListWindow from "../components/MovieListWindow.tsx";

function Catalog() {
    const [searchText, setSearchText] = useState('')
    const { data: movies = [], isLoading } = useGetMoviesQuery();
    const [filteredMovies, setFilteredMovies] = useState([])
    const [activeTab, setActiveTab] = useState<'list' | 'table'>('table');
    if (isLoading) return <h2>Загрузка 10 000 фильмов...</h2>;

    function filteredMoviesByYear(year:number) {
        return movies.filter((movie) => movie.year === year)
    }

    return (
        <div>
            <h1>Каталог фильмов ({movies.length} шт.)</h1>


            <label>
                Поиск по годам:
                <input value={searchText} onChange={(e) => {
                    setSearchText(e.target.value);
                    setFilteredMovies(filteredMoviesByYear(+e.target.value))
                }} />
            </label>

            {/* Табы */}
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => setActiveTab('table')}
                        style={{ fontWeight: activeTab === 'table' ? 'bold' : 'normal' }}>
                    Table View (TanStack Virtual)
                </button>
                <button onClick={() => setActiveTab('list')}
                        style={{ fontWeight: activeTab === 'list' ? 'bold' : 'normal' }}>
                    List View (будет React Window)
                </button>
            </div>

            {activeTab === 'table' && <MovieTableVirtual movies={filteredMovies.length === 0 ? movies : filteredMovies} />}
             {activeTab === 'list' && <MovieListWindow movies={movies} />}
        </div>
    );
}
// добавить реакт мема
export default Catalog;