import {useRef} from "react";
import {useVirtualizer} from "@tanstack/react-virtual";


type Movie = {
    id: string,
    title: string,
    year: number,
    genre: string,
    rating: number
}
type Props = {
    movies: Movie[]
}
function MovieTableVirtual({movies}:Props) {
    const parentRef = useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: movies.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 50,
        overscan: 5,
    })
    return (
        <div>
            <div
                ref={parentRef}
                style={{
                    height: `600px`,
                    overflow: 'auto', // Make it scroll!
                }}
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {/* Only the visible items in the virtualizer, manually positioned to be in view */}
                    {rowVirtualizer.getVirtualItems().map((virtualItem) => {
                        const movie = movies[virtualItem.index];
                        return (
                            <div
                                key={virtualItem.key}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${virtualItem.size}px`,
                                    transform: `translateY(${virtualItem.start}px)`,
                                }}
                            >
                                <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 100px 100px 80px', borderBottom: '1px solid #ccc' }}>
                                    <div>{movie.id}</div>
                                    <div>{movie.title}</div>
                                    <div>{movie.year}</div>
                                    <div>{movie.genre}</div>
                                    <div>{movie.rating}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default MovieTableVirtual;