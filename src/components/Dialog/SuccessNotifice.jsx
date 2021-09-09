import './notifice.scss';

import {MdDone} from 'react-icons/md';
import React from 'react';

function SuccessNotifice(props) {
    return (
        <div className="dialog-container">
            <div className="dialog__content">
                <div className="dialog__content__icon">
                    <MdDone className="icon icon--success" />
                </div>
                <p className="dialog__content__text">
                    Đã thêm sản phẩm vào giỏ hàng
                </p>
            </div>
        </div>
    );
}

export default SuccessNotifice;