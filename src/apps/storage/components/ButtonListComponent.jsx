import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import { AccessedButton, AccessedOutlinedButton, DangerOutlinedButton } from "../../../components/common/Buttons";
import CreateDirectoryModal from "./CreateDirectoryModal";

const ButtonListComponent = () => {

    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.storageResult);

    // Modal states
    const [createDirectoryModalShow, setCreateDirectoryModalShow] = useState(false);

    return (
        <div style={{display: "flex", marginTop: "20px", marginBottom: "40px"}}>
            <AccessedButton style={{ marginRight: "10px" }}>파일 업로드</AccessedButton>
            <AccessedButton style={{ marginRight: "10px" }} onClick={() => setCreateDirectoryModalShow(true)}>폴더 만들기</AccessedButton>
            <AccessedOutlinedButton style={{marginRight: "10px"}}>기타 작업</AccessedOutlinedButton>
            <DangerOutlinedButton>삭제</DangerOutlinedButton>

            <CreateDirectoryModal
                show={createDirectoryModalShow}
                onHide={() => setCreateDirectoryModalShow(false)}
            />
        </div>
    );
}
export default ButtonListComponent;