import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-hot-toast";
import { BiCloudLightRain } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useAuth} from '../../context/auth'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {auth,setAuth} = useAuth()
  const navigate = useNavigate();
//  2:53
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email, password);
      const res = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`,
        {  email, password });
      console.log(res);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,

        });
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">Login Form</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Yout Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;


// 3:4:00