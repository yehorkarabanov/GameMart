import React from "react";
import styles from "./LikeBlock.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {GameCart} from "../GameBlock/GameCart";


export const LikeBlock = () => {
    const like = useSelector(state => state.like.items);

    return (
        <div className={`container`}>
            {like.length !== 0 ?
                <div className={styles.Like}>
                    <h1>Your liked items</h1>
                    <div className={styles.gridContainer}>
                        {like.map(obj => <GameCart key={obj.pk} {...obj}/>)}
                    </div>
                </div>
                :
                <div className={styles.NoLike}>
                    You don't have any item in your like list.
                </div>
            }
        </div>
    );
}