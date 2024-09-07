import { useEffect, useState } from "react";
import { getUser } from "../../services/userAPI";
import { User } from "../../types";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

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

  const handleClick = () => {
      navigate("/profile/edit");
  };

  useEffect(() => {
    const userInfo = async () => {
      await userProfile();
    };

    userInfo();
  }, []);

  return (
    <div>
      {isLoad ? (
        <Loading />
      ) : (
        <>
          <div>
            <img src={user?.image} alt={`foto de perfil ${user?.name}`} />
            <button onClick={handleClick}>Editar Perfil</button>
          </div>
          <div>
            <h3>Nome: </h3>
            <h4>{user?.name}</h4>
          </div>
          <div>
            <h3>Email: </h3>
            <h4>{user?.email}</h4>
          </div>
          <div>
            <h3>Descrição: </h3>
            <h4>{user?.description}</h4>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
