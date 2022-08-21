import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getDirectoryIDForMoveByTag } from "../../apps/storage/api";

export const RootTag = (props) => {
    const root = props.root;
    const name = props.name;
    const [cookie, , ] = useCookies(['token']);
    // redux data
    const myAccount = useSelector(state => state.myAccount);

    const moveTargetDirectoryEvent = () => {
        // 클릭 시 해당 루트로 이동
        if(name === "/")
            window.location.href = '/storage?id=0';
        else {
            // 서버로부터 해당 디렉토리에 대한 정보 받기
            const token = cookie.token;
            const userName = myAccount.name;
            getDirectoryIDForMoveByTag(token, userName, root, name)
            .then((res) => {
                if(res.err === 200) {
                    // 찾음
                    const nextId = res.data.id
                    window.location.href = `/storage?id=${nextId}`;
                } else {
                    alert(res.data);
                }
            });
        }
    }
    return (
        <RootTagLayer
            onClick={moveTargetDirectoryEvent}
        >
            {name}
        </RootTagLayer>
    );
};
const RootTagLayer = styled.div`
    padding: 4px 7px 4px 7px;
    color: #1F5225;
    background-color: #D1EFCC;
    border 0.5px solid #1F5225;
    margin-right: 6px;
    cursor: pointer;
    font-size: 0.8em;
    border-radius 5px;
`;