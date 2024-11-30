import { NavLink } from "react-router-dom";

export default function Header(){
    return (
        <>
            <header className="inline-flex justify-around items-center w-[100vw] h-[8vh] p-5 mb-3 shadow">
                <div className="logo">
                        Todo
                </div>
                <nav className="inline-flex items-center justify-center">
                    <ul className="inline-flex items-center justify-center gap-4">
                        <NavLink to={"/"}>All</NavLink>
                        <NavLink to={"completed"}>Completed</NavLink>
                        <NavLink to={"pending"}>Pending</NavLink>
                        <NavLink to={"me"}>Profile</NavLink>
                    </ul>
                </nav>
            </header>
        </>
    )
}