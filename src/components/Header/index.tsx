import { useEffect, useState } from "react";
import { getUser } from "../../services/userAPI";
import { NavLink } from "react-router-dom";

import './header.css';

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
      <header data-testid="header-component">
        <span>{!user ? 'Loading...' : user}</span>
        <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
      </header>
    </>
  );
}

export default Header;
