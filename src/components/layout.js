
import React from "react"
import "./layout.css"
import theme from "../assets/theme";
import {ThemeProvider} from "styled-components";
import {Footer} from "./Footer";



const Layout = (props) => {

    return (
        <ThemeProvider theme={theme}>
            <div>
                <main>{props.children}</main>
                <Footer />
            </div>
        </ThemeProvider>
    )
};


export default Layout
