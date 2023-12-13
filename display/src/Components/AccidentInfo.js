import React from 'react';

function AccidentInfo({ accidentData: { daysWithoutAccident, recordDaysWithoutAccident, numberOfAccidentsSinceStartOfTheYear }}) {
    return (
        <div>
            <p>Days Without Accident: {daysWithoutAccident}</p>
            <p>Record Days Without Accident: {recordDaysWithoutAccident}</p>
            <p>Number of Accidents Since Start of the Year: {numberOfAccidentsSinceStartOfTheYear}</p>
        </div>
    );
}

export default AccidentInfo;
