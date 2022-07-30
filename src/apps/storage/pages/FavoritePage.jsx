import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";

import { updateMyAccount } from "../../../reducers/myAccount";
import { updateCurrentStorageList } from "../../../reducers/storageResult";
import { receiveDataForFavoritePage } from "../api";
import Header from "../../../components/common/Header";
import { DesktopCenterLayer, DesktopLeftLayer, DesktopRightLayer } from "../../../components/common/Layers";
import FileStatusComponent from "../components/FileStatusComponent";
import { DesktopLayer, Desktop } from "../../../components/common/ScreenResponsive";
import { Title } from "../../../components/common/Titles";
import { MainFullLine } from "../../../components/common/Lines";
import StorageListComponent from "../components/StorageListComponent";

const FavoritePage = () => {
    const [cookie, ,] = useCookies(['token', 'user_id']);
    const dispatch = useDispatch();
    // redux data
    const resultFavorites = useSelector(state => state.storageResult);

    if(!resultFavorites.isFetched) {
        // 서버로부터 데이터 로드
        const token = cookie.token;
        const userId = cookie.user_id;
        receiveDataForFavoritePage(token, userId)
        .then((res) => {
            if(res.err === 200) {
                // Redux Update
                dispatch(updateMyAccount(res.user));
                dispatch(updateCurrentStorageList(res.storages, res.rootName));
            } else {
                // 오류
                if(res.err === 401 || res.err === 422)
                    window.location.replace('login');
                alert(res.data);
            }
        })
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    } else {
        // 데이터 수집 완료
        return (
            <div>
                <Header />
                <Helmet>
                    <title>Favorites</title>
                </Helmet>
                <Desktop>
                    <div style={{display: "flex"}}>
                        <DesktopLeftLayer />
                        <DesktopCenterLayer>
                            <DesktopLayer style={{paddingTop: "50px"}}>
                                <Title>Favorites</Title>
                                <MainFullLine />
                                <StorageListComponent />
                            </DesktopLayer>
                        </DesktopCenterLayer>
                        <DesktopRightLayer>
                            <FileStatusComponent />
                        </DesktopRightLayer>
                    </div>
                </Desktop>
            </div>
        );
    }
}
export default FavoritePage;