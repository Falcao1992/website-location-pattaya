import React from 'react'
import {graphql, StaticQuery} from 'gatsby'
import styled from 'styled-components'

import BackgroundImage from 'gatsby-background-image-es5'

const BackgroundHomeSection = ({className}) => (
    <StaticQuery
        query={graphql`
        query {
            welcomePicture: file(relativePath: { eq: "welcomePicture.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            apartmentPicture: file(relativePath: { eq: "apartmentPicture.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
            activityPicture: file(relativePath: { eq: "activityPicture.jpg" }) {
                childImageSharp {
                    fluid(quality: 90, maxWidth: 1920) {
                        ...GatsbyImageSharpFluid_withWebp
                    }
                }
            }
        }
        `}
        render={data => {
            const allBackgroundImage = [data.welcomePicture.childImageSharp.fluid, data.apartmentPicture.childImageSharp.fluid, data.activityPicture.childImageSharp.fluid]
            console.log(allBackgroundImage)

            const handleChooseBackgroundImageScroll = (img) => {
                return [`linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(28, 28, 28, 0.1))`, img]
            };

            return (
                <>
                    {allBackgroundImage.map((image, index) => {
                        return (
                            <BackgroundImage
                                key={index}
                                Tag="section"
                                className={className}
                                fluid={handleChooseBackgroundImageScroll(image)}
                                backgroundColor={`#040e18`}
                            >
                                <H2Styled>gatsby-background-image</H2Styled>
                            </BackgroundImage>
                        )
                    })}
                </>
            )
        }}
    />
)
const H2Styled = styled.div`
height: 500px;
`

const StyledBackgroundHomeSection = styled(BackgroundHomeSection)`
  background-attachment: fixed;
  height: 100%;
  background-size: cover;
  background-position: center;
  overflow: hidden;
`

export default StyledBackgroundHomeSection
