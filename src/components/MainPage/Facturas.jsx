import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

function Facturacion({ productItems, CartItem, addToCart, tokenr2, iduser2 }) {
  const [facturaid, setFacturaId] = useState([]);
  const [facturaNum, setFacturaNum] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState({});
  const [clientes, setClientes] = useState([]);
  const [producto, setProductos] = useState([]);


  const fetchClientes = async () => {
    try {
      const response1 = await axios.get('https://localhost:7270/RECEIPT/LastFactura', {
        headers: {
          'Authorization': `Bearer ${tokenr2}`
        }
      });
      const data = await response1.data;
      setFacturaId(data.ultimaFacturaId);
      setFacturaNum(data.ultimoCodFact);
      const response2 = await axios.get('https://localhost:7270/CLIENT/ClientAll', {
        headers: {
          'Authorization': `Bearer ${tokenr2}`
        }
      });
      setClientes(response2.data);
      const response3 = await axios.get('https://localhost:7270/PRODUCT/ListAll');
      setProductos(response3.data);

    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };
  useEffect(() => {
    fetchClientes();
  }, [tokenr2]);
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
      alert("Cliente Registrado");
      fetchClientes();
      setShowModal(false);
    } catch (error) {
      alert('Error al actualizar el producto:', error);
    }
  };
  const [showModal, setShowModal] = useState(false);
  const [newCliente, setNewCliente] = useState({ rucdni: '', razonSocial: '', direccion: '', correo: '', usuario: '', contraseña: '' });
  const [factura, setFactura] = useState({
    idFactura: '',
    numeroFactura: '',
    idCliente: '',
    subtotal: 0,
    porcentajeIGV: 18,
    igv: 0,
    total: 0,
    items: [] // Array de items de la factura
  });

  const handleCreateFACT = async () => {
    const CreateFactura = {
      cliente_id: clienteSeleccionado.iD_CLIENTE,
      personal_id: iduser2,
      subtotal: document.getElementById('subtotalfactura').value,
      porcentaje_IGV: document.getElementById('igvpercent').value
    };
    try {
      const response = await axios.post(`https://localhost:7270/RECEIPT/CreateFactura`,CreateFactura ,{
        headers: {
          'Authorization': `Bearer ${tokenr2}`
        }
      });
      if (response.status == 200) {
        alert('Factura registrada!!');
        for (const item of factura.items) {
          const productoSeleccionado = producto.find((p) => p.nombre === item.producto);
          const detalleFactura = {
            factura_id: facturaid,
            producto_id: productoSeleccionado?.iD_PRODUCTO,
            cantidad: item.cantidad,
          };
          const response22 = await axios.post(`https://localhost:7270/INVOICE_DETAIL/CreateDetalleFactura`,detalleFactura ,{
            headers: {
              'Authorization': `Bearer ${tokenr2}`
            },
          });
          if(response22==200){
            alert('Producto detalle confirmado..!!!');
          }
          console.log(detalleFactura);
        }
        alert('Se termino de registrar el detalle factura...')
      } else {
        alert('Error al registrar factura.');
      }
    } catch {

    }
};

// const handleAddFactura = () => {
//   const newFactura = {
//     ...factura,
//     idFactura: factura.length + 1,
//     igv: factura.subtotal * (factura.porcentajeIGV / 100),
//     total: factura.subtotal + factura.subtotal * (factura.porcentajeIGV / 100),
//   };
//   setFactura([...factura, newFactura]);
//   setFactura({ ...factura, items: [], subtotal: 0, igv: 0, total: 0 });
// };

// const handleAddCliente = () => {

//   setClientes([...clientes, { ...newCliente, id: clientes.length + 1 }]);
//   setNewCliente({ ruc: '', razonSocial: '', correo: '' });
//   setShowModal(false);
// };

const handleAddItem = () => {
  setFactura({
    ...factura,
    items: [...factura.items, { id: factura.items.length + 1, producto: '', cantidad: 1, precio: 0, subtotal: 0 }],
  });
};

const handleProductoChange = (index, value) => {
  const productoSeleccionado = producto.find((p) => p.iD_PRODUCTO === value);
  if (!productoSeleccionado) return; // Asegura de que el producto exista

  // Crear una copia de los items actualizando el producto seleccionado
  const updatedItems = [...factura.items];
  updatedItems[index] = {
    ...updatedItems[index],
    producto: productoSeleccionado.nombre,
    precio: productoSeleccionado.precio,
    subtotal: updatedItems[index].cantidad * productoSeleccionado.precio,
  };

  // Calcular subtotal y convertir a número para evitar problemas de concatenación
  const subtotallist = Number(calcularSubtotal(updatedItems));
  const igvv = subtotallist * (factura.porcentajeIGV / 100);
  const totals = subtotallist + igvv;

  // Actualizar el estado de la factura asegurando que los valores sean numéricos
  setFactura({
    ...factura,
    items: updatedItems,
    subtotal: subtotallist.toFixed(2), // Convertir a string solo para la presentación
    igv: igvv.toFixed(2),
    total: totals.toFixed(2), // Convertir a string solo para la presentación
  });
};


