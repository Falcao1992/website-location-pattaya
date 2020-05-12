import React, {useState} from 'react'
import {graphql, Link, useStaticQuery} from 'gatsby'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image-es5'
import Typewriter from 'typewriter-effect';
import MenuIcon from '@material-ui/icons/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import "./Header.css"


export default ({className, pathPage}) => {

    const [burgerIsActive, setBurgerIsActive] = useState(false);

    const slogan = {
        home: "Envie de superbes vacances ?",
        apartments: "Des appartements tout confort !",
        activity: "Vous ne vous ennuierez jamais !",
        interest: "Des paysages magnifique !",
        about: "S'informer avant de partir !",
        contact: "Nous répondrons à toutes vos questions !",
    };

    const data = useStaticQuery(graphql`
        {
            allImageSharp(filter: {parent: {parent: {internal: {type: {eq: "firebaseData"}}}}}) {
                edges {
                    node {
                        id
                        parent {
                            parent {
                                ... on firebaseData {
                                    type
                                    page
                                }
                            }
                        }
                        fluid(sizes: "") {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    `);

    const allImagesDataBanner = data.allImageSharp.edges;


    const handleBurger = (e) => {
        e.stopPropagation();
        if (burgerIsActive === false) {
            setBurgerIsActive(true)
        } else {
            setBurgerIsActive(false)
        }
    };

    const handleChooseBackgroundImage = () => {
        if (pathPage === "/") {
            pathPage = "home"
        }
        if (allImagesDataBanner.length < 1) {
            return <p>site en maintenance</p>
        }
        const imageFilter = allImagesDataBanner.filter(imageFilter => imageFilter.node.parent.parent.type === "banner" && imageFilter.node.parent.parent.page === pathPage);
        return [`linear-gradient(180deg, rgba(0, 0, 0, 0.85), rgba(28, 28, 28, 0.2))`, imageFilter[0].node.fluid]
    };

    const handleChooseBackgroundImageAlt = () => {
        if (pathPage === "/") {
            pathPage = "home"
        }
        if (allImagesDataBanner.length < 1) {
            return <p>site en maintenance</p>
        }
        const imageFilter = allImagesDataBanner.filter(imageFilter => imageFilter.node.parent.parent.type === "banner" && imageFilter.node.parent.parent.page === pathPage);
        return imageFilter[0].node.parent.parent.page
    };

    const pathMatch = (pathPageRef) => {
        if (pathPage === pathPageRef) {
            return "linkActive"
        }
    };

    const sloganMatch = (pathPageRef) => {
        return <Typewriter
            onInit={(typewriter) => {
                typewriter
                    .changeDelay(100)
                    .typeString(`${slogan[pathPageRef]}`)
                    .pauseFor(2500)
                    .start();
            }}
        />
    };

    return (
        <>
            {<StyledBackgroundSection
                Tag="header"
                className={className}
                fluid={handleChooseBackgroundImage()}
                alt={handleChooseBackgroundImageAlt()}
            >
                <NavStyled>
                    <ListItemIconStyled>
                        <MenuIcon fontSize="large" onClick={handleBurger}/>
                        <Link to="/">
                            {pathPage === "home"
                                ?
                                <MenuItemH1 className={pathMatch("home")}>Accueil</MenuItemH1>
                                :
                                <MenuItem className={pathMatch("home")}>Accueil</MenuItem>
                            }
                        </Link>
                    </ListItemIconStyled>

                    <ContainerLink burgerIsActive={burgerIsActive}>
                        <Link to="/">
                            {pathPage === "home"
                                ?
                                <MenuItemH1 className={pathMatch("home")}>Accueil</MenuItemH1>
                                :
                                <MenuItem className={pathMatch("home")}>Accueil</MenuItem>
                            }
                        </Link>
                        <Link to="/apartments"><MenuItem
                            className={pathMatch("apartments")}>Appartement</MenuItem></Link>
                        <Link to="/activity"><MenuItem className={pathMatch("activity")}>Activités</MenuItem></Link>
                        <Link to="/interest"><MenuItem className={pathMatch("interest")}>Interets</MenuItem></Link>
                        <Link to="/about"><MenuItem className={pathMatch("about")}>A Savoir</MenuItem></Link>
                        <Link to="/contact"><MenuItem className={pathMatch("contact")}>Nous contacter</MenuItem></Link>
                    </ContainerLink>
                </NavStyled>

                <Baseline>
                    <small>Welcome</small>
                    <strong>Pattaya</strong>
                    <ContainerTypewriter>
                        {sloganMatch(pathPage)}
                    </ContainerTypewriter>
                </Baseline>
            </StyledBackgroundSection>
            }
        </>
    )
};

