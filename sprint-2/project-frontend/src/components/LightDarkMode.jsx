/* (From Darkest to Lightest) #194569 #5F84A2 #91AEC4 #B7D0E1 #CADEED #DBECF4*/
import React from 'react';
import './Header.css';

const LightDarkMode = ({toggleTheme}) => {
    return (
        <div className="light-dark-mode">
            <button className="mode-button" onClick={toggleTheme}>Light/Dark</button>
        </div>
    );
};

export default LightDarkMode;