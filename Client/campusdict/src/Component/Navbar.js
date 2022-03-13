import React from "react";
function Navbar(){
    return(
    <nav>
    <div className="nav-wrapper white">
      <a href="#" className="left brand-logo">Campus Dictionary</a>
      <ul id="nav-mobile" className="right ">
        <li><a href="sass.html">SignIn</a></li>
        <li><a href="badges.html">SignUp</a></li>
        <li><a href="collapsible.html">Create</a></li>
      </ul>
    </div>
    </nav>
    )
}
export default Navbar;