import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Modal/Login.css';
import { Link } from "react-router-dom"

function Notfound() {
  
  // Referencias para los botones y contenedor
  const containerRef = useRef(null);
  const signInBtnRef = useRef(null);
  const signUpBtnRef = useRef(null);

  // useEffect para manejar los eventos cuando el componente se monta
  useEffect(() => {
    const container = containerRef.current;
    const signInBtn = signInBtnRef.current;
    const signUpBtn = signUpBtnRef.current;

    // Funciones para agregar y quitar la clase
    const handleSignUp = () => {
      container.classList.add('sign-up-mode');
    };

    const handleSignIn = () => {
      container.classList.remove('sign-up-mode');
    };

    // Añadir los event listeners
    signUpBtn.addEventListener('click', handleSignUp);
    signInBtn.addEventListener('click', handleSignIn);

    // Limpiar los event listeners cuando el componente se desmonta
    return () => {
      signUpBtn.removeEventListener('click', handleSignUp);
      signInBtn.removeEventListener('click', handleSignIn);
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez

  return (
    <div className="container-login" ref={containerRef}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <Link to='/'>
            <input type="submit" value="Login" className="btn solid" />
            </Link>
            
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="RUC O DNI" />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="NOMBRE" />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="DIRECCION" />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="CORREO" />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <Link to='/Adminpanel'>
            <input type="submit" className="btn" value="Sign up" />
            </Link>
          
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis, ex ratione. Aliquid!</p>
            <button className="btn transparent" id="sign-up-btn" ref={signUpBtnRef}>
              Sign up
            </button>
          </div>
          <img src="images/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam ad deleniti.</p>
            <button className="btn transparent" id="sign-in-btn" ref={signInBtnRef}>
              Sign in
            </button>
          </div>
          <img src="images/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Notfound;
