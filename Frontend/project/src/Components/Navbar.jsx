import React from "react";

function Navbar() {
  return (
    <div>
      <nav className="navbar rounded font-family-sans-serif">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4437/4437625.png"
              alt="Logo"
              width="30"
              height="24"
              className="d-inline-block align-text-top  ms-5"
            />
          </a>
         
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
