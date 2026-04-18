import { useGetMovieByIdQuery } from '../api/movieApi';
import { useParams } from "react-router-dom";

function MovieDetail() {
    const { id } = useParams<{ id: string }>();
    const { data: movie, isLoading } = useGetMovieByIdQuery(id!);

    if (isLoading) return <h2>Загрузка...</h2>;
    if (!movie) return <h2>Фильм не найден</h2>;

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>Год: {movie.year}</p>
            <p>Жанр: {movie.genre}</p>
            <p>Рейтинг: {movie.rating}</p>
        </div>
    );
}
export default MovieDetail;