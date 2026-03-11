import { Card, Button } from "flowbite-react";
import { Link } from "react-router-dom";

// menerima props item (data film/karakter) dan type ("film" atau "person")
export default function CardComp({ item, type }) {
    // menentukan judul: jika film ambil item.title, jika karakter ambil item.name
    const title = type === "film" ? item.title : item.name;
    // menentukan deskripsi: film punya sinopsis, karakter punya gender & age
    const description = type === "film" ? item.description : `Gender: ${item.gender}, Age: ${item.age}`;
    // menentukan link detail berdasarkan tipe
    const detailRoute = type === "film" ? `/films/${item.id}` : `/people/${item.id}`;

    const cardContent = (
        <div className="flex flex-col h-full">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                {title}
            </h5>
            <p className="font-normal text-sm text-gray-700 dark:text-gray-400 line-clamp-3 mb-4 mt-2 flex-grow">
                {description}
            </p>
            <Link to={detailRoute} className="mt-auto block">
                <Button size="sm" color="light" className="w-full">
                    Lihat Detail
                </Button>
            </Link>
        </div>
    );

    // jika tipe film, tampilkan card DENGAN gambar poster
    if (type === "film") {
        return (
            <Card className="max-w-sm h-full" imgAlt={title} imgSrc={item.image}>
                {cardContent}
            </Card>
        );
    } else {
        // jika tipe karakter, tampilkan card TANPA gambar (API tidak sediakan gambar untuk karakter)
        return (
            <Card className="max-w-sm h-full">
                {cardContent}
            </Card>
        );
    }
}
