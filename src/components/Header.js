import React from 'react'
import {graphql, Link, useStaticQuery} from 'gatsby'
import styled from 'styled-components'
import "typeface-pinyon-script"
import BackgroundImage from 'gatsby-background-image-es5'
import "./Header.css"

export default ({className, pathPage}) => {

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
    const handleChooseBackgroundImage = () => {
        if (pathPage === "/") {
            pathPage = "category"
        }
        if (allImagesDataBanner.length < 1) {
            return <p>site en maintenance</p>
        }
        const imageFilter = allImagesDataBanner.filter(imageFilter => imageFilter.node.parent.parent.type === "banner" && imageFilter.node.parent.parent.page === pathPage);
        return [`linear-gradient(180deg, rgba(0, 0, 0, 0.85), rgba(28, 28, 28, 0.2))`, imageFilter[0].node.fluid]
    };

    const handleChooseBackgroundImageAlt = () => {
        if (pathPage === "/") {
            pathPage = "category"
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


    return (
        <>
            {<StyledBackgroundSection
                Tag="header"
                className={className}
                fluid={handleChooseBackgroundImage()}
                alt={handleChooseBackgroundImageAlt()}
            >
                <TopBar>
                    <NavStyled>
                        <Link to="/">
                            {pathPage === "category"
                                ?

                                <MenuItemH1 className={pathMatch("category")}>Location d'Appartements à
                                    Pattaya</MenuItemH1>

                                :
                                <MenuItem className={pathMatch("category")}>Location d'Appartements à Pattaya</MenuItem>
                            }

                        </Link>
                        <Link to="/apartments"><MenuItem
                            className={pathMatch("apartments")}>Appartement</MenuItem></Link>
                        <Link to="/activity"><MenuItem className={pathMatch("activity")}>Activité</MenuItem></Link>
                        <Link to="/interest"><MenuItem className={pathMatch("interest")}>Interets</MenuItem></Link>
                        <Link to="/about"><MenuItem className={pathMatch("about")}>A Savoir</MenuItem></Link>
                        <Link to="/contact"><MenuItem className={pathMatch("contact")}>Nous contacter</MenuItem></Link>
                    </NavStyled>
                </TopBar>
                <Baseline>
                    <span>Welcome</span>
                    <strong>Pattaya</strong>
                    <p>des appartements pour vos vacances</p>
                </Baseline>
            </StyledBackgroundSection>}
        </>
    )
};

const NavStyled = styled.nav`
    display: flex;
    flex-direction: column;
    line-height: 1.8;
        & a:first-child {
            padding-bottom: 1.2rem;
            font-size: 1.2rem;
        }
    @media only screen and (min-width:750px) {
        flex-direction: row;
        padding: 0.5rem 2rem;
        & a:first-child {
            margin-right: auto;
        }
    }
    `;

const StyledBackgroundSection = styled(BackgroundImage)`
    color: ${props => props.theme.color.primary};
    text-transform: uppercase;
    border-bottom: 1px solid ${props => props.theme.color.secondary};
    `;

const TopBar = styled.div`
    padding-top: 20px;
    text-align: center;
    `;

const MenuItem = styled.span`
    display: inline-block;
    margin: 0 15px;
    color: ${props => props.theme.color.primary};
    text-decoration: none;
    transition: color .3s;
        &:hover {
          color: ${props => props.theme.color.secondary};
        }
    `;
const MenuItemH1 = styled.h1`
    font-weight: 500;
    font-size: 1.2rem;
    display: inline-block;
    margin: 0 15px;
    color: ${props => props.theme.color.primary};
    text-decoration: none;
    transition: color .3s;
    &:hover {
        color: ${props => props.theme.color.secondary};
    }
    
    `;

const Baseline = styled.div`
    text-align: center;
    display: block;
    padding: 15px 0;
        span {
            font-family: 'pinyon script' , cursive;
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
            text-shadow: 3px 4px 4px #000000;
        }
        p {
            display: block;
            padding: 10px 0;
            letter-spacing: 2px;
            font-size: .7rem;
            text-shadow: 3px 4px 4px #000000;
        }
        @media only screen and (min-width:750px) {
            padding: 4rem;
            span {
                font-size: 4rem;
            }
            strong {
                font-size: 3.7rem;
            }          
            p {
                font-size: 1.4rem;
            }
        }
    `;

