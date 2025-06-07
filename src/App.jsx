import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "./components/MovieCard";

function App() {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("naruto");
    const [sortOrder, setSortOrder] = useState("asc");

    const fetchDataMovies = async () => {
        try {
            const response = await axios.get(`http://www.omdbapi.com/?apikey=2b0f4c80&type=movie&s=${search}`);
            console.log(response.data.Search);
            setMovies(response.data.Search);
        } catch (error) {
            console.log(error);
        }
    };

    const sortedMovies = [...(movies || [])].sort((a, b) => {
        const yearA = parseInt(a.Year);
        const yearB = parseInt(b.Year);

        return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
    });

    useEffect(() => {
        fetchDataMovies();
    }, []);

    return (
        <>
            <nav>
                <div className="navbar bg-base-100 shadow-sm">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">Technical test Haltev</a>
                    </div>
                    <div className="flex-none">
                        <button className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-5 w-5 stroke-current"
                            >
                                {" "}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                ></path>{" "}
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            <section id="search" className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 py-8 px-4">
                <div className="w-full md:flex-1">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            fetchDataMovies();
                        }}
                        className="flex flex-col sm:flex-row gap-2"
                    >
                        <input
                            type="text"
                            placeholder="Type here"
                            className="input w-full"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <input type="submit" value="Search" className="btn btn-primary w-full sm:w-auto" />
                    </form>
                </div>
                <div className="w-full md:flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
                    <label className="font-bold">Sort by Year:</label>
                    <select
                        className="select select-bordered w-full sm:w-auto"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </section>

            <section id="card-movie" className="flex justify-center py-8">
                <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-8">
                    {sortedMovies.map((item, idx) => (
                        <MovieCard key={idx + 1} item={item} />
                    ))}
                </div>
            </section>
            <section id="footer">
                <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10 flex flex-col justify-center items-center">
                    <nav className="">
                        <div className="text-center text-sm bg-neutral text-neutral-content p-4">
                            &copy; {new Date().getFullYear()} MovieApp. All rights reserved.
                        </div>
                    </nav>
                </footer>
            </section>
        </>
    );
}

export default App;
