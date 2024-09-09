import { useEffect, useState } from "react";
import { getUser, createUser } from "../../services/userAPI";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { validateProfileEdit } from "../../utils/validate";

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
    const errors = validateProfileEdit(user.name, user.email, user.description)

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
    <div>
      {!load && (
        <>
          <h1>Profile Edit Page</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">
              Nome:
              <input name="name" value={user.name} onChange={handleChange} />
            </label>
            <label htmlFor="email">
              email:
              <input name="email" value={user.email} onChange={handleChange} />
            </label>
            <label htmlFor="description">
              Descrição:
              <textarea
                name="description"
                value={user.description}
                onChange={handleChange}
              />
            </label>
            <button>Salvar</button>
                  </form>
                  <div>
                      {
                          errorMsg && (
                              errorMsg.map((err) => (<p key={err}>{ err}</p>))
                          )
                      }
                  </div>
        </>
      )}
    </div>
  );
}

export default ProfileEdit;
