import React,{useState} from "react"
import Categories from "./Categories"
import "./Home.css"
import SliderHome from "./Slider"
import Shirt from "./Shirt"
import Pants from "./Pants"
import Shoes from "./Shoes"
import Hygiene from "./Hygiene"
import Cleaning from "./Cleaning"

const Home = ({ productItems, addToCart, CartItem}) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleSelectCategory = (category, index) => {
    setSelectedCategory(category);
    setSelectedIndex(index);
  };

  const renderCategoryComponent = () => {
    switch (selectedCategory) {
      case 'CAMISA':
        return <Shirt  productItems={productItems} CartItem={CartItem} addToCart={addToCart} selectedIndex={selectedIndex}/>;
      case 'PANTALON':
        return <Pants productItems={productItems} CartItem={CartItem} addToCart={addToCart} selectedIndex={selectedIndex}/>;
      case 'CALZADO':
        return <Shoes productItems={productItems} CartItem={CartItem} addToCart={addToCart} selectedIndex={selectedIndex}/>;
      case 'ASEO PERSONAL':
        return <Hygiene productItems={productItems} CartItem={CartItem} addToCart={addToCart} selectedIndex={selectedIndex}/>;
      case 'LIMPIEZA':
        return <Cleaning productItems={productItems} CartItem={CartItem} addToCart={addToCart} selectedIndex={selectedIndex}/>;
      default:
        return <SliderHome />;
    }
  };
  return (
    <>
      <section className='home'>
        <div className='container d_flex'>
          <Categories productItems={productItems} onSelectCategory={handleSelectCategory} />
          {renderCategoryComponent()}
        </div>
      </section>
    </>
  )
}

export default Home
