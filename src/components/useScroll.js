import { useState, useEffect } from "react";

export function useScroll() {

    const [bodyOffset, setBodyOffset] = useState(
        typeof window === "undefined" || !window.document ? 0 : document.body.getBoundingClientRect()
    );
    const [scrollY, setScrollY] = useState(bodyOffset.top);


    const listener = e => {
        setBodyOffset(typeof window === "undefined" || !window.document ? 0 : document.body.getBoundingClientRect());
        setScrollY(-bodyOffset.top);
    };

    useEffect(() => {

        window.addEventListener("scroll", listener);
        return () => {
            window.removeEventListener("scroll", listener);
        };
    });

    return scrollY

}
