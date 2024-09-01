import React, { useEffect, useRef, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const Loginadm = ({ onVerif }) => {
  const history = useHistory();

  const containerRef = useRef(null);
  const signInBtnRef = useRef(null);
  const signUpBtnRef = useRef(null);
  // const history = useHistory();
  // // const navigate = useNavigate();
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const userlog = document.getElementById('usernamelog').value;
  //   const passlog = document.getElementById('passwordlog').value;
  //   // Aquí puedes agregar lógica para autenticar con una API
  //   const success = await login(userlog, passlog); // Simular login

  //   if (success.completo) {
  //     onVerif(success.token);
  //     history.push('/Adminpanel'); // Redirigir a una página protegida después del login
      
  //   } else {
  //     alert('Credenciales incorrectas');
  //   }
  // };


  const handleLogin = async (e) => {
    const userlog = document.getElementById('usernamelog').value;
    const passlog = document.getElementById('passwordlog').value;
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7270/PRODUCT/login?usuario=${userlog}&password=${passlog}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response) {
        const data = await response.json();
        const tokenrecib = data.token;
        const iduser=data.id;
        onVerif(tokenrecib,iduser);
        history.push('/Adminpanel');
      } else {
        console.error('Error en la solicitud if:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud try:', error);
    }

  };
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
          <form action="#" className="sign-in-form" onSubmit={handleLogin}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" id='usernamelog' placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" id='passwordlog' placeholder="Password" />
            </div>
            {/* <Link to='/Adminpanel'> */}
            <input type="submit" value="Login" className="btn solid" />
            {/* </Link> */}

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

export default Loginadm