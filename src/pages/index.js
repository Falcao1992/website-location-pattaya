import React from "react"
import Layout from "../components/layout"
import HomeCategories from "../components/HomeCategories";
import SEO from "../components/seo"
import Header from "../components/Header";

import Metrics from "../components/Metrics";

const IndexPage = () => {

    return (
        <Layout>
            <SEO title="Accueil" />
            <Header pathPage={"/"}/>
            <Metrics/>
            <HomeCategories/>
        </Layout>
    )
};

export default IndexPage

