import React from "react";
import {Header} from "../components/Header";
import {Slider} from "../components/Slider";
import {GameBlock} from "../components/GameBlock";

export const Home = () => {
    return (
        <>
            <Header/>
            <Slider/>
            {/*add separating line*/}
            <GameBlock/>
        </>
    );

}