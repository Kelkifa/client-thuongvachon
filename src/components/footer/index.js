import "./index.scss";

import { AiOutlineGithub } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa'
import React from 'react';

Footer.propTypes = {

};

function Footer(props) {
    return (
        <div className="footer">
            <div className="footer__icon">
                <a href="https://www.facebook.com/kelkfia/" target="_blank" className="footer__icon__item" rel="noreferrer"><FaFacebookF /></a>
                <a href="https://github.com/Kelkifa" target="_blank" className="footer__icon__item" rel="noreferrer">
                    <AiOutlineGithub />
                </a>

            </div>
            {/* <FaGoogle /> */}
            <address className="footer__contact">
                <div className="footer__contact__label">Contact and feedback</div><div className="footer__contact__email">plhuan455@gmail.com</div>
            </address>
            <div className="footer__source">Background Photo by Polina Kovaleva from Pexels</div>
        </div>
    );
}

export default Footer;