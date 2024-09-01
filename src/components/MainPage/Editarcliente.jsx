import React from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Editarcliente = ({ client, onCancel,tokenr2 }) => {
    // const location = useLocation();
    // const { state } = location;
    // const product = state?.product;
    const history = useHistory();
    console.log(tokenr2);
    const handleEdit = async () => {
        const updatedClient = {
            iD_CLIENTE:client.iD_CLIENTE,
            rucdni: document.getElementById('rucdni').value,
            nombre: document.getElementById('nombre').value,
            direccion: document.getElementById('direccion').value,
            correo: document.getElementById('correo').value,
            activo: document.getElementById('estado').value === '1' ? true : false
        };

        try {
            const response = await axios.put(`https://localhost:7270/CLIENT/UpdateClient?id=${client.iD_CLIENTE}`, updatedClient, {
                headers: {
                    'Authorization': `Bearer ${tokenr2}`
                  }
            });
            if (response.status==200){

                alert("Cliente actualizado");
                onCancel();
            }else{
                alert('Error al actualizar cliente...');
            }
            // onCancel();

        } catch (error) {
            alert('Error al actualizar el CLIENTE:', error);
        }
    };
  return (
    <div className="container-edit">
            <label>RUC O DNI:</label>
            <div className="input-field">
                <input
                    type="text"
                    id='rucdni'
                    placeholder="RUC O DNI"
                    defaultValue={client ? client.rucdni : ''}
                />
            </div>
            <label>NOMBRE:</label>
            <div className="input-field">
                <input
                    type="text"
                    id='nombre'
                    placeholder="NOMBRE"
                    defaultValue={client ? client.nombre : ''}
                />
            </div>
            <label>DIRECCION:</label>
            <div className="input-field">
                <input
                    type="text"
                    id='direccion'
                    placeholder="DIRECCION"
                    defaultValue={client ? client.direccion : ''}
                />
            </div>
            <label>CORREO:</label>
            <div className="input-field">
                <input
                    type="text"
                    id='correo'
                    placeholder="CORREO"
                    defaultValue={client ? client.correo : ''}
                />
            </div>
            <label>ESTADO:</label>
            <div className="input-field">
                <input
                    type="text"
                    id='estado'
                    placeholder="ESTADO"
                    defaultValue={client ? client.activo ? '1' : '0' : ''}
                />
            </div>
            <button type="button" className="btn btn-danger" onClick={onCancel}>Cancelar</button>
            <button type="button" className="btn btn-success" onClick={handleEdit}>
                EDITAR
            </button>
        </div>
  )
}

export default Editarcliente