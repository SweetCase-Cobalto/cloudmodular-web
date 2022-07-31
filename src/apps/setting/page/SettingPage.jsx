import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import { InputGroup, Form } from 'react-bootstrap';
import styled from "styled-components";

import Header from "../../../components/common/Header";
import { DesktopCenterLayer, DesktopLeftLayer, DesktopRightLayer } from "../../../components/common/Layers";
import { MainFullLine } from "../../../components/common/Lines";
import { Desktop, DesktopLayer } from "../../../components/common/ScreenResponsive";
import { Title } from "../../../components/common/Titles";
import { updateMyAccountFromServer } from "../apis";
import { updateMyAccount } from "../../../reducers/myAccount";
import { getUserInfoByID } from "../../../util/apis";
import { AccessedButton } from "../../../components/common/Buttons";


const SettingPage = () => {

    const [cookie, ,removeCookie] = useCookies(['token', 'user_id']);
    const token =  cookie.token;
    const userId = cookie.user_id;
    const dispatch = useDispatch();
    // redux data
    const myAccount = useSelector(state => state.myAccount);
    // input data
    let newNickname = '';
    let password = '';
    let newPassword = '';
    let newRepeatedPassword = '';

    if(myAccount.name === null) {
        // 서버로부터 데이터 로드
        getUserInfoByID(token, userId)
        .then((res) => {
            if(res.err === 200)
                dispatch(updateMyAccount(res.data));
            else {
                alert('Error');
                removeCookie("token");
                removeCookie("user_id");
                window.location.replace("/login");
            }
        }).catch(() => {
            // Account 자체를 받지 못하므로 Cookie를 전부 지우고
            // Login창으로 이동한다.
            alert('해당 계정의 정보가 정확하지 않습니다.');
            removeCookie("token");
            removeCookie("user_id");
            window.location.replace("/login");
        });

        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    }

    newNickname = myAccount.name;
    const myAccountChangeApplyEvent = () => {
        console.log('?');
        // 패스워드를 변경하려고 하는 경우
        if(password || newPassword || newRepeatedPassword) {
            // 패스워드 여부
            if(!password) { alert('기존 패스워드를 입력하세요'); return; }
            if(!newPassword) { alert('새로 변경 할 패스워드를 입력하세요.'); return; }
            if(newPassword !== newRepeatedPassword) { alert('새로 변경 할 패스워드가 일치하지 않습니다.'); return; }
        }
        updateMyAccountFromServer(token, userId, myAccount.email, newNickname, password, newPassword)
        .then((res) => {
            if(res.success) alert('변경이 완료되었습니다.');
            else alert(res.msg);
        }).catch(() => {
            alert('알 수 없는 에러가 발생했습니다.');
        }).finally(() => { window.location.reload(); });
    }

    return (
        <div>
            <Header />
            <Helmet>
                <title>Setting</title>
            </Helmet>
            <Desktop>
                <div style={{display: "flex"}}>
                    <DesktopLeftLayer />
                    <DesktopCenterLayer>
                        <DesktopLayer style={{paddingTop: "50px"}}>
                            <Title>Setting</Title>
                            <MainFullLine />
                            <SettingLayer>
                                <h3>계정 정보</h3>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>이메일</InputGroup.Text>
                                    <Form.Control defaultValue={myAccount.email} disabled />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>닉네임</InputGroup.Text>
                                    {   
                                        myAccount.isAdmin
                                        &&
                                        <Form.Control defaultValue={newNickname} disabled />
                                    }
                                    {
                                        !myAccount.isAdmin
                                        &&
                                        <Form.Control 
                                            defaultValue={newNickname} placeholder="변경할 이름을 고르세요"
                                            onChange={(e) => { newNickname = e.target.value; }}/>
                                        
                                    }
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text>패스워드</InputGroup.Text>
                                    <Form.Control type="password" placeholder="현재 비밀번호" onChange={(e) => {password = e.target.value;}} />
                                    <Form.Control type="password" placeholder="변경 할 비밀번호" onChange={(e) => {newPassword = e.target.value;}} />
                                    <Form.Control type="password" placeholder="변경 할 비밀번호 재입력" onChange={(e) => {newRepeatedPassword = e.target.value;}}/>
                                </InputGroup>
                                <AccessedButton style={{ float: "right" }} onClick={myAccountChangeApplyEvent}>계정 정보 변경</AccessedButton>
                            </SettingLayer>
                        </DesktopLayer>
                    </DesktopCenterLayer>
                    <DesktopRightLayer />
                </div>
            </Desktop>
        </div>
    );
}
export default SettingPage;

const SettingLayer = styled.div`
    margin-top: 20px;
`;
