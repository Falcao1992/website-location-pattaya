import React, {useState} from 'react'
import {graphql, StaticQuery, Link} from 'gatsby'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image-es5'
import "./HomeCategories.css"
import "typeface-pinyon-script"

import {Controller, Scene} from "react-scrollmagic";

const HomeCategories = ({className}) => (

    <StaticQuery
        query={graphql`
        query {
            aboutPicture: file(relativePath: { eq: "aboutPicture.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            apartmentPicture: file(relativePath: { eq: "apartmentPicture.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            activityPicture: file(relativePath: { eq: "activityPicture.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
           
            interestPicture: file(relativePath: { eq: "interestPicture.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            
            contactPicture: file(relativePath: { eq: "contactPicture.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
        `}
        render={data => {
            const allCategory = [
                {
                    fluid: data.apartmentPicture.childImageSharp.fluid,
                    backgroundColorDescription: "#6d1441ed",
                    title: "Nos Appartements",
                    page: "apartments",
                    description: "L'Amazon Residence Condominium est situé à 1,2 km de la plage de Jomtien et à 2,9 km du marché flottant de Pattaya. " +
                        "Il propose une connexion Wi-Fi gratuite et un restaurant..."
                },
                {
                    fluid: data.activityPicture.childImageSharp.fluid,
                    backgroundColorDescription: "#379cc1",
                    title: "Les Activitées",
                    page: "activity",
                    source: "https://www.cartoonnetworkamazone.com/",
                    description: "Découvrez le premier parc aquatique Cartoon Network au monde, le Cartoon Network Amazone, situé au sud de Pattaya. " +
                        "Cette immense aire de jeux aquatiques est implantée dans la magnifique région côtière de Bang Saray, avec plus de 150 attractions..."
                },
                {
                    fluid: data.aboutPicture.childImageSharp.fluid,
                    backgroundColorDescription: "#1f5831ed",
                    title: "A savoir",
                    page: "/about",
                    source: "https://www.voyagethailande.fr/interdiction-cigarette-electronique-thailande",
                    description: "C’est officiel, depuis le 22 décembre 2017, l’usage de la cigarette électronique est totalement interdit " +
                        "sur le territoire thaïlandais. Les autorités touristiques de la Thaïlande (TAT) sont claires, les thaïlandais comme " +
                        "les voyageurs seront arrêtés s’ils vapotent dans le royaume de Siam. On vous en dit plus sur cette loi à prendre très au sérieux…"
                },
                {
                    fluid: data.interestPicture.childImageSharp.fluid,
                    backgroundColorDescription: "#6d1441ed",
                    title: "Les Lieux d'interets",
                    page: "/interest",
                    source: "http://vivre-en-thailande.com/la-plage-des-militaires-sai-kaew-beach/13324/",
                    description: "À une dizaine de minutes en voiture de la splendide plage de  Jomtien, se trouve Sai Kaew Beach (Hat Sai Kaew). " +
                        "Située sur la côte est de la Thaïlande, sa signification, « sable de cristal » en dit déjà long sur sa splendeur... "
                },
                {
                    fluid: data.contactPicture.childImageSharp.fluid,
                    backgroundColorDescription: "#379cc1",
                    title: "Nous Contacter",
                    page: "/contact",
                    description: "N'hésitez pas pour nous contacter, nous sommes à votre disposition pour les renseignements complémentaires que vous désireriez au sujet de nos appartements à louer à Pattaya."
                },
            ];

            return (
                <>
                    {allCategory.map((category, index) => {
                        return (
                            <Controller key={index}>
                                <Scene
                                    triggerElement={`.box${index}`}
                                    classToggle={[`.box${index}`, "fade-in"]}
                                    offset={-100}
                                    indicators={false}
                                    reverse={false}
                                >
                                    <BackgroundImage
                                        Tag="section"
                                        className={className}
                                        fluid={category.fluid}
                                        backgroundColor={`#040e18`}
                                        alt={category.title}
                                    >
                                        <DescriptionBlock className={`box${index}`}>
                                            <h2>{category.title}</h2>
                                            <p>{category.description}</p>
                                            <BlockLink>
                                                {category.source && <SourceLink href={category.source} target="_blank" rel="noopener noreferrer"><span>Source</span></SourceLink>}
                                                <SeeMoreLink to={`/${category.page}`}><span>voir plus ></span></SeeMoreLink>
                                            </BlockLink>
                                        </DescriptionBlock>
                                    </BackgroundImage>
                                </Scene>
                            </Controller>
                        )
                    })}
                </>
            )
        }}
    />
);


const DescriptionBlock = styled.div`
    width: 80%;
    position: absolute;
    color: ${props => props.theme.color.primary};
    font-family: ${props => props.theme.font.primary};
    letter-spacing: 1px;
    text-align: center;
    background: linear-gradient(90deg,rgba(15,15,18,0.35) 0%,rgba(15, 15, 18, 0.6) 50%,rgba(15,15,18,0.95) 100%);
    box-shadow: -10px 20px 25px 0 rgba(0,0,0,0.7);
    padding: 1rem;
    margin: 0 0.5rem;
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%);
    transition: opacity 0.6s linear;
    
        h2 {
            font-family: ${props => props.theme.font.secondary};
            color: ${props => props.theme.color.secondary};
            font-size: 2.2rem;
            letter-spacing: 6px;
        }   
        p {
            padding: 1rem 0;
        }
        
    @media only screen and (min-width:750px) {
        width: 60%;
        &:hover {
              opacity: 1;
        }
    }
    `;

const BlockLink = styled.div`
        display: flex;
        justify-content: space-evenly;
        `;

const SeeMoreLink = styled(Link)`
        text-decoration: none;
            span {
                color: ${props => props.theme.color.secondary};
                font-size: 0.9rem;
                &:hover {
                    text-decoration: underline;
                }
            }
    `;

const SourceLink = styled.a`
        text-decoration: none;
            span {
                color: ${props => props.theme.color.secondary};
                font-size: 0.9rem;
                &:hover {
                    text-decoration: underline;
                }
            }
    `;

const StyledCategoryImageParallax = styled(HomeCategories)`
    display: flex;
    align-items: flex-end;
    height: 85vh;
    background-size: cover;
    background-position: bottom;
    overflow: hidden;   
    position: absolute;
    transform: translate3d(0,0,0);
    border-top: 2px solid #C89446;
    
    @media only screen and (min-width:750px) {
        margin: 4rem auto;
        width: calc(100% - 8rem);
        border: 2px solid ${props => props.theme.color.secondary};
        box-shadow: -10px 20px 25px 0 rgba(0,0,0,0.7);
        &:before {
            background-attachment: fixed;
            opacity: 1;
            
        }
    }
    `;

export default StyledCategoryImageParallax
