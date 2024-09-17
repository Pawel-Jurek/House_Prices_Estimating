import { createContext, useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RenderRoutes } from "../auth/RenderNavigation";  


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

    const login = async (email1, password1) => {
        try {
          const { data } = await axios.post("http://localhost:13000/api/auth/login/", {
            email: email1,
            password: password1,
          });
          
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
      
          getUser();
    
        } catch (error) {
            console.log(error);
            }
    }

    const getUser = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          if (!accessToken) {
            throw new Error('No access token available');
          }
    
          const { data } = await axios.get("http://localhost:13000/api/auth/user", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
    
          setUser({
            ...user,
            isAuthenticated: true,
            username: data.username,
            email: data.email,
            userID: data.userID,
          });
        } catch (error) {
          console.log(error);
        }
    };

    const register1 = async (username1, email1, password1, firstName1, familyName1) => {
        try {
          const { data } = await axios.post("http://localhost:13000/api/auth/register/", {
            username: username1,
            email: email1,
            password: password1,
          });

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
