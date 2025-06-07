export default function MovieCard({ item }) {
    return (
        <div className="card bg-base-100 w-96 shadow-sm py-8 rounded-2xl">
            <figure>
                <img src={item.Poster} alt="Shoes" className="w-70 rounded-2xl" />
            </figure>
            <div className="card-body flex justify-center items-center">
                <h2 className="card-title text-sm">
                    {item.Title} - {item.Year}
                </h2>
            </div>
        </div>
    );
}
