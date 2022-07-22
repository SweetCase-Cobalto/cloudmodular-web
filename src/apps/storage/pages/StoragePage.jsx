import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";

import { receiveDataForStoragePage } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { updateMyAccount } from "../../../reducers/myAccount";

const StoragePage = () => {
    const [searchParams, ] = useSearchParams(); // Query Params
    const [cookie, , ] = useCookies(['token', 'user_id']);
    const dispatch = useDispatch();  // Redux
    let rootId = searchParams.get('id');   // 검색 대상의 디렉토리 아이디

    const myAccount = useSelector(state => state.myAccount);
    if(myAccount.name === null) {
        /*
         * 데이터 로드가 안되어 있는 경우
         * 서버로부터 데이터를 받아온다.
        */
        if(rootId === null) {
            // 404 Error
            window.location.href = '/error/404';
        }
        // 서버로부터 받아오기 
        const token = cookie.token;
        const userId = cookie.user_id;
        receiveDataForStoragePage(token, userId, rootId)
        .then((res) => {
            if(res.err === 200) {
                // Redux에 해당 데이터 저장
                dispatch(updateMyAccount(res.user));
            } else {
                // 오류
                alert(res.data);
                window.location.replace('/login');
            }
        })
    }

    if(myAccount.name === null) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Ok</h1>
            </div>
        )
    }
}
export default StoragePage;