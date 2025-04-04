import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import freshboxLogo from "../../img/Logo Fresh Box2.png";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    tipo: "",
    estatus: "",
    nombre: "",
    telefono: "",
    direccion: "",
    rfc: "",
    placas: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/usuarios");
      setUsers(response.data.usuarios);
    } catch (error) {
      console.error("Error al obtener los usuarios", error);
    }
  };

  const handleHomeClick = () => {
    navigate("/admin-dashboard"); 
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.us_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newUser.tipo !== "transportista") {
      alert("Solo puedes registrar transportistas.");
      return;
    }
  
    try {
      await axios.post("http://localhost:5001/register-transportista", newUser);
      fetchUsers();
      setNewUser({ email: "", password: "", tipo: "transportista", estatus: "", nombre: "", telefono: "", direccion: "", rfc: "", placas: "" });
    } catch (error) {
      console.error("Error al agregar transportista", error);
    }
  };

  return (
    <>
      <div className="container">
        <header className="header">
          <img src={freshboxLogo} alt="FreshBox Logo" className="logo" />
          <div className="header-left">
            <h1>Gestión de Usuarios</h1>
            <input 
              type="text" 
              placeholder="Buscar por email..." 
              value={searchTerm} 
              onChange={handleSearchChange} 
              className="search-input"
            />  
            <FaHome className="icon" onClick={handleHomeClick} />
          </div>
        </header>

        <div className="content-container">
          <div className="form-container">
            <h2>Agregar Transportista</h2>
            <br></br>
            <form onSubmit={handleSubmit}>
              <label>Email:</label>
              <input type="email" name="email" value={newUser.email} onChange={handleChange} required />

              <label>Tipo:</label>
              <select name="tipo" value={newUser.tipo} onChange={handleChange} required>
                <option value="">Selecciona un tipo</option>
                <option value="transportista">Transportista</option>
              </select>

              <label>Estatus:</label>
              <select name="estatus" value={newUser.estatus} onChange={handleChange} required>
                <option value="">Selecciona un estatus</option>
                <option value="activo">Activo</option>
              </select>

              <label>Nombre:</label>
              <input type="text" name="nombre" value={newUser.nombre} onChange={handleChange} required />

              <label>Teléfono:</label>
              <input type="tel" name="telefono" value={newUser.telefono} onChange={handleChange} />

              <label>Dirección:</label>
              <textarea name="direccion" value={newUser.direccion} onChange={handleChange}></textarea>

              <label>RFC:</label>
              <input type="text" name="rfc" value={newUser.rfc} onChange={handleChange} />

              <label>Placas:</label>
              <input type="text" name="placas" value={newUser.placas} onChange={handleChange} />

              <label>Password:</label>
              <input type="password" name="password" value={newUser.password} onChange={handleChange} required />

              <button type="submit">Agregar</button>
            </form>
          </div>

          <div className="table-container">
            <h2>Usuarios</h2>
            <br></br>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.us_id}>
                      <td>{user.us_id}</td>
                      <td>{user.us_email}</td>
                      <td>{user.us_tipo}</td>
                      <td>{user.us_estatus}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No se encontraron usuarios</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .container {
          padding: 20px;
          margin-top: 80px; 
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #007bff;
          color: white;
          padding: 18px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }

        .header-left {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 180px;
        }

        .icon {
          font-size: 44px;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .icon:hover {
          transform: scale(1.1);
        }

        .logo {
          height: 50px;
        }

        /* Contenedor principal para el layout */
        .content-container {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          flex: 1;
        }

        /* Formulario */
        .form-container {
          width: 40%;
          padding: 25px;
          background: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        form {
          display: flex;
          flex-direction: column;
        }

        label {
          font-weight: bold;
        }

        input, select, textarea {
          padding: 8px;
          margin: 5px 0;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          background-color: #28a745;
          color: white;
          padding: 10px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #218838;
        }

        /* Tabla de usuarios */
        .table-container {
          width: 88%;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
        }

        th {
          background-color: rgb(184, 176, 177);
          font-weight: bold;
        }

        tr:nth-child(even) {
          background-color:rgb(140, 192, 190);
        }

        tr:hover {
          background-color: rgb(243, 250, 177);
          transition: 0.3s;
        }
        .search-input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-left: 20px;
          width: 200px;
        }
      `}</style>
    </>
  );
};

export default Users;
