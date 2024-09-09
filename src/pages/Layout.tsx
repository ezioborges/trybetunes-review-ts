import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

import '../../styles/layout.css';

function Layout() {
    const location = useLocation();

    const hideHeader = location.pathname === '/';

    return (
        <div className="layout">
            {!hideHeader && <Header />}
            <Outlet />
        </div>
    )
};

export default Layout;
