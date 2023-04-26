import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import "./SignIn.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
  Username: "",
  Password: "",
  Fullname: "",
  Email: "",
  Username1: "",
  Password1: "",
};

function SignIn() {
  const [state, setState] = useState(initialState);
  const {Username, Password, Fullname, Email, Username1, Password1} = state;
  const navigate = useNavigate();
  // const {id} = useParams();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if(!Username || !Password || !Fullname || !Email) {
      toast.success("Fill in both fields.")
    } else {
        axios.post("http://localhost:5000/api/post", {
          Username,
          Password,
          Fullname,
          Email
      })
      .then(() => {
          setState({Username: "", Password: "", Fullname: "", Email: ""});
      })
      .catch((err) => toast.error(err.response.data));
      toast.success("Data Added Successfully")
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    if(!Username1 || !Password1) {
      toast.success("Fill in both fields..")
    } else {
      axios.get("http://localhost:5000/api/admin", {
        Username1,
        Password1,
      })
      .then(() => {
        setState({Username1: "", Password1: ""});
        setTimeout(() => navigate("/dashboard"), 500);
      })
      .catch((err) => {
        setState({ Username1: "", Password1: "" });
        toast.error("Invalid username or password.");
      });
    }
    
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setState({...state, [name]: value});
  };

  return (
    <div className="App signIn-background">
      <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
      <div className="form-container sign-up-container">
        <form className='form1' onSubmit={handleSignUp}>
          <h1 className='h11'>  CREATE ACCOUNT</h1>
          <input
            className='input1'
            type="text"
            id="Username"
            name="Username"
            placeholder="Username"
            value={Username || ""}
            onChange={handleInputChange}
            />
            <input
            className='input1'
            type="password"
            id="Password"
            name="Password"
            placeholder="Password"
            value={Password || ""}
            onChange={handleInputChange}
            />
            <input
            className='input1'
            type="text"
            id="Fullname"
            name="Fullname"
            placeholder="Fullname"
            value={Fullname || ""}
            onChange={handleInputChange}
            />
            <input
            className='input1'
            type="email"
            id="Email"
            name="Email"
            placeholder="Email"
            value={Email || ""}
            onChange={handleInputChange}
            />
          <button className='button1' onClick={handleSwitch} type="submit">SUBMIT</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form className='form1' onSubmit={handleSignIn}>
          <h1 className='h11'>LOGIN</h1>
          <input
            className='input1'
            type="text"
            placeholder="Username"
            name="Username1"
            value={Username1 || ""}
            onChange={handleInputChange}
          />
          <input
            className='input1'
            type="password"
            placeholder="Password"
            name="Password1"
            value={Password1 || ""}
            onChange={handleInputChange}
          />
          <button className='button1' type="submit">LOGIN</button>
        </form>
      </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className='h11'>Welcome Back!</h1>
              <p className='p1'>To keep connected with us please login with your personal info</p>
              <button className="button1 ghost" onClick={handleSwitch}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className='h11'>Hello, Friend!</h1>
              <p className='p1'>Enter your personal details and start journey with us</p>
              <button className="button1 ghost" onClick={handleSwitch}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
