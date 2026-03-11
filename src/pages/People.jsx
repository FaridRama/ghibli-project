import CardList from "../components/CardList";
import FilterComp from "../components/FilterComp";
import PaginationComp from "../components/PaginationComp";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

export default function People() {
  const [people, setPeople] = useState([]);
  const [filteredPeople, setFilteredPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4; // ubah menjadi 4 agar mirip pembelajaran

  const onPagesChange = (page) => {
    setCurrentPage(page);
  };

  function updateSearchValue(value) {
    const filtered = people.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredPeople(filtered);
    setCurrentPage(1); // reset ke halaman 1
  }

  function sortPeople(type) {
    const newPeople = [...filteredPeople];
    if (type === "alfabet a-z") {
      newPeople.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "alfabet z-a") {
      newPeople.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredPeople(newPeople);
  }

  async function getPeople() {
    const url = "https://ghibliapi.vercel.app/people";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const result = await response.json();
      setPeople(result);
      setFilteredPeople(result);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getPeople();
  }, []);

  // Buat salinan array filteredPeople supaya bisa disort tanpa merusak data asli
  const sortedPeople = [...filteredPeople];

  // Hitung total halaman: jumlah data dibagi jumlah item per halaman, dibulatkan ke atas
  const totalPages = Math.ceil(sortedPeople.length / itemsPerPage);

  // Hitung index awal data untuk halaman saat ini
  // Misal currentPage = 1 → startIndex = 0, currentPage = 2 → startIndex = itemsPerPage
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Ambil sebagian data untuk halaman saat ini menggunakan slice
  // slice(start, end) → ambil dari index start sampai end-1
  const paginatedPeople = sortedPeople.slice(
    startIndex, // index pertama halaman
    startIndex + itemsPerPage, // index terakhir halaman + 1
  );

  if (loading) {
    return (
      <div className="block mx-auto mt-50 w-50">
        <Spinner color="success" aria-label="Loading spinner" />
        Sedang memuat data...
      </div>
    );
  }

  return (
    <div className="mx-15 my-5">
      <h1 className="font-bold text-2xl m-15">
        Daftar lengkap Karakter Ghibli
      </h1>

      <FilterComp
        updateSearchValue={updateSearchValue}
        sortData={sortPeople}
        placeholder="Cari nama karakter..."
      />

      <CardList data={paginatedPeople} type={"person"} />

      <PaginationComp
        currentPage={currentPage}
        onPageChange={onPagesChange}
        totalPages={totalPages}
      />
    </div>
  );
}
