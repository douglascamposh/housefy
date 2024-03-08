import Link from "next/link";
import { useState, useEffect, useRef} from "react";
import { MdMenu, MdClose, MdExitToApp, MdChevronRight } from "react-icons/md";
import Button from "./common/Button";
import NavItem from "./NavBar/NavLink";
import HasPermission from "./permissions/HasPermission";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const TopMenu = () => {
  const router = useRouter();
  const dropdownRef = useRef();
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
    const close = e => {
      if (!dropdownRef.current.contains(e.target)) {
        setButtonEmailActivate(false);
      }
    }
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

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
    <header ref={dropdownRef} className="bg-white w-full ease-in duration-300 fixed top-0 z-50 shadow-md py-2">
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
            <div className="relative hidden md:flex">
              <button className="py-2 px-4 rounded bg-white shadow text-sm" onClick={handleButtonEmailActivate}>
                <span>{tokenDataEmail}</span>
              </button>
              {butttonEmailActivate && (
                <div className="absolute left-[-160px] mt-14 w-72 bg-white shadow-lg rounded-md border-gray-700 border-2 dropdown-content">
                  <ul className="p-3">
                    <li>
                      <button onClick={handleLogout} className="flex items-center w-full p-2 text-left text-sm gap-4 hover:bg-slate-100">
                        <div className="rounded-full p-1 bg-slate-400">
                          <MdExitToApp className="text-white" size={24} />
                        </div>
                        <span>Cerrar Sesión</span>
                        <MdChevronRight className="ml-10" size={24} />
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
            <div className="md:hidden flex flex-col items-center p-2  rounded-md">
                {tokenDataEmail ? (
                       <button><span className="text-2x1">{tokenDataEmail}</span></button>
                        ) : (
                       <Link href="/login">
                         <Button>Iniciar sesión</Button>
                     </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopMenu;
