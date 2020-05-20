import React from 'react'
import {graphql, StaticQuery, Link} from 'gatsby'
import styled from 'styled-components'
import Img from "gatsby-image"
import "./HomeCategories.css"

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
                    fluid: data.interestPicture.childImageSharp.fluid,
                    backgroundColorDescription: "#6d1441ed",
                    title: "Les Lieux d'interets",
                    Width: "65%",
                    page: "interest",
                    description: "À une dizaine de minutes en voiture de la splendide plage de Jomtien, se trouve Sai Kaew Beach (Hat Sai Kaew). "
                },
                {
                    fluid: data.apartmentPicture.childImageSharp.fluid,
                    title: "Nos Appartements",
                    Width: "35%",
                    page: "apartments",
                    description: "L'Amazon Residence Condominium est situé à 1,2 km de la plage de Jomtien et à 2,9 km du marché flottant de Pattaya. "
                },
                {
                    fluid: data.activityPicture.childImageSharp.fluid,
                    title: "Les Activitées",
                    Width: "35%",
                    page: "activity",
                    description: "Découvrez le premier parc aquatique Cartoon Network au monde, le Cartoon Network Amazone, situé au sud de Pattaya. "
                },
                {
                    fluid: data.aboutPicture.childImageSharp.fluid,
                    title: "A savoir",
                    Width: "65%",
                    page: "about",
                    description: "Toutes les choses importante à savoir avant de partir, comme l'interdiction de la cigarette électronique, où échanger son argent ect…"
                },
                {
                    fluid: data.contactPicture.childImageSharp.fluid,
                    title: "Nous Contacter",
                    Width: "55%",
                    page: "contact",
                    description: "N'hésitez pas pour nous contacter, nous sommes à votre disposition pour les renseignements complémentaires que vous désireriez au sujet de nos appartements à louer à Pattaya."
                },
            ];

            return (
                <ContainerHomeCategory>
                    {allCategory.map((category, index) => {
                        return (
                            <Controller key={index}>
                                <Scene
                                    triggerElement={`.box${index}`}
                                    classToggle={[`.box${index}`, "fade-in"]}
                                    offset={-150}
                                    indicators={false}
                                    reverse={false}
                                >
                                    <>
                                        {category.page === "contact"
                                            ?
                                            <ContainerMapContact>
                                                <IframeStyled
                                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d158443.28959118854!2d100.75294725618774!3d12.902349898070899!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x9ebd0edb7a4e2465!2sAmazon%20Residence!5e1!3m2!1sfr!2sfr!4v1589943736228!5m2!1sfr!2sfr"
                                                    aria-hidden="false" tabIndex="0"/>
                                                <ContainerCategory page={category.page} width={category.Width}>
                                                    <ImgStyled
                                                        Tag="div"
                                                        className={className}
                                                        fluid={category.fluid}
                                                        alt={category.title}
                                                        page={category.page}
                                                    >
                                                    </ImgStyled>
                                                    <DescriptionBlock className={`box${index}`}>
                                                        <h2>{category.title}</h2>
                                                        <p>{category.description}</p>
                                                        <SeeMoreLink to={`/${category.page}`}><p>Découvrir</p>
                                                        </SeeMoreLink>
                                                    </DescriptionBlock>
                                                </ContainerCategory>
                                            </ContainerMapContact>
                                            :
                                            <ContainerCategory page={category.page} width={category.Width}>
                                                <ImgStyled
                                                    Tag="div"
                                                    className={className}
                                                    fluid={category.fluid}
                                                    alt={category.title}
                                                >
                                                </ImgStyled>
                                                <DescriptionBlock className={`box${index}`}>
                                                    <h2>{category.title}</h2>
                                                    <p>{category.description}</p>
                                                    <SeeMoreLink to={`/${category.page}`}><p>Découvrir</p></SeeMoreLink>
                                                </DescriptionBlock>
                                            </ContainerCategory>
                                        }
                                    </>
                                </Scene>
                            </Controller>
                        )
                    })}
                </ContainerHomeCategory>
            )
        }}
    />
);

const ContainerMapContact = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    @media only screen and (min-width:800px) {       
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        margin: 5rem 0;
    }
`;

const IframeStyled = styled.iframe`
    width: 100%;
    padding: 1rem 0;
    border: 0;
    height: 50vh;
    @media only screen and (min-width:800px) {  
        width: 40%;
        height: auto;
        padding: 0;    
        display: flex;
        flex-direction: row;
    }
`;

const ContainerHomeCategory = styled.div`
    @media only screen and (min-width:800px) {       
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        & section:nth-child(1n) {
          padding-left: 0;
        }
        & section:nth-child(2n) {
          padding-right: 0;
        }
    }
`;

const ContainerCategory = styled.section`
    @media only screen and (min-width:800px) {  
        position: relative;     
        width: ${props => props.width};
        padding: 0 0.25rem 0.5rem 0.25rem;   
    }
    `;

const ImgStyled = styled(Img)`
    display: flex;
    align-items: flex-end;
    z-index: -1;  
    @media only screen and (min-width:800px) {           
        height: ${props => props.page !== "contact" ? "75vh" : "55vh"};
        overflow: visible;
    }
    `;

const DescriptionBlock = styled.div`
    color: ${props => props.theme.color.primary};
    font-family: ${props => props.theme.font.primary};
    letter-spacing: 1px;
    padding: 1rem;

    transition: all 0.6s linear;     
        > p {
            padding: 1rem 0;
            color: rgb(11,11,11) ;
        }
     
    @media only screen and (min-width:800px) {
    position: absolute;
    padding: 1rem;
    bottom: 1.5rem;
    left: 1rem;
    max-width: calc(100% - 2rem);
    background: linear-gradient(90deg,rgba(15,15,18,0.45) 0%,rgba(15, 15, 18, 0.7) 50%,rgba(15,15,18,0.95) 100%);
        &:hover {
              opacity: 1;
              background-color: rgb(11,11,11, 0.8);;
        }     
        > p {
            color: ${props => props.theme.color.primary};
            padding: 0.5rem 0 0.7rem 0;
        }
    }
    `;

const SeeMoreLink = styled(Link)`
        text-decoration: none;           
            p {
                color: ${props => props.theme.color.secondary};
                font-size: 0.9rem;
                border: 1px solid ${props => props.theme.color.secondary} ;
                text-align: center;
                transition: all 0.6s linear;
                padding: 1rem;
                &:hover {
                    color: ${props => props.theme.color.primary};
                    background-color: ${props => props.theme.color.secondary} ;
                }                   
                @media only screen and (min-width: 800px) {
                    max-width: 35%;
                    padding: 0.5rem;
                }
            }
    `;

export default HomeCategories
