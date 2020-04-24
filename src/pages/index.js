import React from "react"
import Layout from "../components/layout"
import StyledBackgroundHomeSection from "../components/BackgroundImage";
import SEO from "../components/seo"

const IndexPage = () => (
    <Layout>
        <SEO title="Home"/>
        <StyledBackgroundHomeSection/>
    </Layout>
);

export default IndexPage
