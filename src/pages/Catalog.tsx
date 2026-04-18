import {useGetMoviesQuery} from "../api/movieApi.ts";
// import {Link} from "react-router-dom";
import {useState} from "react";
import MovieTableVirtual from "../components/MovieTableVirtual.tsx";
import MovieListWindow from "../components/MovieListWindow.tsx";

function Catalog() {
    const { data: movies = [], isLoading } = useGetMoviesQuery();
    const [activeTab, setActiveTab] = useState<'list' | 'table'>('table');
    if (isLoading) return <h2>Загрузка 10 000 фильмов...</h2>;
    return (
        <div>
            <h1>Каталог фильмов ({movies.length} шт.)</h1>

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

            {activeTab === 'table' && <MovieTableVirtual movies={movies} />}
             {activeTab === 'list' && <MovieListWindow movies={movies} />}
        </div>
    );
}

export default Catalog;