import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { useCookies } from "react-cookie";

import Form from "react-bootstrap/Form";

import { Desktop, Mobile } from "../../../components/common/ScreenResponsive";
import { CloudModularColor } from "../../../variables/color";
import { AccessedButton } from "../../../components/common/Buttons";
import LogoImg from "../../../asset/logo-colored.png";
import { login } from "../../../util/apis";

const LoginPage = () => {

    let inputed_passwd, inputed_email;
    const [, setCookie, ] = useCookies(['token', 'user_id']);
    const loginHandler = (e) => {
        e.preventDefault();
        // 이메일/비밀번호 매칭 후 토큰 발급 받기
        login(inputed_email, inputed_passwd)
        .then((res) => {
            if(res.err === 200) {
                // 성공
                const data = res.data;
                let token = data.token;
                let userId = data.user_id;
                // 만료시각 설정
                let expired_len = Number(process.env.REACT_APP_TOKEN_EXPIRED);
                let expired = new Date();
                expired.setDate(expired.getDate() + expired_len);
                // 쿠키 저장
                setCookie('token', token, { path: '/', expires: expired});
                setCookie('user_id', userId, {path: '/', expires: expired});
                // Storage Page 이동
                window.location.replace('/storage?id=0');
            } else if(res.err === 400) {
                alert('입력한 정보가 맞지 않습니다.');
            } else {
                alert('server error');
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>CloudModular</title>
            </Helmet>
            <center>
                <Desktop>
                    <DesktopLayer>
                        <DesktopForm>
                            <img alt="logo" src={LogoImg} width="200px" style={{"marginBottom": "50px"}}/>
                            <Form.Control type="email" placeholder="Email" style={{ "marginBottom": "20px" }}
                                onChange={e => { inputed_email = e.target.value; }} />
                            <Form.Control type="password" placeholder="Password" style={{ "marginBottom": "40px" }}
                                onChange={e => { inputed_passwd = e.target.value; }} />
                            <AccessedButton style={{ "width": "100%" }} onClick={loginHandler}>Login</AccessedButton>
                        </DesktopForm>
                    </DesktopLayer>
                </Desktop>
                <Mobile>
                    <MobileLayer>
                        <MobileForm>
                            <img alt="logo" src={LogoImg} width="180px" style={{"marginBottom": "50px"}}/>
                            <Form.Control type="email" placeholder="Email" style={{ "marginBottom": "20px" }}
                                onChange={e => { inputed_email = e.target.value; }} />
                            <Form.Control type="password" placeholder="Password" style={{ "marginBottom": "40px" }} 
                                onChange={e => { inputed_passwd = e.target.value; }} />
                            <AccessedButton style={{ "width": "100%" }} onClick={loginHandler}>Login</AccessedButton>
                        </MobileForm>
                    </MobileLayer>
                </Mobile>
            </center>
        </div>
    )
}

// DESKTOP
const DesktopLayer = styled.div`
    margin-top: 200px;
`;
const DesktopForm = styled.form`
    width: 500px;
    border: 1px solid ${CloudModularColor.BOLD};
    padding: 50px 40px 50px 40px;
    box-shadow: 2px 2px 15px #CCCCCC;
`

// MOBILE
const MobileLayer = styled.div`
    padding: 180px 30px 0px 30px;
`
const MobileForm = styled.form`
    width: 300px;
`


export default LoginPage;