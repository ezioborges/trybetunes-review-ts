import { useEffect, useState } from "react";
import { getUser } from "../services/userAPI";
import { NavLink } from "react-router-dom";

function Header() {
  const [user, setUser] = useState<string>("");
  useEffect(() => {
    const userFetch = async () => {
      const userName = await getUser();

      setUser(userName.name);
    };
    userFetch();
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-success-subtle">
        <div className="d-flex justify-content-evenly container-fluid">
          <div className="header-item px-4 py-1">
            <NavLink to="/">
              <span>
                {!user ? <img src="../../small-load-40.svg" /> : user}
              </span>
            </NavLink>
          </div>
          <div className="header-item px-4 py-1">
            <NavLink to="/search" data-testid="link-to-search">
              Search
            </NavLink>
          </div>
          <div className="header-item px-4 py-1">
            <NavLink to="/favorites" data-testid="link-to-favorites">
              Favorites
            </NavLink>
          </div>
          <div className="header-item px-4 py-1"> 
            <NavLink to="/profile" data-testid="link-to-profile">
              Profile
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
