import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/userAPI";

type LoginProp = {
  errorMsg: string[];
  isValidLogin: (name: string) => boolean;
};

function Login({ errorMsg, isValidLogin }: LoginProp) {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
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

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>TrybeTunes</h1>
      <div>
        <input
          type="text"
          data-testid="login-name-input"
          name="login"
          value={login}
          onChange={({ target }) => setLogin(target.value)}
        />
        <button data-testid="login-name-input" onClick={handleClick}>
          Enviar
        </button>
      </div>
      <div>
        {errorMsg && errorMsg.map((err: string) => <p key={err}>{err}</p>)}
      </div>
    </div>
  );
}

export default Login;
