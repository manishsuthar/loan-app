import React, { ReactElement } from "react";
import Header from "./Header";

const Layout = ({children}:{children:ReactElement})=>{
    return(
        <div className="container py-3">
            <Header/>
            {children}
        </div>
    )
}

export default Layout;