import React from "react"
import Layout from "../components/layout"
import HomeCategories from "../components/HomeCategories";
import SEO from "../components/seo"
import Header from "../components/Header";

const IndexPage = () => (
    <Layout>
        <SEO title="Home"/>
        <Header pathPage={"/"} />
        <HomeCategories/>
    </Layout>
);

export default IndexPage
