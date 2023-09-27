import React, { useState, useEffect } from 'react';

function DateTime() {
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <p>{dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}</p>
        </div>
    );
}

export default DateTime;
