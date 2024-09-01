import React, { useEffect, useState } from 'react'

const Cleaning = ({ productItems, addToCart,selectedIndex }) => {
    const filteredItems = productItems.filter(item => item.categoria_pro_id === selectedIndex);
    return (


        <div className="container-items">
            {filteredItems.map((productItems) => (

                <div className="item" key={productItems.iD_PRODUCTO}>
                    <figure>
                        <img src={`./images/product/${productItems.codigo}.jpg`} alt={productItems.nombre} />
                    </figure>
                    <div className="info-product">
                        <h2>{productItems.nombre}</h2>
                        <div className='rate'>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                            <i className='fa fa-star'></i>
                        </div>
                        <p className="price">${productItems.precio}</p>
                        <button onClick={() => addToCart(productItems)}>Add to cart</button>
                    </div>
                </div>


            ))}
        </div>


    )
}

export default Cleaning