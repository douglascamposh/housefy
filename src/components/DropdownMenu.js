'use client';

import { MdExitToApp, MdChevronRight } from "react-icons/md";

const DropdownMenu = ({ handleLogout, tokenDataEmail }) => {
    return (
        <div className="relative group">
            <button className="text-black shadow px-4 py-2 hover:text-primary">{tokenDataEmail}</button>
            <div className="absolute hidden left-[-50px] group-hover:block bg-white shadow-lg ">
                <ul>
                    <li>
                        <button onClick={handleLogout} className="flex items-center w-full p-2 text-left text-sm gap-2 border border-primary hover:text-primary">
                            <div className="rounded-full p-1 bg-slate-400 flex items-center">
                                <MdExitToApp className="text-white" size={24} />
                            </div>
                            <span className="flex-grow" style={{ whiteSpace: 'nowrap' }}>Cerrar Sesión</span>
                            <MdChevronRight className="ml-3" size={24} />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DropdownMenu;