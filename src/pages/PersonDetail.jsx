import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner, Button } from "flowbite-react";
import { HiArrowLeft } from "react-icons/hi";

export default function PersonDetail() {
    // mengambil id karakter dari URL
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    // state tambahan untuk menyimpan daftar film yang dimainkan karakter ini
    const [films, setFilms] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getPersonDetail() {
        const url = `https://ghibliapi.vercel.app/people/${id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            // isi state person dengan data karakter dari API
            setPerson(result);

            // ambil data film yang dimainkan karakter ini
            // API mengembalikan result.films berupa array URL, misal: ["https://.../films/abc"]
            if (result.films && result.films.length > 0) {
                // fetch semua URL film secara paralel (bersamaan) menggunakan Promise.all
                const filmPromises = result.films.map(filmUrl => fetch(filmUrl).then(res => res.json()));
                const filmsData = await Promise.all(filmPromises);
                // simpan data film ke state
                setFilms(filmsData);
            }

            setLoading(false);
        } catch (error) {
            console.error(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        getPersonDetail();
    }, [id]);

    if (loading == true) {
        return (
            <div className="flex justify-center items-center mt-50 h-screen">
                <Spinner color="success" aria-label="Loading spinner" size="xl" />
                <span className="ml-3 text-lg text-gray-700">Memuat Detail Karakter...</span>
            </div>
        );
    }

    if (!person) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-2xl font-bold">Karakter tidak ditemukan.</h2>
                <Link to="/people">
                    <Button color="light" className="mt-4 mx-auto">Kembali ke Daftar Karakter</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-4 md:mx-15 my-8">
            <Link to="/people" className="inline-flex items-center text-blue-600 hover:underline mb-6">
                <HiArrowLeft className="mr-2" /> Kembali
            </Link>

            <div className="flex flex-col bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">

                <div className="w-full flex flex-col justify-start">

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-8 border-b pb-4">
                        {person.name}
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase">Jenis Kelamin</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{person.gender}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase">Usia</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{person.age}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase">Warna Mata</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{person.eye_color}</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold uppercase">Warna Rambut</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{person.hair_color}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">Tampil di Film</h3>
                        {films.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {films.map(film => (
                                    <Link to={`/films/${film.id}`} key={film.id}>
                                        <div className="px-4 py-3 bg-blue-50 hover:bg-blue-100 ring-1 ring-blue-200 text-blue-800 rounded-lg text-sm font-semibold transition-colors duration-200 shadow-sm cursor-pointer">
                                            {film.title}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic mb-4">Mencari data film terkait...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
