"use client";
const SideBar = () => {
    return (
        <div className="sidebar">
            <div className=" h-screen bg-neutral-900 text-white p-4">
                <ul className="space-y-4">
                    <li>
                        <a href="#" className="hover:text-blue-400">Character</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-400">Explorer Club</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-400">Group</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-400">Ranking</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-400">How To Use</a>
                    </li>
                </ul>
            </div>
        </div>

    );
};

export default SideBar;