const handleCantidadChange = (index, increment) => {
  const updatedItems = [...factura.items];
  updatedItems[index].cantidad += increment;
  if (updatedItems[index].cantidad < 1) updatedItems[index].cantidad = 1;
  updatedItems[index].subtotal = updatedItems[index].cantidad * updatedItems[index].precio;
  const subtotallist = Number(calcularSubtotal(updatedItems));
  const igvv = subtotallist * (factura.porcentajeIGV / 100);
  const totals = subtotallist + igvv;
  setFactura({
    ...factura, items: updatedItems, subtotal: subtotallist, igv: igvv.toFixed(2),
    total: totals.toFixed(2),
  });
};
const handleClienteChange = (e) => {
  const idCliente = e.target.value;
  setFactura((prevFactura) => ({
    ...prevFactura,
    idCliente
  }));

  const cliente = clientes.find((c) => c.iD_CLIENTE === idCliente);
  setClienteSeleccionado(cliente || {});
};

const handleEliminarItem = (index) => {
  const updatedItems = factura.items.filter((_, i) => i !== index);
  const subtotallist = Number(calcularSubtotal(updatedItems));
  const igvv = subtotallist * (factura.porcentajeIGV / 100);
  const totals = subtotallist + igvv;
  setFactura({ ...factura, items: updatedItems, subtotal: subtotallist, igv: igvv.toFixed(2), total: totals.toFixed(2), });
};

const calcularSubtotal = (items) => {
  return items.reduce((total, item) => total + item.subtotal, 0).toFixed(2);
};

return (
  <Container>
    <h1>Emisión de Facturas</h1>
    <form>
      {/* Formulario principal */}
      <TextField
        label="IdFactura"
        value={facturaid}
        InputProps={{ readOnly: true }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Número de Factura"
        value={facturaNum}
        InputProps={{ readOnly: true }}
        fullWidth
        margin="normal"
      />

      <Select
        label="Cliente"
        value={factura.idCliente}
        onChange={handleClienteChange}
        fullWidth
        displayEmpty
        margin="normal"
      >
        <MenuItem value="">
          <em>Seleccione un cliente</em>
        </MenuItem>
        {clientes.map((cliente) => (
          <MenuItem key={cliente.iD_CLIENTE} value={cliente.iD_CLIENTE}>
            {cliente.nombre}
          </MenuItem>
        ))}
      </Select>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField id="outlined-basic" label="RUC O DNI" value={clienteSeleccionado.rucdni || ''} variant="outlined" margin="normal" InputProps={{ readOnly: true }} sx={{ input: { color: 'black' } }} />
        <TextField id="outlined-basic" label="RAZON SOCIAL O NOMBRE" value={clienteSeleccionado.nombre || ''} variant="outlined" margin="normal" InputProps={{ readOnly: true }} sx={{ input: { color: 'black' } }} />
        <TextField id="outlined-basic" label="CORREO" value={clienteSeleccionado.correo || ''} variant="outlined" margin="normal" InputProps={{ readOnly: true }} sx={{ input: { color: 'black' } }} />
      </Box>
      <Button variant="contained" color="primary" onClick={() => setShowModal(true)}>
        Agregar Cliente
      </Button>
      <Button variant="contained" color="secondary" onClick={handleAddItem} className="mt-2">
        Agregar Producto
      </Button>

      {/* Tabla de detalles de factura */}
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {factura.items.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Select
                    value={producto.find((p) => p.nombre === item.producto)?.iD_PRODUCTO || ''}
                    onChange={(e) => handleProductoChange(index, e.target.value)}
                    displayEmpty
                    fullWidth
                  >
                    <MenuItem value="">
                      <em>Seleccione un producto</em>
                    </MenuItem>
                    {producto.map((producto) => (
                      <MenuItem key={producto.iD_PRODUCTO} value={producto.iD_PRODUCTO}>
                        {producto.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleCantidadChange(index, -1)}>
                    <Remove />
                  </IconButton>
                  {item.cantidad}
                  <IconButton onClick={() => handleCantidadChange(index, 1)}>
                    <Add />
                  </IconButton>
                </TableCell>
                <TableCell>{item.precio.toFixed(2)}</TableCell>
                <TableCell>{item.subtotal.toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton color="error" onClick={() => handleEliminarItem(index)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Totales */}
      <TextField
        label="Subtotal"
        type="number"
        id='subtotalfactura'
        value={factura.subtotal}
        InputProps={{ readOnly: true }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Porcentaje de IGV"
        id='igvpercent'
        value={factura.porcentajeIGV}
        InputProps={{ readOnly: true }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="IGV"
        id='igvfactura'
        value={factura.igv}
        InputProps={{ readOnly: true }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Total"
        id='totalfactura'
        value={factura.total}
        InputProps={{ readOnly: true }}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCreateFACT} fullWidth>
        Crear Factura
      </Button>
    </form>

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
  </Container>
);
}

export default Facturacion;

