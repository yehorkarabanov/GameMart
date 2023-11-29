import React from "react";
import styles from "./LikeBlock.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {GameCart} from "../GameBlock/GameCart";


export const LikeBlock = () => {
    const like = useSelector(state => state.like.items);
    const items_display = like.map(obj => <GameCart key={obj.pk} {...obj}/>);

    return (
        <div className={`container`}>
            <div className={styles.gridContainer}>
                {items_display}
            </div>
        </div>
    );
}