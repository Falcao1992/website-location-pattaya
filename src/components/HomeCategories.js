import React from 'react'
import {graphql, StaticQuery, Link} from 'gatsby'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image-es5'
import "./HomeCategories.css"
import "typeface-pinyon-script"

import { Controller, Scene } from "react-scrollmagic";

const HomeCategories = ({className}) => (
    <StaticQuery
        query={graphql`
        query {
            welcomePicture: file(relativePath: { eq: "welcomePicture.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            apartmentPicture: file(relativePath: { eq: "apartmentPicture.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            activityPicture: file(relativePath: { eq: "activityPicture.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
           
            interestPicture: file(relativePath: { eq: "interestPicture.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            
            contactPicture: file(relativePath: { eq: "contactPicture.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 800) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
        `}
        render={data => {
            const allCategory = [
                {fluid:data.apartmentPicture.childImageSharp.fluid, backgroundColorDescription:"#21511be3", title: "Nos Appartements", page: "apartments"},
                {fluid:data.activityPicture.childImageSharp.fluid, backgroundColorDescription:"#e84c49", title: "Les Activitées", page: "activity"},
                {fluid:data.welcomePicture.childImageSharp.fluid, backgroundColorDescription:"#296074", title: "A Propos", page: "/about"},
                {fluid:data.interestPicture.childImageSharp.fluid, backgroundColorDescription:"#296074", title: "les lieux d'interets", page: "/interest"},
                {fluid:data.contactPicture.childImageSharp.fluid, backgroundColorDescription:"#296074", title: "nous contacter", page: "/contact"},
            ];

            const handleChooseBackgroundImageScroll = (img) => {
                return [`linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(28, 28, 28, 0.1))`, img]
            };

            return (
                <div>
                    {allCategory.map((category, index) => {
                        return (
                            <Controller key={index}>
                            <Scene
                                triggerElement={`.box${index}`}
                                classToggle={[`.box${index}`, "fade-in"]}
                                offset={-100}
                                indicators={false}
                                reverse={false}
                            >
                            <ContainerBackgroundDescription
                                backgroundColor={category.backgroundColorDescription}>
                            <BackgroundImage
                                Tag="div"
                                className={className}
                                fluid={handleChooseBackgroundImageScroll(category.fluid)}
                                backgroundColor={`#040e18`}
                            />
                                <DescriptionBlock className={`box${index}`}>
                                    <h2>{category.title}</h2>
                                    <p>Note that the development build is not optimized.Note that the development build is not optimized.</p>
                                    <SeeMoreLink to={`/${category.page}`}><span>voir plus ></span></SeeMoreLink>
                                </DescriptionBlock>
                            </ContainerBackgroundDescription>
                            </Scene>
                            </Controller>
                        )
                    })}

                </div>
            )
        }}
    />
);

const ContainerBackgroundDescription = styled.section`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.backgroundColor}
    `;

const DescriptionBlock = styled.div`
    width: 70%;
    margin: 15px auto;
    color: ${props => props.theme.color.primary};
    font-family: ${props => props.theme.font.primary};
    letter-spacing: 1px;
        h2 {
            font-family: ${props => props.theme.font.secondary};
            color: ${props => props.theme.color.secondary};
            font-size: 2rem;
            letter-spacing: 3px;
            padding-top: 15px;
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

const StyledCategoryImageParallax = styled(HomeCategories)`
    width: 100%;
    height: 63vh;
    background-attachment: fixed;
    background-size: cover;
    background-position: bottom;
    overflow: hidden;
`;

export default StyledCategoryImageParallax
