import React from "react"
import PropTypes from "prop-types"
import {Helmet} from "react-helmet"
import {useStaticQuery, graphql} from "gatsby"

function SEO({description, lang, meta, keywords, title}) {


    const {site, interestPicture} = useStaticQuery(
        graphql`
        query {
            site {
                siteMetadata {
                    title
                    description
                    author
                }
            }
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
    );

    const imageSeo = interestPicture.childImageSharp.resize;
    const metaDescription = description || site.siteMetadata.description;
    const image = imageSeo && imageSeo.src ? `${site.siteMetadata.siteUrl}${imageSeo.src}` : null;

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: title,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ].concat(imageSeo ? [
                {
                    property: `og:image`,
                    content: image
                },
                {
                    property: `og:image:alt`,
                    content: title,
                },
                {
                    property: 'og:image:width',
                    content: imageSeo.width
                },
                {
                    property: 'og:image:height',
                    content: imageSeo.height
                },
                {
                    name: `twitter:card`,
                    content: `summary_large_image`,
                }
            ] : [
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
            ])
                .concat(
                    keywords.length > 0
                        ? {
                            name: `keywords`,
                            content: keywords.join(`, `),
                        }
                        : []
                )

                .concat(meta)}
        />
    )
}

SEO.defaultProps = {
    lang: `fr`,
    meta: [],
    keywords: [],
    description: ``,
};

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    image: PropTypes.object,
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
};

export default SEO
