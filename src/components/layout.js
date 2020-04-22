
import React from "react"
import "./layout.css"
import theme from "../assets/theme";
import {ThemeProvider} from "styled-components";
import StyledBackgroundSection from "./header";

const Layout = ({children}) => {

    return (
        <ThemeProvider theme={theme}>
            <div>
                <main>{children}</main>
                <footer>
                    © {new Date().getFullYear()}, Built with
                    {` `}
                    <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer>
            </div>
        </ThemeProvider>
    )
};


export default Layout
