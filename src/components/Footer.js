import React from "react";
import {Link} from "gatsby";
import styled from "styled-components";
import "./Footer.css"

export const Footer = () => {


    return (
        <FooterContentStyled>
            <FooterLinkStyled>
                <Link to="/" activeClassName={"linkActive"} ><FooterItem>Acceuil</FooterItem></Link>
                <Link to="/contact" activeClassName={"linkActive"}><FooterItem >Nous Contacter</FooterItem></Link>
            </FooterLinkStyled>

            <FooterTextStyled>
                <FooterItem>By Eduardo Lépine 2020</FooterItem>
            </FooterTextStyled>

        </FooterContentStyled>
    )
};

const FooterContentStyled = styled.div`
    background-color: #000000eb;
    padding: 1rem;
    display: flex;
    flex-direction: column;      
    `;

const FooterLinkStyled = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1rem;
    `;

const FooterTextStyled = styled.div`
    display: flex;
    justify-content: center;
    `;

const FooterItem = styled.p`
    display: inline-block;
    margin: 0 15px;
    color: ${props => props.theme.color.primary};
    text-decoration: none;
    transition: color .3s;
        &:hover {
          color: ${props => props.theme.color.secondary};
        }
    `;

