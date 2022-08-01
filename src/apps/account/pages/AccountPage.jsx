import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { updateMyAccount } from "../../../reducers/myAccount";
import { getUserInfoByID, getUserList } from "../../../util/apis";
import { updateAccountList } from "../../../reducers/accountList";
import Header from "../../../components/common/Header";
import { Helmet } from "react-helmet";
import { Desktop, DesktopLayer } from "../../../components/common/ScreenResponsive";
import { DesktopCenterLayer, DesktopLeftLayer, DesktopRightLayer } from "../../../components/common/Layers";
import { Title } from "../../../components/common/Titles";
import { MainFullLine } from "../../../components/common/Lines";
import ButtonListComponent from "../components/ButtonListComponent";
import AccountListComponent from "../components/AccountListComponent";

const AccountPage = () => {
    // cookie data
    const [cookie, ,removeCookie] = useCookies(['token', 'user_id']);
    const token = cookie.token;
    const userId = cookie.user_id;
    const dispatch = useDispatch();
    // redux account data
    const user = useSelector(state => state.myAccount);
    const accountList = useSelector(state => state.accountList);

    if(user.name === null) {
        // 자신의 유저 정보를 가져오기
        getUserInfoByID(token, userId)
        .then((res) => {
            if(res.err === 200) {
                dispatch(updateMyAccount(res.data));
            }
            else {
                alert('유효하지 않는 접근 입니다.');
                removeCookie("token");
                removeCookie("user_id");
                window.location.replace("/login");
            }
        }).catch(() => {
            alert('유효하지 않는 접근 입니다.');
            removeCookie("token");
            removeCookie("user_id");
            window.location.replace("/login");
        });

        return (
            <div>
                <h1>Loading</h1>
            </div>
        );

    } else if(accountList.accounts === null) {
        // Account 데이터 가져오기
        // Admin 여부 확인
        if(!user.isAdmin) {
            return (
                <div>
                    <h1>권한이 없습니다.</h1>
                </div>
            );
        }
        // Hash Data확인
        let pageNum = parseInt(new URL(window.location.href).hash.slice(1));
        if(isNaN(pageNum)) pageNum = 1;
        // 유저 리스트 불러오기
        getUserList(token, pageNum)
        .then((res) => {
            if(res.err === 200) {
                dispatch(updateAccountList(res.data));
            } else {
                alert("ERROR");
            }
        });

        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    }
    else {
        // 최종
        return (
            <div>
                <Header />
                <Helmet>
                    <title>Account List</title>
                </Helmet>
                <Desktop>
                    <div style={{display: "flex"}}>
                        <DesktopLeftLayer />
                        <DesktopCenterLayer>
                            <DesktopLayer style={{paddingTop: "50px"}}>
                                <Title>Accounts</Title>
                                <MainFullLine />
                                <ButtonListComponent />
                                <AccountListComponent />
                            </DesktopLayer>
                        </DesktopCenterLayer>
                        <DesktopRightLayer />
                    </div>
                </Desktop>
            </div>
        );
    }
}
export default AccountPage;