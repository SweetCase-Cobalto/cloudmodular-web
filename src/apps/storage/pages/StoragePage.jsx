import { useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

import { receiveDataForStoragePage } from "../api";
import { updateMyAccount } from "../../../reducers/myAccount";
import { updateCurrentStorageList } from "../../../reducers/storageResult";
import { Helmet } from "react-helmet";
import Header from "../../../components/common/Header";
import { Desktop, DesktopLayer, MobileLayer, Mobile } from "../../../components/common/ScreenResponsive";
import { MainFullLine } from "../../../components/common/Lines";
import StorageListComponent from "../components/StorageListComponent";
import { Title } from "../../../components/common/Titles";
import RootTagComponent from "../components/RootTagComponent";

const rootToSplitedRoot = (rootName) => {
    const splitedRootName = rootName.split("/");
    splitedRootName.pop();
    splitedRootName.pop();
    splitedRootName.unshift("/");
    return splitedRootName;
}
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
                // 401접근 권한일 경우 login으로 쫓아내기
                if(res.err === 401 || res.err === 422)
                    window.location.replace('/login');
                alert(res.data);
            }
        })
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
                <Desktop>
                    <DesktopLayer style={{paddingTop: "50px"}}>
                        <Title>Storage</Title>
                        <MainFullLine />
                        <RootTagComponent />
                        <StorageListComponent />
                    </DesktopLayer>
                </Desktop>
                <Mobile>
                    <MobileLayer>
                        <Title>Storage</Title>
                        <MainFullLine />
                        <RootTagComponent />
                        <StorageListComponent />
                    </MobileLayer>
                </Mobile>
            </div>
        )
    }
}
export default StoragePage;
