import CardList from "../components/CardList";
import FilterComp from "../components/FilterComp";
import PaginationComp from "../components/PaginationComp";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

export default function Films() {
    const [films, setFilms] = useState([]);
    const [filteredFilms, setFilteredFilms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 4;

    const onPagesChange = (page) => {
        setCurrentPage(page);
    };

    function updateSearchValue(value) {
        setSearch(value);
        const filtered = films.filter((film) =>
            film.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredFilms(filtered);
        setCurrentPage(1);
    }

    function sortFilm(type) {
        const newFilms = [...filteredFilms];
        if (type === "alfabet a-z") {
            newFilms.sort((a, b) => a.title.localeCompare(b.title));
        } else if (type === "alfabet z-a") {
            newFilms.sort((a, b) => b.title.localeCompare(a.title));
        }
        setFilteredFilms(newFilms);
    }

    async function getFilms() {
        const url = "https://ghibliapi.vercel.app/films";

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            setFilms(result);
            setFilteredFilms(result);
            setLoading(false);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getFilms();
    }, []);

    // --- Pagination dengan logika baru ---
    const sortedFilms = [...filteredFilms]; // bisa pakai ini kalau mau nanti disort lagi
    const totalPages = Math.ceil(sortedFilms.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedFilms = sortedFilms.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    if (loading) {
        return (
            <div className="block mx-auto mt-50 w-50">
                <Spinner color="info" aria-label="Loading spinner" />
                Sedang memuat data...
            </div>
        );
    }

    return (
        <div className="mx-15 my-5">
            <h1 className="font-bold text-2xl m-15">Daftar lengkap Film Ghibli</h1>

            <FilterComp
                updateSearchValue={updateSearchValue}
                sortData={sortFilm}
            />

            <CardList data={paginatedFilms} type={"film"} />

            <PaginationComp
                currentPage={currentPage}
                onPageChange={onPagesChange}
                totalPages={totalPages}
            />
        </div>
    );
}