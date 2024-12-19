"use client";

import { useState } from 'react';
import Link from 'next/link';

const SearchBar = ({className}) => {
    const [searchChar, setSearchChar] = useState('');

    return (
            <form 
            onSubmit={(e) => {
                e.preventDefault();
            }}
            className = {className}
            >
                <input
                    type="text"
                    className="p-2 rounded-l-lg text-white shadow-md bg-neutral-500 focus:outline-none"
                    value={searchChar}
                    onChange={(e) => setSearchChar(e.target.value)}
                    placeholder="Search for a character" 
                    required />
                <Link href={`/c/${searchChar}`}>
                <button 
                type="submit"
                className="p-2 rounded-r-lg shadow-md bg-neutral-700 hover:bg-neutral-400"
                >Search</button>
                </Link>
            </form>
    )
};
export default SearchBar;