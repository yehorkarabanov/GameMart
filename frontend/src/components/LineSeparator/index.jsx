import React from "react";
import styles from './LineSeparator.module.scss';

export const LineSeparator = ({text}) => {
    return (
        <div className={`container my-5`}>
            <div className={styles.hrSect}>
                {text}
            </div>
        </div>
    );
}