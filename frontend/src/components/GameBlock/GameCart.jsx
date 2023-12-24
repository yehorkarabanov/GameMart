import React from "react";
import styles from './GameBlock.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {toggleLike, toggleLikeItem} from "../../redux/slices/likeSlice";
import {apiLoginInstance} from "../../utils/axios";
import {Link, useNavigate} from "react-router-dom";
import {addItemToCart, addSingleItemToCart} from "../../redux/slices/cartSlice";

export const GameCart = ({pk, name, image, price, slug}) => {
    const dispatch = useDispatch();
    const isitem = useSelector(state => state.like.items.find(obj => obj.pk === pk));

    const toggleLikeOnClick = async () => {
        dispatch(toggleLike({pk, name, image, price, slug, isitem}));
    };

    const navigate = useNavigate();
    const addToCart = async () => {
        dispatch(addSingleItemToCart({pk, name, image, slug, price}))
        navigate('/cart');
    }
    return (
        <div className={`d-flex justify-content-center container`}>
            <div className={`card p-3 bg-white`}>
                <i className={`bi bi-steam`}></i>
                <Link to={`/product/${slug}`}>
                    <div className={`about-product text-center mt-2`}>
                        <img className={`img-fluid`} src={image}/>
                        <div>
                            <h4>{name}</h4>
                        </div>
                    </div>
                </Link>
                <div className={`stats mt-2`}>
                    <div className={`d-flex justify-content-between p-price`}>
                        <span>{name} steam</span><span>${price}</span>
                    </div>
                </div>
                <div className={`d-flex justify-content-between total font-weight-bold mt-4`}>
                    <div onClick={toggleLikeOnClick} className={styles.pointer}>
                        <box-icon type='solid' name='heart' style={!isitem ? {display: "none"} : {}}></box-icon>
                        <box-icon name='heart' style={isitem ? {display: "none"} : {}}></box-icon>
                    </div>
                    <div>
                        <box-icon onClick={addToCart} name='cart'></box-icon>
                    </div>
                </div>
            </div>
        </div>
    );
}