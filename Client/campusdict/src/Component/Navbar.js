import React from "react";
function Navbar(){
    return(
    <nav>
    <div class="nav-wrapper white">
      <a href="#" class="left brand-logo">Logo</a>
      <ul id="nav-mobile" class="right ">
        <li><a href="sass.html">SignIn</a></li>
        <li><a href="badges.html">SignUp</a></li>
        <li><a href="collapsible.html">Create</a></li>
      </ul>
    </div>
    </nav>
    )
}
export default Navbar;