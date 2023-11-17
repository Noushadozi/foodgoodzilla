import { FaAd, FaCalendar, FaHome, FaList, FaShoppingCart } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
    return (
        <div className="flex min-h-[100vh]">
            <div className="w-64 min-h-full bg-orange-400">
                <ul className="menu p-4">
                    <li>
                        <NavLink to="/dashboard/userHome"><FaHome></FaHome>User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/reservation"><FaCalendar></FaCalendar>Reservation</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart>My cart</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/review"><FaAd></FaAd>Add a review</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/bookings"><FaList></FaList>MY bookings</NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/order/salad"><FaHome></FaHome>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad"><VscThreeBars />Menu</NavLink>
                    </li>
                </ul>
            </div>
            <div className="flex-1 m-9">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;