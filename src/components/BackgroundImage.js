import React from 'react'
import {graphql, StaticQuery, Link} from 'gatsby'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image-es5'
import "./BackgroundImage.css"
import "typeface-pinyon-script"

import { Controller, Scene } from "react-scrollmagic";

const BackgroundHomeSection = ({className}) => (
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
        }
        `}
        render={data => {
            const allBackgroundImage = [
                {fluid:data.apartmentPicture.childImageSharp.fluid, backgroundColorDescription:"#21511be3", title: "Nos Appartements", page: "apartments"},
                {fluid:data.activityPicture.childImageSharp.fluid, backgroundColorDescription:"#e84c49", title: "Les Activitées", page: "activity"},
                {fluid:data.welcomePicture.childImageSharp.fluid, backgroundColorDescription:"#296074", title: "A Propos", page: "/about"},
                {fluid:data.interestPicture.childImageSharp.fluid, backgroundColorDescription:"#296074", title: "les lieux d'interets", page: "/interest"}
            ];
            console.log(allBackgroundImage);
            console.log(className, "classname")

            const handleChooseBackgroundImageScroll = (img) => {
                return [`linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(28, 28, 28, 0.1))`, img]
            };

            return (
                <div>
                    {allBackgroundImage.map((imageObj, index) => {
                        console.log(index.toString())
                        return (
                            <Controller key={index}>
                            <Scene
                                triggerElement={`.box${index}`}
                                classToggle={[`.box${index}`, "fade-in"]}
                                offset={-100}
                                indicators={true}
                                reverse={false}
                            >
                            <ContainerBackgroundDescription
                                backgroundColor={imageObj.backgroundColorDescription}>
                            <BackgroundImage
                                Tag="div"
                                className={index === 0 ? `${className} firstBackground` : `${className}`}
                                fluid={handleChooseBackgroundImageScroll(imageObj.fluid)}
                                backgroundColor={`#040e18`}
                            />
                                <DescriptionBlock className={`box${index}`}>
                                    <h2>{imageObj.title}</h2>
                                    <p>Note that the development build is not optimized.Note that the development build is not optimized.</p>
                                    <SeeMoreLink to={`/${imageObj.page}`}><span>voir plus ></span></SeeMoreLink>
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

const StyledBackgroundHomeSection = styled(BackgroundHomeSection)`
    width: 100%;
    height: 63vh;
    background-attachment: fixed;
    background-size: cover;
    background-position: bottom;
    overflow: hidden;
`;

export default StyledBackgroundHomeSection
