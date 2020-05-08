import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ContactForm from "../components/ContactForm";
import Header from "../components/Header";

const SecondPage = () => (
  <Layout>
    <SEO title="Contact" />
      <Header pathPage={"contact"}/>
    <ContactForm/>
  </Layout>
);

export default SecondPage
