import axios from "axios";
import { useHistory } from "react-router-dom";
import React from 'react'
export const session = async(historyProp) => {
    debugger
    const history = !historyProp ? useHistory() : historyProp;
    try {
        var user = localStorage.getItem("userInfo");
        let headers = {}
        headers["x-access-token"] = '' + localStorage.getItem("utoken");
        let res = await axios.post("/api/admin/revalidsignin", { user }, {
            headers: headers
        })
        if (res.status === 200) {
            localStorage.setItem("utoken", res.data.user.token);

        } else {
            history.push('./admin/login');
        }
    } catch (error) {
        console.log(error);
        localStorage.setItem("userInfo", '');
        localStorage.setItem("utoken", '');
        history.push('/admin/login');
    }

}