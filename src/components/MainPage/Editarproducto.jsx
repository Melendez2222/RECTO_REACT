import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Listproductos from './Listproductos';
import './Home.css';

const Editarproducto = ({ product, onCancel,tokenr2 }) => {
    // const location = useLocation();
    // const { state } = location;
    // const product = state?.product;
    const handleEdit = async () => {
        const updatedProduct = {
            iD_PRODUCTO:product.iD_PRODUCTO,
            codigo: document.getElementById('codigo').value,
            nombre: document.getElementById('nombre').value,
            categoria_pro_id: document.getElementById('categoria').value,
            precio: document.getElementById('precio').value,
            stock: document.getElementById('stock').value,
            activo: document.getElementById('estado').value === '1' ? true : false
        };

        try {
            const response = await axios.put(`https://localhost:7270/PRODUCT/UpdateProduct?id=${product.iD_PRODUCTO}`, updatedProduct, {
                headers: {
                    'Authorization': `Bearer ${tokenr2}`
                  }
            });
            alert("Producto actualizado");
            onCancel();
        } catch (error) {
            alert('Error al actualizar el producto:', error);
        }
    };
    return (
        <div className="container-edit">
            <label>CODIGO:</label>
            <div className="input-field">
                <input
                    type="text"
                    id='codigo'
                    placeholder="CODIGO"
                    defaultValue={product ? product.codigo : ''}
                />
            </div>
            <label>NOMBRE:</label>
            <div className="input-field">
                <input
                    type="text"
                    id='nombre'
                    placeholder="NOMBRE"
                    defaultValue={product ? product.nombre : ''}
                />
            </div>
            <label>CATEGORIA:</label>
            <div className="input-field">
                <input
                    type="text"
                    id='categoria'
                    placeholder="CATEGORIA"
                    defaultValue={product ? product.categoria_pro_id : ''}
                />
            </div>
            <label>PRECIO:</label>
            <div className="input-field">
                <input
                    type="text"
                    id='precio'
                    placeholder="PRECIO"
                    defaultValue={product ? product.precio : ''}
                />
            </div>
            <label>STOCK:</label>
            <div className="input-field">
                <input
                    type="text"
                    id='stock'
                    placeholder="STOCK"
                    defaultValue={product ? product.stock : ''}
                />
            </div>
            <label>ESTADO:</label>
            <div className="input-field">
                <input
                    type="text"
                    id='estado'
                    placeholder="ESTADO"
                    defaultValue={product ? product.activo ? '1' : '0' : ''}
                />
            </div>
            <button type="button" className="btn btn-danger" onClick={onCancel}>Cancelar</button>
            <button type="button" className="btn btn-success" onClick={handleEdit}>
                EDITAR
            </button>
        </div>
    );
};

export default Editarproducto;