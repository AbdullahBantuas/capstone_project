import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom";
import "./SignIn.css";
import axios from "axios";
import {toast} from "react-toastify";
import Swal from "sweetalert2";

const initialState = {
  Username: "",
  Password: "",
  Fullname: "",
  Email: "",
};

function SignIn() {
  const [state, setState] = useState(initialState);
  const {Username, Password, Fullname, Email} = state;
  const navigate = useNavigate();
  // const {id} = useParams();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if(!Username || !Password || !Fullname || !Email) {
      alert("Fill in both fields.")
    } else {
        axios.post("http://localhost:5000/api/post", {
          Username,
          Password,
          Fullname,
          Email
      })
      .then(() => {
          setState({Username: "", Password: "", Fullname: "", Email: ""});
          Swal.fire('Sucessfully created, please check your email to verify your account!', '', 'success');
          navigate('/');
          navigate(handleSignUp);
      }).catch((err) => {
        console.error(err);
        Swal.fire('Error: username or gmail already exist.', '', 'info');
        });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!Username || !Password) {
      alert("Please enter both username and password");
    } else {
      axios
        .post("http://localhost:5000/api/login", {
          Username,
          Password
        })
        .then((response) => {
          console.log(response.data.Status);
          if (response.data.Login) {
            if (response.data.Status === "admin") {
              localStorage.setItem("U_id", response.data.U_id);
              navigate("/home");
              Swal.fire(
                'Logged In!',
                'Logged in as admin.',
                'success'
              );
            } else if (response.data.Status === "user") {
              if (response.data.IsVerified) {
                localStorage.setItem("U_id", response.data.U_id);
                navigate("/userhome");
                Swal.fire(
                  'Logged In!',
                  'Logged in as user.',
                  'success'
                );
              } else {
                alert("Your Gmail account is not verified yet.");
              }
            }
          } else {
            Swal.fire('Invalid username or password.', '', 'info');
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire('Error logging in.', '', 'info');
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
          <button className='button1' type="submit">SUBMIT</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form className='form1' onSubmit={handleLogin}>
          <h1 className='h11'>LOGIN</h1>
          <input
            className='input1'
            type="text"
            id="Username"
            placeholder="Username"
            name="Username"
            value={Username || ""}
            onChange={handleInputChange}
          />
          <input
            className='input1'
            type="password"
            id="Password"
            placeholder="Password"
            name="Password"
            value={Password || ""}
            onChange={handleInputChange}
          />
          <button type='submit' className='button1'>LOGIN</button>
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
