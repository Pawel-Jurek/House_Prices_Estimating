import { createContext, useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RenderRoutes } from "../auth/RenderNavigation";  
import { toast } from "react-toastify";


const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);


export const AuthWrapper = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
      username: "",
      email: "",
      userID: "",
      isAuthenticated: false,
    });

    const login = async (username1, password1) => {
        try {
          const { data } = await axios.post("http://localhost:8000/users/login/", {
            username: username1,
            password: password1,
          });

          console.log(data);
          
          localStorage.setItem('accessToken', data.access);
          localStorage.setItem('refreshToken', data.refresh);
          localStorage.setItem('userID', data.user_id);
          getUser();
          navigate("/");
          toast.success('Logged in successfully', { position: 'top-center' });
         
        } catch (error) {
            console.log(error);
            }
    }

    const getUser = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const userID = localStorage.getItem('userID');
          if (!accessToken) {
            throw new Error('No access token available');
          }
    
          const { data } = await axios.get(`http://localhost:8000/users/${userID}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
 
          setUser({
            ...user,
            isAuthenticated: true,
            username: data.username,
            email: data.email,
            userID: data.id,
          });
        

        } catch (error) {
          console.log(error);
        }
    };

    const register1 = async (username1, email1, password1, password22) => {
        try {
          
          const { data } = await axios.post("http://localhost:8000/users/register/", {
            username: username1,
            password: password1,
            password2: password22,
            email: email1,      
          });
          console.log(data)
          navigate("/login");

        } catch (error) {
            console.log(error);
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser({
          username: "",
          email: "",
          userID: "",
          isAuthenticated: false,
        });
        navigate("/");
        toast.success('Logged out successfully', { position: 'top-center' });
      };

      useEffect(() => {
        if (localStorage.getItem('accessToken')) {
          getUser();
        }
      }, []);

      return (
        <AuthContext.Provider value={{ user, login, logout, register1, getUser }}>
          <>   
            <RenderRoutes />
          </>
        </AuthContext.Provider>
      );

};
