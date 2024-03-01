import Link from "next/link";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import Button from "./common/Button";
import NavItem from "./NavBar/NavLink";
import HasPermission from "./permissions/HasPermission";
const TopMenu = () => {
  const [menuIcon, setMenuIcon] = useState(false);

  const handleSmallerScreensNavigation = () => {
    setMenuIcon(!menuIcon);
  };

  const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/properties", label: "Propiedades" },
    // { href: "/users/saleman", label: "Vendedores" },
    { href: "/saleman", label: "Vendedores" },
    { href: "/compute", label: "Calcular Credito" },
    { href: "/settings", label: "Configuración" },
  ];

  return (
    <header className="bg-white w-full ease-in duration-300 fixed top-0 z-50 shadow-md py-2">
      <nav className="max-w-[1366px] mx-auto h-[60px] flex justify-between items-center p-4">
        <div>
          <Link href="/">
            <span className="font-extrabold text-3xl md:text-2xl xl:text-3xl uppercase cursor-pointer">
              Logo
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <ul className="hidden md:flex uppercase font-semibold ">
            {navItems.map(({ href, label }) => (
              
                <NavItem
                  key={href}
                  href={href}
                  onClick={handleSmallerScreensNavigation}
                >
                  {label}
                </NavItem>
              
            ))}
          </ul>

          <div className="hidden md:flex">
            <Link href="/login">
              <Button>Iniciar sesion</Button>
            </Link>
          </div>
        </div>

        <div
          onClick={handleSmallerScreensNavigation}
          className="flex md:hidden cursor-pointer"
        >
          {menuIcon ? <MdClose /> : <MdMenu />}
        </div>

        <div
          className={`md:hidden absolute top-[100px] mt-[-30px] right-0 left-0 flex justify-center opacity-90 items-center w-full h-screen bg-black text-white ease-in duration-200 ${
            menuIcon ? "" : "left-[100%]"
          }`}
        >
          <div className="w-full">
            <ul className="uppercase font-bold text-2xl flex flex-col items-center">
              {navItems.map(({ href, label }) => (
                <NavItem
                  key={href}
                  href={href}
                  onClick={handleSmallerScreensNavigation}
                >
                  {label}
                </NavItem>
              ))}
            </ul>
            <div className="flex flex-col justify-center items-center mt-16">
              <div className="flex">
                <Link href="/login">
                  <Button>Iniciar sesión</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopMenu;
