import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

function Layout() {
    const location = useLocation();

    const hideHeader = location.pathname === '/';

    return (
        <div>
            {!hideHeader && <Header />}
            <Outlet />
        </div>
    )
};

export default Layout;
