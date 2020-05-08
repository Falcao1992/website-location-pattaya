import React from "react"
import Layout from "../components/layout"
import HomeCategories from "../components/HomeCategories";
import SEO from "../components/seo"
import Header from "../components/Header";
import {graphql} from 'gatsby'

import Metrics from "../components/Metrics";


const IndexPage = ({data}) => {

    const image = data.interestPicture.childImageSharp.resize;

    return (
        <Layout>
            <SEO title="Accueil" image={image}/>
            <Header pathPage={"/"}/>
            <Metrics/>
            <HomeCategories/>
        </Layout>
    )
};

export default IndexPage

export const query = graphql`
    query HomePageImage {
        interestPicture: file(relativePath: {eq: "interestPicture.jpg"}) {
            childImageSharp {
                resize(width: 1200) {
                    src
                    height
                    width
                }
            }
        }
    }
`
