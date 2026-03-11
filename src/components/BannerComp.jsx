import { Banner, BannerCollapseButton } from "flowbite-react";
import { HiArrowRight, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function BannerComp() {
    return (
        <Banner>
            <div className="flex w-full flex-col justify-between border-b border-gray-200 bg-blue-100 p-4 md:flex-row dark:border-gray-600 dark:bg-gray-700 mb-8 rounded-lg shadow-sm">
                <div className="mb-4 md:mb-0 md:mr-4">
                    <h2 className="mb-1 text-lg font-bold text-blue-900 dark:text-white">
                        Selamat Datang di Portal Studio Ghibli
                    </h2>
                    <p className="flex items-center text-sm font-normal text-blue-700 dark:text-gray-400">
                        Jelajahi keajaiban dunia Studio Ghibli. Temukan daftar film ikonis, karakter yang tak terlupakan, serta lokasi dari mahakarya animasi legendaris Jepang.
                    </p>
                </div>
                <div className="flex shrink-0 items-center">
                    <Link
                        to="/films"
                        className="mr-2 inline-flex items-center justify-center rounded-lg bg-blue-700 px-3 py-2 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Mulai Jelajah
                        <HiArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <BannerCollapseButton
                        color="gray"
                        className="border-0 bg-transparent text-gray-500 dark:text-gray-400"
                    >
                        <HiX className="h-4 w-4" />
                    </BannerCollapseButton>
                </div>
            </div>
        </Banner>
    );
}
