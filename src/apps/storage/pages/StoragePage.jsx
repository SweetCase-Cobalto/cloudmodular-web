import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";

import { receiveDataForStoragePage } from "../api";

const StoragePage = () => {
    const [searchParams, ] = useSearchParams();
    const [loaded, setLoaded] = useState(false);
    const [cookie, , ] = useCookies(['token', 'user_id']);
    let rootId = searchParams.get('id');   // 검색 대상의 디렉토리 아이디

    if(!loaded) {
        /*
         * 데이터 로드가 안되어 있는 경우
         * 서버로부터 데이터를 받아온다.
        */
        if(rootId === null) {
            // 404 Error
            window.location.href = '/error/404';
        }
        const token = cookie.token;
        const userId = cookie.user_id;
        // 서버로부터 받아오기 
        receiveDataForStoragePage(token, userId, rootId)
            .then((res) => {
                if(res.err == 200) {
                    // TODO Redux 저장
                    // 임시: 변환 표시
                    setLoaded(true);
                } else {
                    // 오류
                    alert(res.data);
                    window.location.replace('/login');
                }
            })
    }

    if(!loaded) {
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