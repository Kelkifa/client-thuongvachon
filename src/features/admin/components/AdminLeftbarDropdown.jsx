import './adminLeftbarDropdown.scss';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { linkStyle } from 'assets/styles/styles';

AdminLeftbarDropdown.propTypes = {
    iconComponennt: PropTypes.element,
    showText: PropTypes.string,
    hideTextList: PropTypes.array,

    handleClick:PropTypes.func,
    isShow:PropTypes.bool,
};

AdminLeftbarDropdown.defaultProps = {
    iconComponennt: null,
    showText:null,
    hideTextList:[],

    handleClick:null,
    isShow:false,
}

function AdminLeftbarDropdown(props) {
    // PROPS
    const {
        iconComponennt, showText, hideTextList,
        handleClick, isShow
    } = props;


    return (
        <div className="AdminLeftbarDropdown grid">
            <div 
                className={
                    isShow 
                    ? "AdminLeftbarDropdown__show AdminLeftbarDropdown__show--active row-c14"
                    : "AdminLeftbarDropdown__show row-c14"
                }
                onClick={handleClick}
            >
                <div className="AdminLeftbarDropdown__show__icon c-2">
                    {iconComponennt}
                </div>
                <div className="c-10">{showText}</div>
                <RiArrowDropDownLine 
                    className={
                        isShow ?
                        'c-2 AdminLeftbarDropdown__show__icon' :
                        'c-2 AdminLeftbarDropdown__show__icon animation--rotate90'
                    }
                />
            </div>
            {isShow &&
                <ul className="AdminLeftbarDropdown__hide">
                    {hideTextList.map((value, index)=> 
                        <Link key={value.text+index} to={value.to} style={linkStyle}>
                            <li className="AdminLeftbarDropdown__hide__item row-c14">
                                <div className="AdminLeftbarDropdown__hide__item__text">{value.text}</div>
                            </li>
                        </Link>   
                    )}
                </ul>
            }
        </div>
    );
}

export default AdminLeftbarDropdown;