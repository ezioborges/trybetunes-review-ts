import { useState } from "react";
import { createUser } from "../services/userAPI";
import { useNavigate } from "react-router-dom";
import { LoginType } from "../types";
import Loading from "../components/Loading";

import "../styles/login.css";

function Login({ errorMsg, isValidLogin }: LoginType) {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidLogin(login)) {
      setLoading(true);
      try {
        await createUser({ name: login });
        navigate("/search");
      } catch (error) {
        console.error("Error creating user ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  if (!loading) return <Loading />;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form
        onSubmit={handleSubmit}
        className={`d-flex 
        flex-column 
        justify-content-center
        align-items-center
        form-content shadow
        p-3
        mb-5
        bg-primary
        rounded`}
      >
        <div className="mb-3 d-flex flex-column align-items-center">
          <label htmlFor="email" className="form-label text-white">
            <h2>Nome:</h2>
          </label>
          <input
            className="form-control"
            name="email"
            aria-describedby="emailHelp"
            onChange={({ target }) => setLogin(target.value)}
          />
        </div>
        <button type="submit" className="btn btn-danger fw-bold">
          Entrar
        </button>
        <div>
          {errorMsg &&
            errorMsg.map((err) => (
              <div className="error-content p-2 mt-3 text-danger" key={err}>
                <p className="m-0">{err}</p>
              </div>
            ))}
        </div>
      </form>
    </div>
  );
}

export default Login;
