import React,{useState} from 'react'
import { Link } from "react-router-dom"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Sliderbar from './Slidebaradm/Sliderbar'
import Listproductos from './MainPage/Listproductos'
import Listclientes from './MainPage/Listclientes'
import SliderHome from "./MainPage/Slider"
import Facturas from './MainPage/Facturas'
import Editarproducto from './MainPage/Editarproducto'
import Editarcliente from './MainPage/Editarcliente'
import ProtectedRoute from "./ProtectedRoute";


const Adminpanel = ({ productItems, addToCart, CartItem, shopItems,Clientes,tokenr1,iduser1 }) => {

    const [selectedCategory, setSelectedCategory] = useState('');
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingClient, setEditingClient] = useState(null);
    
  const renderCategoryComponent = () => {
    if (editingProduct) {
      return <Editarproducto product={editingProduct} onCancel={() => setEditingProduct(null)} tokenr2={tokenr1}/>;
    }if(editingClient){
      return <Editarcliente client={editingClient} onCancel={() => setEditingClient(null)} tokenr2={tokenr1}/>;
    }
    switch (selectedCategory) {
      case 'Clientes':
        return <Listclientes  onEdit={setEditingClient} tokenr2={tokenr1}/>;
      case 'Productos':
        return <Listproductos onEdit={setEditingProduct} tokenr2={tokenr1}/>;
      case 'Facturas':
        return <Facturas productItems={productItems} CartItem={CartItem} addToCart={addToCart} tokenr2={tokenr1} iduser2={iduser1}/>;
      default:
        return <SliderHome />;
    }
  };
    return (
        <section className='home'>
            <div className='container d_flex'>
                <Sliderbar productItems={productItems} onSelectCategory={setSelectedCategory} />
                {renderCategoryComponent()}
            </div>
        </section>

    )
}

export default Adminpanel