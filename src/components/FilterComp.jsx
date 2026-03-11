import { TextInput, Dropdown, DropdownItem } from "flowbite-react";
import { IoIosSearch } from "react-icons/io";

export default function FilterComp({ updateSearchValue, sortData, placeholder = "Cari..." }) {
    return (
        <div className="flex flex-col md:flex-row mb-6 gap-3">
            <div className="w-full md:w-1/2 lg:w-1/3">
                <TextInput
                    id="search"
                    type="text"
                    icon={IoIosSearch}
                    placeholder={placeholder}
                    onKeyUp={(e) => updateSearchValue(e.target.value)}
                />
            </div>
            <Dropdown
                label="Urutkan"
                color={"light"}
                className="w-48"
                dismissOnClick={true}
            >
                <DropdownItem onClick={() => sortData("alfabet a-z")}>Alfabet A-Z</DropdownItem>
                <DropdownItem onClick={() => sortData("alfabet z-a")}>Alfabet Z-A</DropdownItem>
            </Dropdown>
        </div>
    );
}
