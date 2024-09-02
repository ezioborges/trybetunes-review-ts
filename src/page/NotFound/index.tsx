import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div>
            <h1>Página não encontrada</h1>
            <h2>Por favor retorne para a <Link to='/'>página</Link> e tente novamente</h2>
        </div>
    );
 };

export default NotFound;
