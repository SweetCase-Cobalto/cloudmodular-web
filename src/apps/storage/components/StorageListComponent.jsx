import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components";

import { CloudModularColor } from "../../../variables/color";
import { AccessedButton, AccessedOutlinedButton, DangerOutlinedButton } from "../../../components/common/Buttons";

const StorageListComponent = () => {

    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.storageResult);

    return (
        <div style={{ marginTop: "40px"}}>
            <SubTitle>리스트</SubTitle>
            <div style={{display: "flex", marginTop: "20px"}}>
                <AccessedButton style={{ marginRight: "10px" }}>파일 업로드</AccessedButton>
                <AccessedButton style={{ marginRight: "10px" }}>폴더 만들기</AccessedButton>
                <AccessedOutlinedButton style={{marginRight: "10px"}}>기타 작업</AccessedOutlinedButton>
                <DangerOutlinedButton>삭제</DangerOutlinedButton>
            </div>
        </div>
    );
}

export default StorageListComponent;
const SubTitle = styled.h4`
    font-weight: 600;
    color: ${CloudModularColor.GRAY_BOLD};
`