import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Container, Box, TextField, Button, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

const Listproductos = ({ onEdit, tokenr2 }) => {
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ codigo: '', nombre: '', categoria_pro_id: '', precio: '', stock: '' });
  const [productItems, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7270/PRODUCT/ListAll');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const history = useHistory();
  // const handleEditClick = (product) => {
  //   history.push({
  //     pathname: '/Editarproducto',
  //     state: { product }
  //   });
  // };
  const handleCreateProd = async () => {
    const CreateProduct = {
      codigo: document.getElementById('codigo').value,
      nombre: document.getElementById('nombre').value,
      categoria_pro_id: document.getElementById('categoria_pro_id').value,
      precio: document.getElementById('precio').value,
      stock: document.getElementById('stock').value
    };
    console.log(CreateProduct);
    try {
      const response = await axios.post(`https://localhost:7270/PRODUCT/CreateProduct`, CreateProduct, {
        headers: {
          'Authorization': `Bearer ${tokenr2}`
        }
      });
      alert("Producto registrado con exito!!!");
      fetchProducts();
      setShowModal(false);
    } catch (error) {
      alert('Error al registrar el producto:', error);
    }
  };
  const handleDeleteProd = async (product) => {
    try {
      const response = await axios.delete(`https://localhost:7270/PRODUCT/DeleteProductid?id=${product.iD_PRODUCTO}`, {
        headers: {
          'Authorization': `Bearer ${tokenr2}`
        }
      });
      if(response.status==200){
      alert("Producto eliminado con exito!!!");
      fetchProducts();
      }else{
        alert('Error en la solicitud....');
      }
    } catch (error) {
      alert('Error al eLIMINAR el producto:', error);
    }
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>
        Agregar Producto
      </Button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">CODIGO</th>
            <th scope="col">PRODUCTO</th>
            <th scope="col">CATEGORIA</th>
            <th scope="col">PRECIO</th>
            <th scope="col">STOCK</th>
            <th scope="col">ESTADO</th>
            <th scope="col">FECHA DE CREACION</th>
            <th scope="col">IMAGEN</th>
            <th scope="col">ACCION</th>
          </tr>
        </thead>
        <tbody>
          {productItems.map((product, index) => (
            <tr key={product.iD_PRODUCTO}>
              <th scope="row">{index + 1}</th>
              <td>{product.codigo}</td>
              <td>{product.nombre}</td>
              <td>{product.categoria_pro_id}</td>
              <td>{product.precio}</td>
              <td>{product.stock}</td>
              <td>{product.activo === true ? 'Activo' : 'Inactivo'}</td>
              <td>{product.fecha_Creacion}</td>
              <td>
                <img
                  src={`./images/product/${product.codigo}.jpg`}
                  alt={product.nombre}
                  style={{ width: '50px', height: '50px' }}
                />
              </td>
              <td>
                {/* <Link
                to="/Editarproducto"
                state={{ product }} 
              > */}
                {/* <button type="button" className="btn btn-success" onClick={() => handleEditClick(product)}> */}
                <button type="button" className="btn btn-success" onClick={() => onEdit(product)}>
                  EDITAR
                </button>
                {/* </Link> */}
                <button type="button" className="btn btn-danger" onClick={() => handleDeleteProd(product)}>
                  ELIMINAR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal para agregar cliente */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>Agregar Producto</DialogTitle>
        <DialogContent>
          <TextField
            label="CODIGO"
            id='codigo'
            value={newProduct.codigo}
            onChange={(e) => setNewProduct({ ...newProduct, codigo: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="NOMBRE"
            id='nombre'
            value={newProduct.nombre}
            onChange={(e) => setNewProduct({ ...newProduct, nombre: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CATEGORIA"
            id='categoria_pro_id'
            value={newProduct.categoria_pro_id}
            onChange={(e) => setNewProduct({ ...newProduct, categoria_pro_id: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="PRECIO"
            id='precio'
            type="text"
            value={newProduct.precio}
            onChange={(e) => setNewProduct({ ...newProduct, precio: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="STOCK"
            id='stock'
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Cancelar</Button>
          <Button onClick={handleCreateProd} variant="contained" color="primary">
            Agregar Producto
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Listproductos;