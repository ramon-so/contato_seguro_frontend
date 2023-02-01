import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Usuarios from "./Usuarios";
import Empresas from "./Empresas";
import CenterDiv from "./components/CenterDiv";

const Routes = () => {
   return(
       <BrowserRouter>
           <Route component = { CenterDiv }  path="/" />
           <Route component = { Empresas }  path="/empresas" />
       </BrowserRouter>
   )
}

export default Routes;
