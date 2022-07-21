import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";

import Form from "react-bootstrap/Form";

import { Desktop, Mobile } from "../../../Components/common/ScreenResponsive";
import { CloudModularColor } from "../../../Variables/color";
import { AccessedButton } from "../../../Components/common/Buttons";
import LogoImg from "../../../Asset/logo-colored.png";

const LoginPage = () => {

    let inputed_passwd, inputed_email;

    const [, setCookie, ] = useCookies(['token']);

    const loginHandler = (e) => {
        e.preventDefault();
        // 이메일/비밀번호 매칭 후 토큰 발급 받기
        const server_url = process.env.REACT_APP_SERVER_URL;
        let data = {
            issue: 'login',
            email: inputed_email,
            passwd: inputed_passwd,
        }
        axios({
            method: "post",
            url: `${server_url}/api/auth/token`,
            data: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        .then((res) => {
            let token = res.data.token;

            // 만료시각 설정
            let expired_len = Number(process.env.REACT_APP_TOKEN_EXPIRED);
            let expired = new Date();
            expired.setDate(expired.getDate() + expired_len);
            setCookie('token', token, { path: '/', expires: expired})
            window.location.replace('/');
            // Cookie로 저장
        }).catch((e) => {
            // 에러 발생
            if(e.code === 400) alert('입력한 정보가 맞지 않습니다.');
            else alert('Server Error');
        })
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
                                onChange={e => { inputed_email = e.target.value; }}
                            />
                            <Form.Control type="password" placeholder="Password" style={{ "marginBottom": "40px" }}
                                onChange={e => { inputed_passwd = e.target.value; }}
                            />
                            <AccessedButton style={{ "width": "100%" }} onClick={loginHandler}>Login</AccessedButton>
                        </DesktopForm>
                    </DesktopLayer>
                </Desktop>
                <Mobile>
                    <MobileLayer>
                        <MobileForm>
                            <img alt="logo" src={LogoImg} width="180px" style={{"marginBottom": "50px"}}/>
                            <Form.Control type="email" placeholder="Email" style={{ "marginBottom": "20px" }} />
                            <Form.Control type="password" placeholder="Password" style={{ "marginBottom": "40px" }} />
                            <AccessedButton style={{ "width": "100%" }}>Login</AccessedButton>
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