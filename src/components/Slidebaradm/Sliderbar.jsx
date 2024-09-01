import React, { useState } from 'react'
import { Link } from "react-router-dom"


function Sliderbar({ onSelectCategory }) {

    const [showCatalogosSubmenu, setShowCatalogosSubmenu] = useState(false);
    const [showDocumentosSubmenu, setShowDocumentosSubmenu] = useState(false);

    const toggleCatalogosSubmenu = () => {
        setShowCatalogosSubmenu(!showCatalogosSubmenu);
    };

    const toggleDocumentosSubmenu = () => {
        setShowDocumentosSubmenu(!showDocumentosSubmenu);
    };
    return (
        <>
            <div className='category'>
                <div className="box f_flex" onClick={toggleCatalogosSubmenu}>
                    <img src="./images/SIDEBAR/catalogar.png" alt="" />
                    <span>Catalogos</span>
                </div>
                {showCatalogosSubmenu && (
                    <div className="submenu">
                        <div className="box f_flex" onClick={() => onSelectCategory("Productos")}>
                            <span>Productos</span>
                        </div>
                        <div className="box f_flex" onClick={() => onSelectCategory("Clientes")}>
                            <span>Clientes</span>
                        </div>
                    </div>
                )}
                <div className="box f_flex" onClick={toggleDocumentosSubmenu}>
                    <img src="./images/SIDEBAR/docs.png" alt="" />
                    <span>Documentos</span>
                </div>
                {showDocumentosSubmenu && (
                    <div className="box f_flex" onClick={() => onSelectCategory("Facturas")}>
                        <span>Facturas</span>
                    </div>
                )}
            </div>

        </>
    )
}

export default Sliderbar