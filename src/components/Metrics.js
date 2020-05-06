import React, {useState} from "react";
import {useScroll} from "./useScroll";
import CountUp from 'react-countup';
import styled from "styled-components";

const Metrics = () => {

    const [scrollMarkerReached, setScrollMarkerReached] = useState(false);
    const scrollY = useScroll();

    const checkScrollMarker = () => {
        if (scrollY > 300 && !scrollMarkerReached) {
            console.log("marker atteint")
            setScrollMarkerReached(true)
        }
    };

    return (
        <div >
            {checkScrollMarker()}
            <p>Superficie</p>
            {scrollMarkerReached ?  <MetricSpanStyled><CountUp delay={1} end={514000} duration={6} suffix={" Km2"} separator={" "}/></MetricSpanStyled> : <MetricSpanStyled>0</MetricSpanStyled>}
            <p>Température de la mer</p>
            {scrollMarkerReached ?  <MetricSpanStyled><CountUp delay={1} end={29} duration={5} suffix={" °C"}/></MetricSpanStyled> : <MetricSpanStyled>0</MetricSpanStyled>}
            <p>Nombre d'iles</p>
            {scrollMarkerReached ?  <MetricSpanStyled><CountUp delay={1} end={1430} duration={5} separator={" "}/></MetricSpanStyled> : <MetricSpanStyled>0</MetricSpanStyled>}
            <p>espèces de poissons</p>
            {scrollMarkerReached ?  <MetricSpanStyled><CountUp delay={1} end={1300} duration={5} separator={" "}/></MetricSpanStyled> : <MetricSpanStyled>0</MetricSpanStyled>}
            <p>Population</p>
            {scrollMarkerReached ?  <MetricSpanStyled><CountUp delay={1} end={68977400} duration={7} separator={" "}/></MetricSpanStyled> : <MetricSpanStyled>0</MetricSpanStyled>}
            <p>les temples bouddhistes</p>
            {scrollMarkerReached ?  <MetricSpanStyled><CountUp delay={1} end={40000} duration={7} separator={" "}/></MetricSpanStyled> : <MetricSpanStyled>0</MetricSpanStyled>}
        </div>
    )
};

const MetricSpanStyled = styled.span`
    font-size: 3rem;
    `;

export default Metrics
