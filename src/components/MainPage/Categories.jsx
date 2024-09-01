import React from "react"

const Categories = ({ onSelectCategory }) => {
  const data = [
    {
      cateImg: "./images/category/cat1.png",
      cateName: "CAMISA",
    },
    {
      cateImg: "./images/category/cat2.png",
      cateName: "PANTALON",
    },
    {
      cateImg: "./images/category/cat3.png",
      cateName: "CALZADO",
    },
    {
      cateImg: "./images/category/cat4.png",
      cateName: "ASEO PERSONAL",
    },
    {
      cateImg: "./images/category/cat5.png",
      cateName: "LIMPIEZA",
    },
  ]

  return (
    <>
      <div className='category'>
        {data.map((value, index) => {
          return (
            <div className='box f_flex' key={index} onClick={() => onSelectCategory(value.cateName,index+1)}>
              <img src={value.cateImg} alt={value.cateName} />
              <span>{value.cateName}</span>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default Categories
