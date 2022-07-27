import { useState } from "react";

import { AccessedButton, DangerOutlinedButton } from "../../../components/common/Buttons";
import CreateDirectoryModal from "./CreateDirectoryModal";
import FileUploadModal from "./FileUploadModal";
import RemoveDataModal from "./RemoveDataModal";

const ButtonListComponent = () => {

    // Modal states
    const [createDirectoryModalShow, setCreateDirectoryModalShow] = useState(false);
    const [removeDataModalShow, setRemoveDataModalShow] = useState(false);
    const [updateFilesModalShow, setUpdateFilesModalShow] = useState(false);

    return (
        <div style={{display: "flex", marginTop: "20px", marginBottom: "20px"}}>
            <AccessedButton style={{ marginRight: "10px" }} onClick={() => setUpdateFilesModalShow(true)}>파일 업로드</AccessedButton>
            <AccessedButton style={{ marginRight: "10px" }} onClick={() => setCreateDirectoryModalShow(true)}>폴더 만들기</AccessedButton>
            <DangerOutlinedButton onClick={() => setRemoveDataModalShow(true)}>삭제</DangerOutlinedButton>

            <CreateDirectoryModal
                show={createDirectoryModalShow}
                onHide={() => setCreateDirectoryModalShow(false)}
            />
            <RemoveDataModal
                show={removeDataModalShow}
                onHide={() => setRemoveDataModalShow(false)}
            />
            <FileUploadModal
                show={updateFilesModalShow}
                onHide={() => setUpdateFilesModalShow(false)}
            />
            
        </div>
    );
}
export default ButtonListComponent;