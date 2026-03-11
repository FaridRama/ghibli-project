import { Outlet } from "react-router-dom";
import NavbarComp from "./components/NavbarComp";

export default function Template() {
    return (
        <>
            <NavbarComp />
            {/* menyediakan tempat dinamis, yang akan berubah2 == @yild */}
            <Outlet />
        </>
    );
}
