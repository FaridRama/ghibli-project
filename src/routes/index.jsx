import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Template from "../Template";
import Films from "../pages/Films";
import People from "../pages/People";
import FilmDetail from "../pages/FilmDetail";
import PersonDetail from "../pages/PersonDetail";

// variable yang menyimpan daftar routing, di export biar bisa dipake di file lain
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        // mengisi ke Outlet di template.jsx
        children: [
            {
                path: "/", // url path homepage
                element: <App />, // file yang akan di tampilkan
            },
            {
                path: "/films", // url path untuk lihat semua film
                element: <Films />,
            },
            {
                path: "/people", // url path untuk lihat semua karakter
                element: <People />,
            },
            {
                path: "/films/:id", // url path untuk lihat detail film
                element: <FilmDetail />,
            },
            {
                path: "/people/:id", // url path untuk lihat detail karakter
                element: <PersonDetail />,
            },
        ],
    },
]);
