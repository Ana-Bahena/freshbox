import { useState, useEffect } from "react";
import freshboxLogo from "../../img/Logo Fresh Box2.png";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { db, collection, getDocs } from "../fire/FirebaseConfig";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { IconContext } from "react-icons/lib";

export default function Reportes() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleHomeClick = () => {
        navigate("/admin-dashboard");
    };

    return (
        <div className="reportes-container">
            <header className="header">
                <img src={freshboxLogo} alt="FreshBox Logo" className="logo" />
                <div className="header-left">
                    <h1></h1>
                </div>
                <FaHome className="icon" onClick={handleHomeClick} />
            </header>
            <div className="chart-container">
                <h2>Datos en Tiempo Real en Contenedor</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={filteredData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis dataKey="fecha" stroke="#333" />
                        <YAxis stroke="#333" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="contenedor" stroke="#007bff" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
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
                    box-sizing: border-box;
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

                .filters {
                    display: flex;
                    gap: 20px;
                    margin: 20px 0;
                }

                .filters label {
                    font-size: 16px;
                    font-weight: bold;
                    color: #333;
                }

                .filters input {
                    margin-left: 10px;
                    padding: 5px;
                    font-size: 14px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
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
                `}
            </style>
        </div>
    );
}
