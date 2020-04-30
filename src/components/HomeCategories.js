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
                {fluid:data.apartmentPicture.childImageSharp.fluid, backgroundColorDescription:"#6d1441ed", title: "Nos Appartements", page: "apartments"},
                {fluid:data.activityPicture.childImageSharp.fluid, backgroundColorDescription:"#379cc1", title: "Les Activitées", page: "activity"},
                {fluid:data.welcomePicture.childImageSharp.fluid, backgroundColorDescription:"#1f5831ed", title: "A Propos", page: "/about"},
                {fluid:data.interestPicture.childImageSharp.fluid, backgroundColorDescription:"#6d1441ed", title: "les lieux d'interets", page: "/interest"},
                {fluid:data.contactPicture.childImageSharp.fluid, backgroundColorDescription:"#379cc1", title: "nous contacter", page: "/contact"},
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
                            <BackgroundImage
                                Tag="section"
                                className={className}
                                fluid={handleChooseBackgroundImageScroll(category.fluid)}
                                backgroundColor={`#040e18`}
                            >
                                <DescriptionBlock className={`box${index}`}>
                                    <h2>{category.title}</h2>
                                    <p>Note that the development build is not optimized.Note that the development build is not optimizedNote thabuild is not optimizedNote that the development builptimized.</p>
                                    <SeeMoreLink to={`/${category.page}`}><span>voir plus ></span></SeeMoreLink>
                                </DescriptionBlock>
                            </BackgroundImage>

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
    height: 80vh;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.backgroundColor}
    `;

const DescriptionBlock = styled.div`
    position: absolute; /* postulat de départ */
    color: ${props => props.theme.color.primary};
    font-family: ${props => props.theme.font.primary};
    letter-spacing: 1px;
    text-align: center;
    background: linear-gradient(90deg,rgba(15,15,18,0.25) 0%,rgba(15, 15, 18, 0.5) 50%,rgba(15,15,18,0.85) 100%);
    box-shadow: -20px 25px 80px 0 rgba(0,0,0,0.75);
    padding: 1.3rem;
    margin: 0 0.5rem;
    width: calc(100% - 1rem);
        h2 {
            font-family: ${props => props.theme.font.secondary};
            color: ${props => props.theme.color.secondary};
            font-size: 2rem;
            letter-spacing: 3px;
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
    display: flex;
    align-items: flex-end;
    height: 80vh;
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    overflow: hidden;
    padding-bottom: 0.5rem;
    border-bottom: 4px solid ${props => props.theme.color.secondary}
`;

export default StyledCategoryImageParallax
