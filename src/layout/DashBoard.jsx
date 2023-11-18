import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaShoppingCart, FaUser, FaUsers, FaUtensils, FaVoicemail } from "react-icons/fa";
import { VscThreeBars } from "react-icons/vsc";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
    const [isAdmin] = useAdmin();
    const [cart] = useCart();

    return (
        <div className="flex min-h-[100vh]">
            <div className="w-64 min-h-full bg-orange-400">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminHome"><FaHome></FaHome>Admin Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addItems"><FaUtensils></FaUtensils>Add Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageItems"><FaList></FaList>Manage Items</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageBookings"><FaBook></FaBook>Manage bookings</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/users"><FaUsers></FaUsers>All Users</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome"><FaHome></FaHome>User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation"><FaCalendar></FaCalendar>Reservation</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart>My cart<span className="text-[12px] font-bold">{cart.length}</span></NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review"><FaAd></FaAd>Add a review</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings"><FaList></FaList>MY bookings</NavLink>
                                </li>
                            </>
                    }
                    {/* {shared navlinks} */}
                    <div className="divider"></div>
                    <li>
                        <NavLink to="/order/salad"><FaHome></FaHome>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad"><VscThreeBars />Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact"><FaEnvelope></FaEnvelope>Contact</NavLink>
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