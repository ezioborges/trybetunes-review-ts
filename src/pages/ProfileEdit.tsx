import { useEffect, useState } from "react";
import { getUser, createUser } from "../services/userAPI";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { validateProfileEdit } from "../utils/validate";

import "../styles/profile-edit.css";

function ProfileEdit() {
  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string[]>([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    description: "",
  });
  const userInfos = async () => {
    const userLocalStorage = await getUser();

    setUser(userLocalStorage);
  };

  const changeInfos = async () => {
    setLoad(true);
    if (user) {
      const newInfos = {
        name: user.name,
        email: user.email,
        image: user.image,
        description: user.description,
      };

      await createUser(newInfos);
      setUser(newInfos);
      navigate("/profile");
    }

    await getUser();
    setLoad(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (valiteInputs()) {
      await changeInfos();
      resetForm();
    }
  };

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const resetForm = () => {
    setUser({
      name: "",
      email: "",
      image: "",
      description: "",
    });
  };

  const valiteInputs = () => {
    const errors = validateProfileEdit(user.name, user.email, user.description);

    setErrorMsg(errors);

    return errors.length === 0;
  };

  useEffect(() => {
    const getInfos = async () => {
      await userInfos();
      resetForm();
    };

    getInfos();
  }, []);

  if (load) return <Loading />;

  return (
    <div
      style={{ height: "93vh", border: "1px solid black" }}
      className="d-flex flex-column align-items-center"
    >
      <div className="my-5 p-3">
        <h1>Profile Edit Page</h1>
      </div>
      {!load && (
        <div className="row d-flex flex-column">
          <form onSubmit={handleSubmit} className="shadow-lg rounded">
            <div
              className="row d-flex flex-column p-5 form-edit"
            >
              <div className="col d-flex justify-content-center">
                <div className="col d-flex justify-content-end align-items-center px-4">
                  <label htmlFor="name">
                    <h4>Nome:</h4>
                  </label>
                </div>
                <div className="col-8 d-flex align-items-center">
                  <input
                    className="input-edit"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col d-flex justify-content-center">
                <div className="col d-flex justify-content-end align-items-center px-4">
                  <label htmlFor="email">
                    <h4>email:</h4>
                  </label>
                </div>
                <div className="col-8 d-flex align-items-center">
                  <input
                    className="input-edit"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col d-flex justify-content-center">
                <div className="col d-flex justify-content-end align-items-center px-4">
                  <label htmlFor="description">
                    <h4>Descrição:</h4>
                  </label>
                </div>
                <div className="col-8 d-flex align-items-center">
                  <textarea
                    className="input-edit"
                    name="description"
                    value={user.description}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col d-flex justify-content-center">
                <button className="btn btn-primary edit-button">Salvar</button>
              </div>
              <div
                className="col-4 d-flex  justify-content-center m-o"
                style={{ width: "50vw" }}
              >
                <ul>
                  {errorMsg &&
                    errorMsg.map((err) => (
                      <li key={err}>
                        <span className="text-danger">{err}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProfileEdit;
