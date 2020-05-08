import React from "react";
import {graphql} from "gatsby";
import Layout from "../components/layout";
import Img from "gatsby-image"
import styled from "styled-components";
import Header from "../components/Header";
import SEO from "../components/seo";

export default ({data, pageContext}) => {
    const {allFirebaseData} = data;

    const translatePageName = (namePage) => {
        if (namePage === "activity") {
            return "Les Activités"
        } else if (namePage === "apartments") {
            return "Les Appartements"
        } else if (namePage === "interest") {
            return "Lieux d'intérêts"
        } else if (namePage === "about") {
            return "A Savoir"
        } else {
            return namePage
        }
    };

    return (
        <Layout>
            <SEO title={translatePageName(pageContext.page)}/>
            <Header pathPage={allFirebaseData.nodes[0].page}/>
            <ContainerBodyPage>
                <TitleStyled>{translatePageName(allFirebaseData.nodes[0].page)} :</TitleStyled>
                {allFirebaseData.nodes.filter(art => art.type === "article").map((article, index) => {
                    return (
                        <ArticleContent position={index % 2 === 0 ? "left" : "right"} key={article.uid}>
                            <ContainerImg position={index % 2 === 0 ? "left" : "right"}>
                                <a href={article.urlImage} target="_blank" rel="noopener noreferrer">
                                    <StyledImg position={index % 2 === 0 ? "left" : "right"}
                                               fluid={article.fileFirebase.childImageSharp.fluid}
                                               alt={article.articleTitle}/>
                                </a>
                            </ContainerImg>
                            <ArticleBody position={index % 2 === 0 ? "left" : "right"}>
                                <div>
                                    <ArticleTitle>{article.articleTitle}</ArticleTitle>
                                    <ArticleLocation>{article.location}</ArticleLocation>
                                </div>

                                <p>{article.content}</p>
                                {(article.source && article.source !== "none") &&
                                <SourceLink href={article.source} target="_blank" rel="noopener noreferrer"><span>Voir la source</span></SourceLink>}
                            </ArticleBody>
                        </ArticleContent>
                    )
                })}
            </ContainerBodyPage>
        </Layout>
    );
};

export const query = graphql`
    query($page: String!) {
        allFirebaseData(filter: {page: {eq: $page}}) {
            nodes {
                articleTitle
                location
                content
                source
                page
                name
                uid
                type
                urlImage
                    fileFirebase {
                        childImageSharp {
                            fluid(maxWidth: 400, maxHeight: 250) {
                                ...GatsbyImageSharpFluid
                                originalName
                        }
                    }
                }
            }
        }
    }
`;

const ContainerBodyPage = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 90%;
    `;

const TitleStyled = styled.h1`
    color: ${props => props.theme.color.secondary};
    letter-spacing: 1px;
    border-bottom: 1px solid ${props => props.theme.color.secondary};
    font-size: 1.7rem;
    padding-bottom: 0.2rem;
    `;

const ArticleContent = styled.article`   
    margin-bottom: 2rem;
        @media only screen and (min-width:750px) {      
            display: flex;
            justify-content: space-between;        
            margin: 4rem auto;                                                     
        }
    `;

const ContainerImg = styled.div`
    @media only screen and (min-width:750px) {
        position: relative;
        width: 40%;
        align-self: center;
        order: ${props => props.position === "right" ? 1 : 0};
        transition: transform .7s ease-in-out .7s;      
        &:hover {
            transform: scale(1.1);
        }                        
    }
    `;

const StyledImg = styled(Img)`
    border: ${props => props.theme.color.secondary} 1px solid;
    margin-bottom: 20px;
    @media only screen and (min-width:750px) {    
        border: none;  
        position: relative;
        height: auto;
        overflow: visible !important;
        &::before {
            content: "";
            border: #C89446 1px solid;
            width: 100%;
            height: 100%;
            top: -30px;
            left: ${props => props.position === "right" ? "30px" : "-30px"};
            position: absolute;
            z-index: -0;
        }     
    }
    `;

const ArticleBody = styled.div`
    align-self: center;
        p {
            padding: 1rem 0 0.8rem 0;
            font-size: 0.9rem;
        }
    @media only screen and (min-width:750px) {      
        width: 50%;
        align-self: center;
        background: ${props => props.position === "right" ? "linear-gradient(90deg,rgba(200, 148, 70, 0.6) 0%,rgba(200, 148, 70, 0.3) 50%,rgba(200, 148, 70, 0.1) 100%)" : "linear-gradient(90deg,rgba(200, 148, 70, 0.1) 0%,rgba(200, 148, 70, 0.3) 50%,rgba(200, 148, 70, 0.6) 100%);"};
        box-shadow: ${props => props.position === "right" ? "-6px 15px 25px 0 rgba(0,0,0,0.3)" : "6px 15px 25px 0 rgba(0,0,0,0.3)"};         
        padding: 1rem;                   
    }
    `;

const ArticleTitle = styled.h2`            
    text-transform: none;
    color: ${props => props.theme.color.secondary};
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
    &::before {
        display: block;
        content: "";
        width: 24px;
        height: 2px;
        background: #C89446;
        margin-bottom: 10px;
        clear: both;
    }  
    `;

const ArticleLocation = styled.span`
    font-size: 0.7rem;
    font-weight: 700;
    `;

const SourceLink = styled.a`
    color: ${props => props.theme.color.secondary};                   
    @media only screen and (min-width:750px) {
        text-decoration: none;          
        span {               
            font-size: 0.9rem;
            &:hover {
                text-decoration: underline;
            }
        }              
    }
    `;



