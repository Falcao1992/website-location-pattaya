import React from "react";
import {graphql} from "gatsby";
import {Link} from 'gatsby'
import Layout from "../components/layout";
import Img from "gatsby-image"
import styled from "styled-components";

export default ({data}) => {

    const {allFirebaseData} = data;
    return (
        <Layout>
            <ContainerBodyPage>
                {console.log("data", data)}
                {data && allFirebaseData.nodes.map(article => {
                    return (
                        <ArticleContent key={article.uid}>
                        <ContainerImg>
                            <StyledImg fluid={article.fileFirebase.childImageSharp.fluid}/>
                        </ContainerImg>
                            <ArticleBody>
                                <ArticleLocation><span>{article.articleTitle}</span>{article.location}</ArticleLocation>
                                <p>{article.content}</p>
                                {article.page === "home" &&
                                <SeeMoreLink to={`/${article.name}`}><span>voir plus ></span></SeeMoreLink>}
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
                page
                name
                uid
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
    `

const ArticleContent = styled.div`
          padding: 5px 10px;       
          margin-bottom: 20px;
          @media only screen and (min-width:980px) {      
              width: 70%;
                margin: 50px auto;
                display: flex;
                justify-content: flex-start;            
            }
    `;
const ArticleBody = styled.div`
    align-self: center;
    @media only screen and (min-width:980px) {      
              width: 40%;                     
            }
    `;

const ArticleLocation = styled.h3`
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        line-height: 1.2;
        margin-left: 5px;
           span {
            text-transform: none;
            font-family: 'pinyon script' , sans-serif;
            color: ${props => props.theme.color.secondary};
            display: block;
            font-size: 2.1rem;
            letter-spacing: 1px;
           }
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

const SeeMoreLink = styled(Link)`
        text-decoration: none;
            span {
                color: ${props => props.theme.color.secondary};
                &:hover {
                    text-decoration: underline;
                }
            }
    `;

const ContainerImg = styled.div`
    @media only screen and (min-width:980px) {
        position: relative;
            width: 40%;
    margin-right: auto;
        align-self: center;                            
    }
`;

const StyledImg = styled(Img)`
    border: ${props => props.theme.color.secondary} 1px solid;
    margin-bottom: 20px;
    @media only screen and (min-width:980px) {    
        border: none;
        width: 30vw;     
        position: relative;
        z-index: 1;
        height: auto;
        overflow: visible !important;
        &::before {
            content: "";
            border: #C89446 1px solid;
            width: 100%;
            height: 100%;
            top: -30px;
            left: -30px;
            position: absolute;
            z-index: -0;
        }     
    }
    `;
