import {Subbuteo} from "./layouts/subbuteo/Subbuteo";
import {Match} from "./models/match";
import {Stadium} from "./layouts/stadium/Stadium";
import React from "react";
import { toast, ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

export const Scoreboard = ({ match }: { match: Match }) => {
    const layout = (match: Match) => {
        switch (match.layout) {
            case 'stadium':
                return (<Stadium match={match} />);
            case 'subbuteo':
            default:
                return (<Subbuteo match={match} toast={toaster} />);
        }
    }

    const toaster = (message: string): void => {
        toast(message);
    }

    return (
        <>
            {layout(match)}
            <ToastContainer autoClose={3000} style={{ fontSize: '2vw' }}/>
        </>
    );
}
