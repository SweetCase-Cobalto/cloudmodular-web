import { useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { receiveDataForSearchPage } from "../api";
import { updateMyAccount } from "../../../reducers/myAccount";
import { updateCurrentStorageList } from "../../../reducers/storageResult";
import Header from "../../../components/common/Header";
import { Helmet } from "react-helmet";
import { DesktopCenterLayer, DesktopLeftLayer, DesktopRightLayer } from "../../../components/common/Layers";
import { Title } from "../../../components/common/Titles";
import { MainFullLine } from "../../../components/common/Lines";
import StorageListComponent from "../components/StorageListComponent";
import SearchComponent from "../components/SearchComponent";
import FileStatusComponent from "../components/FileStatusComponent";
import { Desktop, MobileLayer, Mobile } from "../../../components/common/ScreenResponsive";
import MobileStorageListComponent from "../components/mobile/MobileStorageListComponent";


const SearchPage = () => {
    const [searchParams, ] = useSearchParams();
    const [cookie, , ] = useCookies(['token', 'user_id']);
    const dispatch = useDispatch();
    // redux data
    const result = useSelector(state => state.storageResult);

    
    if(!result.isFetched) {
        // 데이터 로드가 안되어 있는 경우 시도
        const token = cookie.token;
        const userId = cookie.user_id;
        // 파라미터 수집
        const params = {};
        searchParams.forEach((v, k) => {
            params[k] = v;
        });
        receiveDataForSearchPage(token, userId, params)
        .then((res) => {
            if(res.err === 200) {
                // redux update
                dispatch(updateMyAccount(res.user));
                dispatch(updateCurrentStorageList(res.storages, params.root));
            }
        });
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    } else {
        return (
            <div>
                <Header />
                <Helmet>
                    <title>Search</title>
                </Helmet>
                <Desktop>
                    <div style={{ display: "flex" }}>
                        <DesktopLeftLayer />
                        <DesktopCenterLayer style={{ paddingTop: "50px" }}>
                            <Title>Search</Title>
                            <MainFullLine />
                            <SearchComponent />
                            <StorageListComponent showRoot={true} />
                        </DesktopCenterLayer>
                        <DesktopRightLayer>
                            <FileStatusComponent allowDownload={false} />
                        </DesktopRightLayer>
                    </div>
                </Desktop>
                <Mobile>
                    <MobileLayer>
                        <SearchComponent />
                        <div style={{ width: "100%", height: "100px" }}></div>
                        <MobileStorageListComponent />
                    </MobileLayer>
                </Mobile>
            </div>
        );
    }
}

export default SearchPage;