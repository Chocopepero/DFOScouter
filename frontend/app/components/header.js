"use client";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
    const currentPath = usePathname();

    return (
        <div className="topbar">
            <div className="text-xl text-center align-middle bg-blue-400 py-4 pr-4">
                DFO Scouter
            </div>
        </div>
    );
};

export default Header;