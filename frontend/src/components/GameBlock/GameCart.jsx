import React from "react";
import styles from './GameBlock.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {toggleLikeItem} from "../../redux/slices/likeSlice";
import {BiHeart} from "react-icons/bi";
import {apiLoginInstance} from "../../utils/axios";

export const GameCart = ({pk, name, image, price}) => {
    const dispatch = useDispatch();
    const isitem = useSelector(state => state.like.items.find(obj => obj.pk === pk));

    const toggleLikeOnClick = async () => {
        dispatch(toggleLikeItem({pk, name, image, price}));
        const instance = await apiLoginInstance();
        if (instance != null) {
            try {
                if (!isitem) {
                    await instance.post("like/like/", {"game": pk});
                } else {
                    await instance.delete("like/like/", {data:{"game": pk}});
                }
            } catch (e) {
                console.log("error with like api");
            }
        }
    };
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
                    <div onClick={toggleLikeOnClick} className={styles.pointer}>
                        <box-icon type='solid' name='heart' style={!isitem ? {display: "none"} : {}}></box-icon>
                        <box-icon name='heart' style={isitem ? {display: "none"} : {}}></box-icon>
                    </div>
                    <div>
                        <box-icon name='cart'></box-icon>
                    </div>
                </div>
            </div>
        </div>
    );
}