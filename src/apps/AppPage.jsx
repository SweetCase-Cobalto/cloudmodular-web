import { useCookies } from "react-cookie";

const AppPage = () => {
    const [cookies,  ] = useCookies(['token']);
    // token이 있는 지 체크
    let token = cookies['token'];
    if(token === undefined)
        // 없을 경우 로그인 페이지로
        window.location.replace('/login');
    else
        // 있으면 Storage로 이동
        window.location.replace('/storage?id=0');
    return <div>Loading</div>
}

export default AppPage;