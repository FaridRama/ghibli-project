import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

export default function NavbarComp() {
    const location = useLocation();

    return (
        <Navbar fluid rounded className="bg-blue-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <NavbarBrand as={Link} to="/">
                <span className="self-center whitespace-nowrap text-xl font-bold text-blue-800 dark:text-blue-300">
                    Studio Ghibli
                </span>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
                <NavbarLink as={Link} to="/" active={location.pathname === "/"}>
                    Beranda
                </NavbarLink>
                <NavbarLink as={Link} to="/films" active={location.pathname === "/films"}>
                    Daftar Film
                </NavbarLink>
                <NavbarLink as={Link} to="/people" active={location.pathname === "/people"}>
                    Karakter
                </NavbarLink>
            </NavbarCollapse>
        </Navbar>
    );
}
