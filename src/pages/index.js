import React from "react"
import {Link} from "gatsby"

import Layout from "../components/layout"
import StyledBackgroundHomeSection from "../components/image";
import SEO from "../components/seo"

const IndexPage = () => (
    <Layout>
        <SEO title="Home"/>
        <StyledBackgroundHomeSection/>
        <Link to="/page-2/">Go to page 2</Link>
    </Layout>
);

export default IndexPage