const StyledBackgroundSection = styled(BackgroundImage)`
    color: ${props => props.theme.color.primary};
    text-transform: uppercase;
    height: 60vh;
    @media only screen and (min-width:800px) {
        height: auto;
    }
    `;

const NavStyled = styled.nav`
    display: flex;
    width: 100%;
    position: fixed;
    flex-direction: column;
    line-height: 1.8;
    align-items: center;
    
    @media only screen and (min-width:800px) {
        position: relative;
        flex-direction: row;
        padding: 1rem 1.5rem;
        & a:first-child {           
            margin-right: auto;
        }
    }
    `;

const ListItemIconStyled = styled(ListItemIcon)`
    color: ${props => props.theme.color.primary};
    background-color: rgba(0, 0, 0, 0.975);
    z-index: 1000;
    min-width: auto;
    padding: 0.5rem 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: fixed;
    @media only screen and (min-width:800px) {
        display: none;
        position: relative;
    }
        a{
        align-self: center;
        }
    `;

const ContainerLink = styled.div`
    display: flex;
    transform: ${props => props.burgerIsActive ? "translateY(3rem)" : "translateY(-100vh)"}; 
    flex-direction: column;
    width: 100%;
    padding: 0.5rem 3rem 3rem;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.975);
    transition: transform .9s ease-in-out ;
    position: fixed;
        & a:first-child {           
            display: none;
            border-bottom: none;
            text-decoration: none;
        }
        a {
          border-bottom: 1px solid lightgray;
        }
        
    @media only screen and (min-width:800px) {
            display: flex;
            flex-direction: row;
            width: 100%;
            align-items: center;
            background-color: transparent;
            transform: translateY(0);
            position: relative;
            & a:first-child {           
            display: flex;
            }
            a {
                border-bottom: none;
            }     
    }
    `;

const MenuItem = styled.span`
    font-size: 0.8rem;
    display: inline-block;
    font-weight: 300;
    margin: 0.5rem 0;
    color: ${props => props.theme.color.primary};
    text-decoration: none;
    transition: color .3s;
        &:hover {
          color: ${props => props.theme.color.secondary};
        }
    @media only screen and (min-width:800px) {
        margin: 0.5rem 1rem;
    }
    `;

const MenuItemH1 = styled.h1`
    font-size: 0.8rem;
    display: inline-block;
    font-weight: 300;
    margin: 0.5rem 0;
    color: ${props => props.theme.color.primary};
    text-decoration: none;
    transition: color .3s;
    
    @media only screen and (min-width:800px) {
        margin: 0.5rem 1rem;
    }
    
    &:hover {
        color: ${props => props.theme.color.secondary};
    }  
    `;

const Baseline = styled.div`
        text-align: center;
        display: flex;
        flex-direction: column;
        margin: auto 0;
        height: 70vh;
        justify-content: center;  
        padding: 0 1rem;
        small {
            font-family: ${props => props.theme.font.secondary};
            font-size: 3rem;
            text-align: center;
            display: block;
            color: ${props => props.theme.color.secondary};
            letter-spacing: 2px;
            text-transform: none;
        }
        strong {
            display: block;
            font-size: 2.70rem;
            letter-spacing: 3px;
            text-shadow: 1px 1px 3px #000000;
        }     
        @media only screen and (min-width:800px) {
            padding-bottom: 3rem;
            height: 60vh;
            small {
                font-size: 4rem;
            }
            strong {
                font-size: 3.7rem;
                padding: 1rem;
            }          
            p {
                font-size: 1.4rem;
            }
        }
    `;

const ContainerTypewriter = styled.div`
    display: flex;
    justify-content: center;
    span {
        display: contents;
        padding: 10px 0;
        letter-spacing: 2px;
        font-size: .7rem;
        text-shadow: 1px 1px 3px #000000;
    }
    
    @media only screen and (min-width:800px) {                 
            span {
                font-size: 1.4rem;
            }
        }
    `;


