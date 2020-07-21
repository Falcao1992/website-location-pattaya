require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

const {
    NODE_ENV,
    URL: NETLIFY_SITE_URL = 'https://website-pattaya.netlify.app',
    DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
    CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env;

const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

console.log(NETLIFY_ENV, "NETLIFY_ENV")
console.log(NODE_ENV, "NODE_ENV")

module.exports = {
    siteMetadata: {
        title: `Location d'Appartements Particulier à Pattaya`,
        description: `Envie de voyayer en Thaïlande ? nous vous proposons des appartements à louer pour passer des vacances de rêve.`,
        author: `Eduardo Lépine`,
        siteUrl: siteUrl,
        social: {
            twitter: `eduardo`,
        },
    },
    plugins: [
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                resolveEnv: () => NETLIFY_ENV,
                env: {
                    production: {
                        policy: [{userAgent: '*'}],
                    },
                    'branch-deploy': {
                        policy: [{userAgent: '*', disallow: ['/']}],
                        sitemap: null,
                        host: null,
                    },
                    'deploy-preview': {
                        policy: [{userAgent: '*', disallow: ['/']}],
                        sitemap: null,
                        host: null,
                    },
                },
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-remote-images`,
            options: {
                nodeType: 'firebaseData',
                imagePath: 'urlImage',
                name: 'fileFirebase',
            },
        },

        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [
                    {
                        family: `Inknut Antiqua`,
                        variants: [`300`,`500`, `700`]
                    },
                    {
                        family: `Pinyon Script`,
                    },
                ],
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        'gatsby-plugin-offline',
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Location appartements Pattaya`,
                short_name: `Location appartements Pattaya`,
                start_url: `/`,
                background_color: `black`,
                theme_color: `black`,
                display: `standalone`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        `gatsby-background-image-es5`,
        {
            resolve: 'gatsby-background-image-es5',
            options: {
                // add your own characters to escape, replacing the default ':/'
                specialChars: '/:',
            },
        },
        {
            resolve: `gatsby-plugin-styled-components`,
            options: {
                // Add any options here
            },
        },
        {
            resolve: `gatsby-plugin-material-ui`,
            options: {
                stylesProvider: {
                    injectFirst: true,
                },
            },
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
};
