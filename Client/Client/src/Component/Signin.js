import React, { useState } from "react";
import { Link ,useHistory} from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
function Signin(){
  let history=useHistory();
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const Postdata=()=>{
    fetch("/api/v1/user/login",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:email,
        password:password
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.error){
        M.toast({html: "check your email and password",classes:"#f44336 red"})
      }
      else {
        // localStorage.setItem("jwt",data.token);
        // localStorage.setItem("user",JSON.stringify(data.user));
        M.toast({html:"SignedIn Success ",classes:"#4caf50 green"})
        history.push("/");
      }
    })
    .catch(err=>{console.log(err);})
  }
   return(
    <div className="mycard ">
      <div className="card auth-card input-field">
        <h2>Campus Dictionary</h2>
        <input onChange={(event)=>setEmail(event.target.value)} type="text" placeholder="Email" value={email}/>
        <input onChange={(event)=>setPassword(event.target.value)} type="text" placeholder="Password" value={password}/>
        <button  onClick={()=>Postdata()} className="btn waves-effect #ee6e73 clrbtn" >
          Sign In
        </button>
        <h5>
        <Link style={{color:"black"}}to="/user/register"> Don't Have an Account?</Link>
        </h5>
      </div>
      
    </div>
   );
}
export default Signin;