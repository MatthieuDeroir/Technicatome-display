import React, { useState, useEffect, useRef } from 'react';
import './ScrollingText.css'; // Importer le fichier CSS

function ScrollingText({ text }) {
    const textRef = useRef(null);
    const containerRef = useRef(null);
    const [textWidth, setTextWidth] = useState(0);

    useEffect(() => {
        const textElement = textRef.current;
        const containerElement = containerRef.current;
        if (textElement && containerElement) {
            const width = textElement.scrollWidth > containerElement.clientWidth ?
                textElement.scrollWidth + 10 : containerElement.clientWidth;
            setTextWidth(width);
        }
    }, [text]);

    useEffect(() => {
        console.log('textRef:', textRef.current);
        console.log('containerRef:', containerRef.current);
    }, []);


    return (
        <div className="scrolling-container" ref={containerRef}>
            <div className="scrolling-text" style={{ width: textWidth }} ref={textRef}>
                {text}
            </div>
        </div>
    );
}


export default ScrollingText;
