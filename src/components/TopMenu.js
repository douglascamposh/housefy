import Link from "next/link";
import { useState, useEffect } from "react";
import { MdMenu, MdClose, MdExitToApp } from "react-icons/md";
import Button from "./common/Button";
import NavItem from "./NavBar/NavLink";
import HasPermission from "./permissions/HasPermission";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const TopMenu = () => {
  const router = useRouter();
  const tokenData = useSelector(state => state.rootReducer.userTokenData);
  const [menuIcon, setMenuIcon] = useState(false);
  const [tokenDataEmail, setTokenDataEmail] = useState(null);
  const [butttonEmailActivate, setButtonEmailActivate] = useState(false);

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

  const handleButtonEmailActivate = () => {
    setButtonEmailActivate(!butttonEmailActivate);
  }

  useEffect(() => {
    if (tokenData !== null) {
      const dataToken = JSON.parse(atob(tokenData.split('.')[1]));
      setTokenDataEmail(dataToken?.sub);
    }
  }, [tokenData]);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      const dataToken = JSON.parse(atob(token.split('.')[1]));
      setTokenDataEmail(dataToken?.sub);
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token');
    setTokenDataEmail(null);
    setButtonEmailActivate(false);
    router.push('/properties');
  }

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
          {tokenDataEmail ? (
            <div className="relative">
              <button onClick={handleButtonEmailActivate} className="flex items-center space-x-2">
                <span className="mr-2">{tokenDataEmail}</span>
              </button>
              {butttonEmailActivate && (
                <div className="absolute top-full left-0 mt-1 bg-white shadow-md  border-2 border-primary">
                  <ul className="flex flex-wrap">
                    <li className="whitespace-nowrap">
                      <button onClick={handleLogout} className="flex items-center space-x-1">
                        <span>cerrar sesión</span>
                        <MdExitToApp />
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex">
              <Link href="/login">
                <Button>Iniciar sesión</Button>
              </Link>
            </div>
          )}
        </div>

        <div
          onClick={handleSmallerScreensNavigation}
          className="flex md:hidden cursor-pointer"
        >
          {menuIcon ? <MdClose /> : <MdMenu />}
        </div>

        <div
          className={`md:hidden absolute top-[100px] mt-[-30px] right-0 left-0 flex justify-center opacity-90 items-center w-full h-screen bg-black text-white ease-in duration-200 ${menuIcon ? "" : "left-[100%]"
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
            {!tokenDataEmail && (
              <div className="flex flex-col justify-center items-center mt-16">
                <div className="flex">
                  <Link href="/login">
                    <Button>Iniciar sesión</Button>
                  </Link>
                </div>
              </div>)}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopMenu;
