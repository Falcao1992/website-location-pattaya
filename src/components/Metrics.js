import React, {useState} from "react";
import {useScroll} from "./useScroll";
import CountUp from 'react-countup';
import styled from "styled-components";

import iconFish from "../assets/icons/iconFish.png"
import iconIsland from "../assets/icons/iconIsland.png"
import iconTemple from "../assets/icons/iconTemple.png"
import iconTempSea from "../assets/icons/iconTempSea.png"


const Metrics = () => {

    const [scrollMarkerReached, setScrollMarkerReached] = useState(false);
    const scrollY = useScroll();

    const checkScrollMarker = () => {
        if (scrollY > 150 && !scrollMarkerReached) {
            console.log("marker atteint")
            setScrollMarkerReached(true)
        }
    };

    return (
        <ContainerMetrics>
            {checkScrollMarker()}
            <div>
                <div>
                    <IconsStyled src={iconTempSea} alt="icon temperature sea" />
                {scrollMarkerReached ?
                    <MetricSpanStyled><CountUp end={29} duration={3} suffix={" °C"}/></MetricSpanStyled> :
                    <MetricSpanStyled>0</MetricSpanStyled>}
                <p>Temp. de la mer (moy)</p>
                </div>
                <div>
                    <IconsStyled src={iconIsland} alt="icon Island" />
                {scrollMarkerReached ?
                    <MetricSpanStyled><CountUp end={1430} duration={3} separator={" "}/></MetricSpanStyled> :
                    <MetricSpanStyled>0</MetricSpanStyled>}
                <p>Nb. d'iles</p>
                </div>
            </div>
            <div>
                <div>
                    <IconsStyled src={iconFish} alt="icon Fish" />
                    {scrollMarkerReached ?
                    <MetricSpanStyled><CountUp end={1300} duration={3} separator={" "}/></MetricSpanStyled> :
                    <MetricSpanStyled>0</MetricSpanStyled>}
                <p>Espèces. poissons</p>
                </div>
                <div>
                    <IconsStyled src={iconTemple} alt="icon Temple" />
                    {scrollMarkerReached ?
                    <MetricSpanStyled><CountUp end={40000} duration={3} separator={" "}/></MetricSpanStyled> :
                    <MetricSpanStyled>0</MetricSpanStyled>}
                <p>Temples</p>
                </div>
            </div>
        </ContainerMetrics>
    )
};

const IconsStyled = styled.img`
    width: 2.5rem;
    margin-bottom: 0.5rem;
    @media only screen and (min-width: 850px) {
        width: 3.5rem;
    }
`;

const ContainerMetrics = styled.div`
    flex-direction: column;
    display: flex;
    align-items: center;
    padding: 1rem 0;
    background: rgb(11, 11, 11);
    color: ${props => props.theme.color.primary};
    font-family: ${props => props.theme.font.primary};    
    @media only screen and (min-width:750px) {
        flex-direction: row;
        padding: 2rem 0;
        margin: 0.25rem 0;
    }  
    p {
        margin-top: 0.5rem;
    }   
    > div {
        width: 100%;
        padding: 0.8rem;
        display: flex;
        justify-content: space-between;
            div {
                text-align: center;
                width: 50%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
        }
    `;

const MetricSpanStyled = styled.span`
    font-size: 1.5rem;
    `;

export default Metrics
