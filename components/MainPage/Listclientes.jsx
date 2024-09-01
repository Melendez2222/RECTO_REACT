import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Container, Box, TextField, Button, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

const Listclientes = ({ onEdit, tokenr2 }) => {
  // console.log(tokenr);
  const [showModal, setShowModal] = useState(false);
  const [newCliente, setNewCliente] = useState({ rucdni: '', razonSocial: '', direccion: '', correo: '', usuario: '', contraseña: '' });
  const [Clientes, setClientes] = useState([]);


  const fetchClientes = async () => {
    try {
      const response = await axios.get('https://localhost:7270/CLIENT/ClientAll', {
        headers: {
          'Authorization': `Bearer ${tokenr2}`
        }
      });
      setClientes(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchClientes();
  }, []);
  const history = useHistory();
  const handleCreateCli = async () => {
    const CreateClient = {
      rucdni: document.getElementById('rucdni').value,
      nombre: document.getElementById('nombre').value,
      direccion: document.getElementById('direccion').value,
      correo: document.getElementById('correo').value,
      usuario: document.getElementById('usuario').value,
      contraseña: document.getElementById('contraseña').value
    };

    try {
      const response = await axios.post(`https://localhost:7270/CLIENT/CreateClient`, CreateClient, {
        headers: {
          'Authorization': `Bearer ${tokenr2}`
        }
      });
      alert("Cliente registrado con exito!!!");
      fetchClientes();
      setShowModal(false);
    } catch (error) {
      alert('Error al registrar el cliente:', error);
    }
  };
  const handledeleteCli = async (client) => {
    console.log(client.iD_CLIENTE)
    try {
      const response = await axios.delete(`https://localhost:7270/CLIENT/DeleteClientid?id=${client.iD_CLIENTE}`, {
        headers: {
          'Authorization': `Bearer ${tokenr2}`
        }
      });
      if (response.status == 200) {
        alert("Cliente eliminado con exito!!!");
        fetchClientes();
      } else {
        alert('Error en la solicitud....');
      }
    } catch (error) {
      alert('Error al registrar el cliente:', error);
    }
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>
        Agregar Cliente
      </Button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">RUC/DNI</th>
            <th scope="col">NOMBRE</th>
            <th scope="col">DIRECCION</th>
            <th scope="col">CORREO</th>
            <th scope="col">ESTADO</th>
            <th scope="col">FECHA DE CREACION</th>
            <th scope="col">ACCION</th>
          </tr>
        </thead>
        <tbody>
          {Clientes.map((client, index) => (
            <tr key={client.iD_CLIENTE}>
              <th scope="row">{index + 1}</th>
              <td>{client.rucdni}</td>
              <td>{client.nombre}</td>
              <td>{client.direccion}</td>
              <td>{client.correo}</td>
              <td>{client.activo === true ? 'Activo' : 'Inactivo'}</td>
              <td>{client.fecha_Creacion}</td>
              <td>
                {/* <Link
                to="/Editarproducto"
                state={{ product }} 
              > */}
                <button type="button" className="btn btn-success" onClick={() => onEdit(client)}>
                  EDITAR
                </button>
                {/* </Link> */}
                <button type="button" className="btn btn-danger" onClick={()=>handledeleteCli(client)}>
                  ELIMINAR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para agregar cliente */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Agregar Cliente</DialogTitle>
        <DialogContent>
          <TextField
            label="RUC O DNI"
            id='rucdni'
            value={newCliente.ruc}
            onChange={(e) => setNewCliente({ ...newCliente, ruc: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nombre o Razon social"
            id='nombre'
            value={newCliente.razonSocial}
            onChange={(e) => setNewCliente({ ...newCliente, razonSocial: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Direccion"
            id='direccion'
            value={newCliente.direccion}
            onChange={(e) => setNewCliente({ ...newCliente, direccion: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Correo"
            id='correo'
            type="email"
            value={newCliente.correo}
            onChange={(e) => setNewCliente({ ...newCliente, correo: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Usuario"
            id='usuario'
            value={newCliente.usuario}
            onChange={(e) => setNewCliente({ ...newCliente, usuario: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contraseña"
            id='contraseña'
            value={newCliente.contraseña}
            onChange={(e) => setNewCliente({ ...newCliente, contraseña: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button onClick={handleCreateCli} variant="contained" color="primary">
            Agregar Cliente
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Listclientes