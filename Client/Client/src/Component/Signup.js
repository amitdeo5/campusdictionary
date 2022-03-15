import React, { useState } from "react";
import { Link ,useHistory} from "react-router-dom";
import M from "materialize-css";
function Signup(){
  let history=useHistory();
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");
  const [role,setrole]=useState("");
  const Postdata=()=>{
    // if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    //   return M.toast({html: 'Invalid Email',classes:"#f44336 red"});
    // }

    fetch("/api/v1/user/register",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        email:email,
        password:password,
        role:role
        
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        M.toast({html: "Please check all your fields",classes:"#f44336 red"})
      }
      else {
        M.toast({html:"Successfully Registered",classes:"#4caf50 green"})
        history.push("/user/login");
      }
      
    })
    .catch(err=>{console.log(err);})
  }

   return(
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Campus Dictionary</h2>
        <input onChange={(event)=>setName(event.target.value)} type="text" placeholder="Username" value={name}/>
        <input onChange={(event)=>setEmail(event.target.value)} type="text" placeholder="Email" value={email}/>
        <input onChange={(event)=>setPassword(event.target.value)} type="text" placeholder="Password" value={password}/>
        <input onChange={(event)=>setrole(event.target.value)} type="text" placeholder="Write your role" value={role}/>
        <button onClick={()=>Postdata()} className="btn waves-effect #64b5f6 clrbtn" >
          Sign Up
        </button>
        <h5>
           <Link style={{color:"black"}} to="/user/login"> Already Have an Account?</Link>
        </h5>
      </div>
    </div>
   );
}
export default Signup;