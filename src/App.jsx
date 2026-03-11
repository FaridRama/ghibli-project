import BannerComp from "./components/BannerComp";
import CardList from "./components/CardList";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { Spinner } from "flowbite-react";

export default function App() {
  const [films, setFilms] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getFilms() {
    const url = "https://ghibliapi.vercel.app/films";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      // isi state films dengan 4 data pertama
      setFilms(result.slice(0, 4));
    } catch (error) {
      console.error(error.message);
    }
  }


  async function getPeople() {
    const url = "https://ghibliapi.vercel.app/people";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      // isi state people dengan 4 data pertama
      setPeople(result.slice(0, 4));
      // mengganti loading state jadi false untuk menghilangkan spinner
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false); // Pastikan loading selesai meskipun error
    }
  }

  // memanggil/menjalankan fetch API pas baru dibuka halamannya
  useEffect(() => {
    getFilms();
    getPeople();
  }, []);

  // jika loading true, return pake yang ini
  if (loading == true) {
    return (
      <div className="flex justify-center items-center mt-50 h-screen">
        <Spinner color="info" aria-label="Loading spinner" size="xl" />
        <span className="ml-3 text-lg text-gray-700">Sedang memuat data Ghibli...</span>
      </div>
    );
  }

  // jika loading false return pake yang ini
  return (
    <>
      <div className="mx-4 md:mx-15 my-5">
        <BannerComp />

        <CardList data={films} type={"film"}>
          <div className="flex justify-between items-center mt-8">
            <h1 className="text-2xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3">
              Film Populer
            </h1>
            <Link to="/films">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                Lihat Semua Film
              </Button>
            </Link>
          </div>
        </CardList>

        <CardList data={people} type={"person"}>
          <div className="flex justify-between items-center mt-12">
            <h1 className="text-2xl font-bold text-gray-900 border-l-4 border-emerald-600 pl-3">
              Karakter Utama
            </h1>
            <Link to="/people">
              <Button color="success" size="sm">
                Lihat Semua Karakter
              </Button>
            </Link>
          </div>
        </CardList>
      </div>
    </>
  );
}
