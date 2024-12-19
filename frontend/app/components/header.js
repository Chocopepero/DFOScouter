"use client";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import SearchBar from './searchbar';

const Header = ({className}) => {
    const currentPath = usePathname();

    return (
        <div className='topbar flex justify-between items-center bg-blue-500'>
            <div className="text-xl text-left py-4 pl-4 w-1/3">
                DFO Scouter 
            </div>
            <div className='w-1/3' />
            <div className=' flex justify-end w-1/3 mr-4'>
            <SearchBar className="z-10"/>  
            </div>
        </div>
    );
};

export default Header;