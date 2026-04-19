import { List, type RowComponentProps } from 'react-window';
import {Link} from "react-router-dom";

type Movie = {
    id: string;
    title: string;
    year: number;
    genre: string;
    rating: number;
};

type Props = {
    movies: Movie[];
};

function MovieListWindow({ movies }: Props) {
    const Row = ({ index, style, movies }: RowComponentProps<{ movies: Movie[] }>) => {
        const movie = movies[index];

        return (
            <div style={style}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 15px',
                        height: '100%',
                        borderBottom: '1px solid #eee',
                        gap: '20px',
                    }}
                >
                    <div style={{ width: 60 }}>{movie.id}</div>
                    <div style={{ flex: 1, fontWeight: 500 }}><Link to={`/movie/${movie.id}`}>{movie.title}</Link></div>
                    <div style={{ width: 80 }}>{movie.year}</div>
                    <div style={{ width: 100 }}>{movie.genre}</div>
                    <div
                        style={{
                            width: 60,
                            color: movie.rating > 7 ? 'green' : 'red',
                            fontWeight: 600,
                        }}
                    >
                        {movie.rating}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <List
            rowComponent={Row}
            rowCount={movies.length}
            rowHeight={60}           // высота строки
            rowProps={{ movies }}    // передаём данные
            style={{ height: '600px', width: '100%' }} // высота видимой области
        />
    );
}

export default MovieListWindow;