import {Navigate} from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export const HomeLayout = () => {
    const dispatch = useDispatch();

    return <Dashboard />
};
