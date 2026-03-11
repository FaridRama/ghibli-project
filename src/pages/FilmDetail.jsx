import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner, Button } from "flowbite-react";
import { HiArrowLeft } from "react-icons/hi";

export default function FilmDetail() {
    const { id } = useParams(); 
    const [film, setFilm] = useState(null);
    // state untuk menyimpan daftar karakter yang berperan di film ini
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getFilmDetail() {
        const url = `https://ghibliapi.vercel.app/films/${id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            setFilm(result);

            // ambil data karakter yang berperan di film ini (berupa array URL)
            if (result.people && result.people.length > 0) {
                const peoplePromises = result.people.map(personUrl => fetch(personUrl).then(res => res.json()));
                const peopleData = await Promise.all(peoplePromises);
                setPeople(peopleData);
            }

            setLoading(false);
        } catch (error) {
            console.error(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        getFilmDetail();
    }, [id]);

    if (loading == true) {  
        return (
            <div className="flex justify-center items-center mt-50 h-screen">
                <Spinner color="info" aria-label="Loading spinner" size="xl" />
                <span className="ml-3 text-lg text-gray-700">Memuat Detail Film...</span>
            </div>
        );
    }

    if (!film) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold">Film tidak ditemukan.</h2>
                <Link to="/films">
                    <Button color="light" className="mt-4 mx-auto">Kembali ke Daftar Film</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-4 md:mx-15 my-8">
            <Link to="/films" className="inline-flex items-center text-blue-600 hover:underline mb-6">
                <HiArrowLeft className="mr-2" /> Kembali
            </Link>

            <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
                    <img
                        src={film.image}
                        alt={film.title}
                        className="w-full h-auto object-cover rounded-lg shadow-sm"
                    />
                </div>

                <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-start">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
                        {film.title}
                    </h1>
                    <h2 className="text-xl text-gray-500 dark:text-gray-400 mb-4 italic">
                        {film.original_title} ({film.original_title_romanised})
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase">Tahun Rilis</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{film.release_date}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase">Durasi</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{film.running_time} Menit</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase">Sutradara</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{film.director}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase">Produser</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{film.producer}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 border-b pb-2">Sinopsis</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-justify">
                            {film.description}
                        </p>
                    </div>

                    {/* daftar karakter yang berperan di film ini */}
                    <div className="mt-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">Karakter dalam Film</h3>
                        {people.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {people.map(person => (
                                    <Link to={`/people/${person.id}`} key={person.id}>
                                        <div className="px-4 py-3 bg-blue-50 hover:bg-blue-100 ring-1 ring-blue-200 text-blue-800 rounded-lg text-sm font-semibold transition-colors duration-200 shadow-sm cursor-pointer">
                                            {person.name}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">Mencari data karakter terkait...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
