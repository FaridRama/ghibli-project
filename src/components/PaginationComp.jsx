import { Pagination } from "flowbite-react";

// menerima props: currentPage (halaman aktif), onPageChange (fungsi ganti halaman), totalPages (total halaman)
export default function PaginationComp({ currentPage, onPageChange, totalPages }) {
    // jika total halaman cuma 1, tidak perlu tampilkan pagination
    if (totalPages <= 1) return null;

    return (
        <div className="flex overflow-x-auto justify-center mt-10 mb-6">
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                // onPageChange: saat user klik nomor halaman, Flowbite otomatis panggil fungsi ini
                onPageChange={onPageChange}
                showIcons={true}
            />
        </div>
    );
}
