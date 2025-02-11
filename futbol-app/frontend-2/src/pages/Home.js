import { useNavigate } from "react-router-dom";

const homeStyle = {
    position: "relative",
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
};

const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url('/assets/images/marangoni_cara_fondo.jpg')", // Carga la imagen desde public/
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    filter: "blur(8px)", // 🔹 Aplica desenfoque
};

const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 🔹 Overlay oscuro semitransparente
};

const contentStyle = {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    color: "white",
    padding: "2rem",
    borderRadius: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.75)", // 🔹 Caja oscura con transparencia
};

function Home() {
    const navigate = useNavigate();

    return (
        <div style={homeStyle}>
            {/* Imagen de fondo desenfocada */}
            <div style={backgroundStyle}></div>

            {/* Overlay oscuro */}
            <div style={overlayStyle}></div>

            {/* Contenido centrado */}
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div style={contentStyle}>
                    <h1 className="fw-bold text-white" style={{ textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)" }}>
                        Bienvenido a Futbolero ⚽
                    </h1>
                    <p>Organiza tus partidos con amigos fácilmente.</p>
                    <button className="btn btn-light btn-lg text-dark fw-bold"
                        onClick={() => navigate("/partidos")}>Ver Partidos</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
