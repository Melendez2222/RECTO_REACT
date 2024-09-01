import React,{ useContext,useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import  AuthContext  from './Context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user,loading } = useContext(AuthContext);
    const history = useHistory();
    // console.log('aqui toy',user);
    useEffect(() => {
        console.log('User:', user);
      }, [user]);
    if (loading) {
        return <div>Cargando...</div>;
      }
    
      if (!user) {
        history.push('/Loginadm');
        return null;
      }
    
      return children;
    };

export default ProtectedRoute