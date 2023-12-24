import {useDispatch, useSelector} from "react-redux";
import {toggleLikeItem} from "../../redux/slices/likeSlice";
import {apiLoginInstance} from "../../utils/axios";
import styles from './CartList.module.scss';
import React from "react";
import {changeCartItemAmount, changeSingleItemInCart, removeSingleItemFromCart} from "../../redux/slices/cartSlice";
import {debounce} from "lodash";
import {Link} from "react-router-dom";

export const CartListItem = ({pk, name, image, price, amount, slug}) => {
    const dispatch = useDispatch();

    const updateCartItemAmount = React.useCallback(
        debounce((pk) => {
            dispatch(changeSingleItemInCart(pk));
        }, 250),
        []
    );

    const toggleAmountInCart = (delta) => {
        dispatch(changeCartItemAmount({pk, amount: delta}));

        updateCartItemAmount(pk);
    }

    const checkUnselected = () => {
        if (amount === "") {
            toggleAmountInCart(1);
        }
    }

    const removeItem = () => {
        dispatch(removeSingleItemFromCart(pk));
    }

    return (
        <tr>
            <td>
                <div className={`${styles.Img}`}>
                    <Link to={`/product/${slug}`}>
                        <img src={image} alt="Image"/>
                        <p>{name}</p>
                    </Link>
                </div>
            </td>
            <td>${price}</td>
            <td>
                <div className={styles.Qty}>
                    <button className={styles.BtnPlus} onClick={() => toggleAmountInCart(amount - 1)}><i
                        className="bi bi-dash-lg"></i></button>
                    <input type="text" value={amount} onChange={(event) => {
                        toggleAmountInCart(event.target.value)
                    }} onBlur={() => {
                        checkUnselected()
                    }}/>
                    <button className={styles.BtnMinus} onClick={() => toggleAmountInCart(amount + 1)}><i
                        className="bi bi-plus-lg"></i></button>
                </div>
            </td>
            <td>${(amount * price).toFixed(2)}</td>
            <td>
                <button onClick={() => removeItem()}><i className="bi bi-trash"></i></button>
            </td>
        </tr>
    );
}