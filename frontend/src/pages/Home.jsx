import React from "react";
import {Header} from "../components/Header";
import {Slider} from "../components/Slider";
import {GameBlock} from "../components/GameBlock";
import {LineSeparator} from "../components/LineSeparator";
import {Footer} from "../components/Footer";

export const Home = () => {
    return (
        <>
            <Header/>
            <Slider/>
            <LineSeparator text={"Games"}/>
            <GameBlock/>
            <Footer/>
        </>
    );

}