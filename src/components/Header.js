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
        if(allImagesDataBanner.length < 1) {
            return <p>site en maintenance</p>
        }
        const imageFilter = allImagesDataBanner.filter(imageFilter => imageFilter.node.parent.parent.type === "banner" && imageFilter.node.parent.parent.page === pathPage);
        return [`linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(28, 28, 28, 0.1))`, imageFilter[0].node.fluid]
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
            >
                <TopBar>

                    <NavStyled>
                        <Link to="/"><MenuItem className={pathMatch("category")}>Location d'Appartements à Pattaya</MenuItem></Link>
                        <Link to="/apartments"><MenuItem className={pathMatch("apartments")}>Appartement</MenuItem></Link>
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
    `;

const StyledBackgroundSection = styled(BackgroundImage)`
    color: ${props => props.theme.color.primary};
    text-transform: uppercase;
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
        }
        p {
            display: block;
            padding: 10px 0;
            letter-spacing: 2px;
            font-size: .7rem;
        }
    `;

