import { useState, useEffect } from "react";
import freshboxLogo from "../../img/Logo Fresh Box2.png";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { db, collection } from "../fire/FirebaseConfig";
import { getDocs, onSnapshot } from "firebase/firestore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Monitoreo() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "datos"), (snapshot) => {
            const newData = snapshot.docs.map(doc => ({
                id: doc.id,
                idContenedor: doc.data().idContenedor, 
                ...doc.data(),
                timestamp: new Date().toLocaleTimeString()
            }));
            setData(newData);
           // setData(prevData => [...prevData.slice(-10), newData]); // Solo guarda los últimos 10 datos
        });

        return () => unsubscribe(); 
    }, []);

    return (
        <div className="reportes-container">
            <header className="header">
                <img src={freshboxLogo} alt="FreshBox Logo" className="logo" />
                <div className="header-left">
                    <h1>Gráficas en Tiempo Real</h1>
                </div>
                <FaHome className="icon" onClick={() => navigate("/admin-dashboard")} />
            </header>

            <div className="chart-container">
                <h2>Datos en Tiempo Real en Contenedor</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" stroke="#333" />
                        <YAxis stroke="#333" />
                        <Tooltip 
                            formatter={(value, name, props) => [
                                `${value}`, `${name} - Contenedor: ${props.payload.idContenedor}`
                            ]} 
                        />
                        <Legend />
                        <Line type="monotone" dataKey="temperaturaActual" stroke="#ff7300" strokeWidth={3} dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="humedadActual" stroke="#007bff" strokeWidth={3} dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="vibracionActual" stroke="#28a745" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="contenedor-info">
                <h3>Lista de Contenedores</h3>
                <ul>
                    {data.map((item) => (
                        <li key={item.id}>
                            <strong>ID:</strong> {item.idContenedor} | <strong>Temperatura:</strong> {item.temperaturaActual}°C | <strong>Humedad:</strong> {item.humedadActual}%
                        </li>
                    ))}
                </ul>
            </div>

            <style>
                {`
                .reportes-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 140px;
                    background-color: #f5f5f5;
                    min-height: 100vh;
                }

                .header {
                    width: 100%;
                    height: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #007bff;
                    padding: 10px 20px;
                    color: white;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 1000;
                }

                .logo {
                    height: 70px;
                }

                .header-left {
                    flex-grow: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .icon {
                    cursor: pointer;
                    font-size: 60px;
                }

                .chart-container {
                    width: 90%;
                    max-width: 1000px;
                    background: white;
                    padding: 90px;
                    border-radius: 10px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    text-align: center;
                }

                .chart-container h2 {
                    margin-bottom: 20px;
                    color: #007bff;
                }

                .contenedor-info {
                    width: 90%;
                    max-width: 1000px;
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                    margin-top: 20px;
                }

                .contenedor-info h3 {
                    color: #007bff;
                    text-align: center;
                }

                .contenedor-info ul {
                    list-style-type: none;
                    padding: 0;
                }

                .contenedor-info li {
                    padding: 10px;
                    border-bottom: 1px solid #ddd;
                }
                `}
            </style>
        </div>
    );
}
