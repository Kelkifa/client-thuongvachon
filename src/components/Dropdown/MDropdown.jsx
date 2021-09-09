import React, { useState } from 'react';

function MDropdown(props) {
    // PROPS
    const {hideComponent, children} = props;

    // STATES
    const [isShow, setIsShow] = useState(false);

    // HANDLE FUNCTIONS
    const handleClick = ()=>{
        setIsShow(!isShow);
        // console.log('value');
    }

    // RENDER
    return (
        <>
            {children(handleClick, isShow)}
            {isShow && hideComponent}
        </>
    );
}

export default MDropdown;