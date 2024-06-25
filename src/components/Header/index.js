import React, { useEffect } from "react";
import "./style.css";
import { auth } from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

function Header() {
  const [user, loading] = useAuthState(auth);
    const navigate=useNavigate();
  useEffect(()=>{
  if(user){
    navigate("/dashboard");
  }
  }, [user, loading])
  function logoutFn() {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logout Successful");
          navigate("/");
        })
        .catch((error) => {
          // An error happened.
          toast.error(error);
        });
    } catch (e) {
      toast.error(e.message);
    }
  }
  return (
    <div className="navbar">
      <p className="logo">Money_Minder</p>
      {user && (
        <div style={{display:"flex", alignItems:"center", gap:"1rem"}}>
          <img src={user.photoURL ? user.photoURL : ""} style={{height:"2rem", width:"2rem", borderRadius:"50%"}}/>
          <p className="logout link" onClick={logoutFn}>
          Logout
        </p>
        </div>
        
      )}
    </div>
  );
}

export default Header;
