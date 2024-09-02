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

      console.log(userName);
    };
    userFetch();
  }, []);
  return (
    <>
      <header data-testid="header-component">
        <span>{!user ? 'Loading...' : user}</span>
        <NavLink to="/search">Search</NavLink>
        <NavLink to="/favorites">Favorites</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/profile/edit">Profile Edit</NavLink>
      </header>
    </>
  );
}

export default Header;
