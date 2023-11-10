import React from "react";
import styles from './GameBlock.module.scss';

export const GameCart = ({pk, name, image, price}) => {
    return (
        <div className={`d-flex justify-content-center container`}>
            <div className={`card p-3 bg-white`}>
                <i className={`bi bi-steam`}></i>
                <div className={`about-product text-center mt-2`}>
                    <img className={`img-fluid`} src={image}/>
                    <div>
                        <h4>{name}</h4>
                    </div>
                </div>
                <div className={`stats mt-2`}>
                    <div className={`d-flex justify-content-between p-price`}>
                        <span>{name} steam</span><span>${price}</span>
                    </div>
                </div>
                <div className={`d-flex justify-content-between total font-weight-bold mt-4`}>
                    <box-icon name='heart'></box-icon>
                    <box-icon name='cart'></box-icon>
                </div>
            </div>
        </div>
    );
}