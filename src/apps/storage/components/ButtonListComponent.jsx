import { useState } from "react";

import { AccessedButton, AccessedOutlinedButton, DangerOutlinedButton } from "../../../components/common/Buttons";
import CreateDirectoryModal from "./CreateDirectoryModal";
import RemoveDataModal from "./RemoveDataModal";

const ButtonListComponent = () => {

    // Modal states
    const [createDirectoryModalShow, setCreateDirectoryModalShow] = useState(false);
    const [removeDataModalShow, setRemoveDataModalShow] = useState(false);

    return (
        <div style={{display: "flex", marginTop: "20px", marginBottom: "40px"}}>
            <AccessedButton style={{ marginRight: "10px" }}>파일 업로드</AccessedButton>
            <AccessedButton style={{ marginRight: "10px" }} onClick={() => setCreateDirectoryModalShow(true)}>폴더 만들기</AccessedButton>
            <AccessedOutlinedButton style={{marginRight: "10px"}}>기타 작업</AccessedOutlinedButton>
            <DangerOutlinedButton onClick={() => setRemoveDataModalShow(true)}>삭제</DangerOutlinedButton>

            <CreateDirectoryModal
                show={createDirectoryModalShow}
                onHide={() => setCreateDirectoryModalShow(false)}
            />
            <RemoveDataModal
                show={removeDataModalShow}
                onHide={() => setRemoveDataModalShow(false)}
            />
        </div>
    );
}
export default ButtonListComponent;