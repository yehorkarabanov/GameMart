import React from "react";
import {useDispatch} from "react-redux";
import {logOut} from "../redux/slices/userSlice";
import {Link} from "react-router-dom";

export const Account = () => {
    const dispatch = useDispatch();
    const onClickLogout = () => {
        dispatch(logOut());
    }
    return (
        <>
            <Link to={'/'} onClick={onClickLogout}>Log Out</Link>
        </>
    );

}