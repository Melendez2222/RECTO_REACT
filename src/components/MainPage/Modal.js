import '../Modal/Modal.css';
import React, { useState } from 'react';
import axios from 'axios';

const Modal = ({ onClose,tokenr }) => {
  const [clientData, setClientData] = useState({
    codigo: '',
    nombre: '',
    categoria_pro_id: '',
    precio: '',
    stock: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://localhost:7270/CLIENT/CreateClient', clientData, {
        headers: {
          'Authorization': `Bearer ${tokenr}`,
          'Content-Type': 'application/json'
        }
      });
      onClose(); // Cierra el modal después de enviar el formulario
      // Opcional: refresca la lista de clientes
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Crear Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rucdni">RUC/DNI</label>
            <input
              type="text"
              id="rucdni"
              name="rucdni"
              value={clientData.rucdni}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={clientData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="direccion">Dirección</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={clientData.direccion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={clientData.correo}
              onChange={handleChange}
              required
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="activo">Activo</label>
            <input
              type="checkbox"
              id="activo"
              name="activo"
              checked={clientData.activo}
              onChange={() => setClientData({ ...clientData, activo: !clientData.activo })}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="correo">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={clientData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={clientData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-guardar">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;