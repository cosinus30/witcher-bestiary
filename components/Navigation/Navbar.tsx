import Image from "next/image";
import Link from "next/link";
import NavbarItem from "./NavbarItem";

const Navbar = () => {
  return (
    <header className="mb-8 shadow-lg">
      <div className="flex justify-between items-center p-6">
        <Link href="/">
          <a className="font-cinzel text-3xl font-semibold text-white sm:text-4xl">Bestiary</a>
        </Link>
        <nav className="flex space-x-2">
          <NavbarItem
            label="Github"
            link="https://www.github.com/cosinus30/witcher-bestiary"
            logo={<Image src="/icons8-github.svg" height={30} width={30} alt="Github link" />}
          />
          <NavbarItem
            label="Figma"
            link="https://www.figma.com/file/9h2dYAYnF9tQOfxp9EO0GS/Witcher-3?node-id=3%3A226"
            logo={<Image src="/icons8-figma.svg" height={30} width={30} alt="Figma link"/>}
          />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
