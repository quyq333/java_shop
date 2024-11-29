import React from "react";

function Preloader(){
   return(
    <div>
          {/* Preloader */}
          <div className="preloader flex-column justify-content-center align-items-center">
            <img className="animation__shake" src="theme/dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
          </div>
    </div>
   )
}

export default Preloader;