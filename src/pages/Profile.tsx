import { useEffect, useState } from "react";
import { getUser } from "../services/userAPI";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

import "../styles/profile.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();
  const [isLoad, setLoad] = useState(false);

  const userProfile = async () => {
    setLoad(true);
    const user = await getUser();

    setUser(user);
    setLoad(false);
    return;
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/profile/edit");
  };

  useEffect(() => {
    const userInfo = async () => {
      await userProfile();
    };

    userInfo();
  }, []);

  return (
    <div
      style={{ height: "94vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      {isLoad ? (
        <Loading />
      ) : (
        <>
          <form
            className="d-flex flex-column justify-content-between p-5 shadow-lg favorite-form rounded"
            onSubmit={handleSubmit}
          >
            <div className="row d-flex">
              <div className="col d-flex justify-content-end">
                <img
                  src={user?.image}
                  alt={`foto de perfil ${user?.name}`}
                  className="img-fluid"
                />
              </div>
              <div className="col d-flex justify-content-center">
                <button className="btn btn-primary">Editar Perfil</button>
              </div>
            </div>
            <div className="row">
              <div className="col-4 d-flex justify-content-end">
                <label htmlFor="name">
                  <h4>Nome:</h4>
                </label>
              </div>
              <div className="col">
                <input
                  className="input-content"
                  name="name"
                  value={user?.name}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4 d-flex justify-content-end">
                <label htmlFor="email">
                  <h4>Email: </h4>
                </label>
              </div>
              <div className="col">
                <input
                  className="input-content"
                  name="email"
                  value={user?.email}
                  disabled
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4 d-flex justify-content-end">
                <label htmlFor="description">
                  <h3>Descrição: </h3>
                </label>
              </div>
              <div className="col">
                <textarea
                  className="input-content"
                  name="description"
                  value={user?.description}
                  disabled
                />
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Profile;
