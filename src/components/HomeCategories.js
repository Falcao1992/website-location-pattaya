import React from 'react'
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
                    description: "Découvrez le premier parc aquatique Cartoon Network au monde, le Cartoon Network Amazone, situé au sud de Pattaya. " +
                        "Cette immense aire de jeux aquatiques est implantée dans la magnifique région côtière de Bang Saray, avec plus de 150 attractions..."
                },
                {
                    fluid: data.aboutPicture.childImageSharp.fluid,
                    backgroundColorDescription: "#1f5831ed",
                    title: "A savoir",
                    page: "about",
                    description: "C’est officiel, depuis le 22 décembre 2017, l’usage de la cigarette électronique est totalement interdit " +
                        "sur le territoire thaïlandais. Les autorités touristiques de la Thaïlande (TAT) sont claires, les thaïlandais comme " +
                        "les voyageurs seront arrêtés s’ils vapotent dans le royaume de Siam. On vous en dit plus sur cette loi à prendre très au sérieux…"
                },
                {
                    fluid: data.interestPicture.childImageSharp.fluid,
                    backgroundColorDescription: "#6d1441ed",
                    title: "Les Lieux d'interets",
                    page: "interest",
                    description: "À une dizaine de minutes en voiture de la splendide plage de  Jomtien, se trouve Sai Kaew Beach (Hat Sai Kaew). " +
                        "Située sur la côte est de la Thaïlande, sa signification, « sable de cristal » en dit déjà long sur sa splendeur... "
                },
                {
                    fluid: data.contactPicture.childImageSharp.fluid,
                    backgroundColorDescription: "#379cc1",
                    title: "Nous Contacter",
                    page: "contact",
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
                                            <SeeMoreLink to={`/${category.page}`}><span>voir plus ></span></SeeMoreLink>
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
    background: linear-gradient(90deg,rgba(15,15,18,0.45) 0%,rgba(15, 15, 18, 0.7) 50%,rgba(15,15,18,0.95) 100%);
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
            font-size: 2rem;
            letter-spacing: 3px;
        }   
        p {
            padding: 1rem 0;
        }
        
    @media only screen and (min-width:750px) {
        width: 60%;
        transform: translate(50%,-50%);
        &:hover {
              opacity: 1;
        }
    }
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


const StyledCategoryImageParallax = styled(HomeCategories)`
    display: flex;
    align-items: flex-end;
    height: 90vh;
    background-size: cover;
    background-position: bottom;
    position: absolute;
    transform: translate3d(0,0,0);
    border-top: 2px solid #C89446;
    
    @media only screen and (min-width:800px) {
        margin: 7rem auto 7rem 5rem;
        width: calc(75% - 10rem);
        box-shadow: -10px 20px 25px 0 rgba(0,0,0,0.7);
        height: 80vh;
        border-top: none;
        overflow: visible;
        
        &:before {
            background-attachment: fixed;
            opacity: 1;          
        }
    }
    `;

export default StyledCategoryImageParallax
