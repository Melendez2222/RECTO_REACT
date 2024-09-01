import '../Modal/Modal.css';
import React, { useState } from 'react';
import axios from 'axios';
const Modalprod=({ onClose,tokenr })=> {
    const [productDAta, setProducData] = useState({
        codigo: '',
        nombre: '',
        categoria_pro_id: '',
        precio: '',
        stock: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setProducData({
          ...productDAta,
          [name]: value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response=await axios.post('https://localhost:7270/PRODUCT/CreateProduct', productDAta, {
            headers: {
              'Authorization': `Bearer ${tokenr}`,
              'Content-Type': 'application/json'
            }
            
          });
          if (response.status==200) {
                alert('SE CREO EL PRODUCTO');
                onClose();
          }else{
            alert('error al crear el producto');
          }
        // console.log(productDAta);
           // Cierra el modal después de enviar el formulario
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
                <label htmlFor="codigo">CODIGO</label>
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  value={productDAta.codigo}
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
                  value={productDAta.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="categoria_pro_id">Categoria</label>
                <input
                  type="text"
                  id="categoria_pro_id"
                  name="categoria_pro_id"
                  value={productDAta.categoria_pro_id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input
                  type="text"
                  id="precio"
                  name="precio"
                  value={productDAta.precio}
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
                  checked={productDAta.activo}
                  onChange={() => setproductDAta({ ...productDAta, activo: !productDAta.activo })}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="text"
                  id="stock"
                  name="stock"
                  value={productDAta.stock}
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
export default Modalprod;