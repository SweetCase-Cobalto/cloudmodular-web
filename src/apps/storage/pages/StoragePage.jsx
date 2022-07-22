import { useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";

import { receiveDataForStoragePage } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { updateMyAccount } from "../../../reducers/myAccount";
import { updateCurrentStorageList } from "../../../reducers/storageResult";
import { Helmet } from "react-helmet";
import Header from "../../../components/common/Header";


const StoragePage = () => {
    const [searchParams, ] = useSearchParams(); // Query Params
    const [cookie, , ] = useCookies(['token', 'user_id']);
    const dispatch = useDispatch();  // Redux
    let rootId = searchParams.get('id');   // 검색 대상의 디렉토리 아이디
    // redux data
    const myAccount = useSelector(state => state.myAccount);
    const currentDir = useSelector(state => state.storageResult);
    // data for components
    if(!currentDir.isFetched) {
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
                dispatch(updateCurrentStorageList(res.storages, res.rootName));
            } else {
                // 오류
                alert(res.data);
                window.location.replace('/login');
            }
        })
    } else {
        // 컴포넌트 생성
    }
    // 렌더링
    if(!currentDir.isFetched) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        )
    } else {
        return (
            <div>
                <Header />
                <Helmet>
                    <title>{currentDir.rootName}</title>
                </Helmet>
            </div>
        )
    }
}
export default StoragePage;