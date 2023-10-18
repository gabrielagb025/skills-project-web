import { useAuthContext } from '../../../contexts/AuthContext';
import './Home.css'
import { NavLink, Navigate } from "react-router-dom";
import Logo from '../../../assets/logo-skillsync-letras.png';
import SkillSyncImage from '../../../assets/imagen-skillsync-01.png';

const Home = () => {

    const { user } = useAuthContext();

    return (
        user ? (
            <Navigate to="/user/profile" />
        ) : (
            <div className="home-margin">
            <div className="Home home-container container my-5">
                <img src={Logo} alt="" width={200} />
                <div className="row justify-content-around align-items-center">
                    <div className="col-md-6 text-cetner">
                        <h2 className="ms-3 mt-3">Bienvenido a <br /><span className="fw-bold">SkillSync.</span></h2>
                        <img className="mt-3 me-2 img-fluid d-none d-md-block" src={SkillSyncImage} alt="" width={600} />
                        <img className="mt-3 me-2 img-fluid d-md-none" src={SkillSyncImage} alt="" width={400} />
                    </div>

                    <div className="col-md-6 mt-4 home-buttons text-center">
                        <p className="text-center fw-bold">Conecta con otros usuarios, <br /> comparte tus conocimientos <br /> y adquiere nuevas perspectivas.</p>
                        <NavLink className="" to="/register"><button className="mt-3 btn register-btn">Registrarse</button></NavLink>
                        <p className="mt-4">¿Ya tienes una cuenta? - <NavLink to="/login" style={{ textDecoration: 'none' }}><span>Iniciar sesión</span></NavLink></p>
                    </div>
                </div>
            </div>
            </div>
        )

    )
}

export default Home;