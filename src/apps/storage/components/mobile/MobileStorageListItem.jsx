import { Card, Offcanvas } from "react-bootstrap";
import { IoMdMore } from "react-icons/io";
import { useState } from "react";

import DirectoryIcon from "../../../../asset/directory.svg";
import FileIcon from "../../../../asset/file.svg";
import { AccessedButton } from "../../../../components/common/Buttons";
import { useCookies } from "react-cookie";
import { downloadData } from "../../../../util/apis";
import fileDownload from "js-file-download";

const MobileStorageListItem = (props) => {

    const data = props.data;
    const dataIcon = props.data.isDir ? DirectoryIcon : FileIcon;
    // Offcanvas Information useState
    const [showDataInfoOffCanvas, setShowDataInfoOffCanvas] = useState(false);
    // cookie
    const [cookie, ,] = useCookies(["token", "user_id"]);

    const iconClickEvent = () => {
        // 디렉토리일 경우 해당 위치로 이동한다.
        if(data.isDir)
            window.location.href = `/storage?id=${data.id}`;
    }
    const downloadEvent = () => {
        downloadData(cookie.token, cookie.user_id, data.id)
        .then((res) => {
            if(res.err === 200) {
                // 다운로드
                const response = res.data;
                if(!data.isDir) fileDownload(response, data.name);
                else fileDownload(response, `${data.name}.zip`);
            }
        });
    }

    return (
        <Card>
            <Card.Header
                style={{
                    fontSize: '0.8em',
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    cursor: "pointer",
                }}><center>
                    {data.name}
                </center></Card.Header>
            <Card.Body style={{ cursor: "pointer" }} ><center>
                <img alt="data logo" src={dataIcon} onClick={iconClickEvent}/>
            </center></Card.Body>
            <Card.Footer>
                <IoMdMore
                    onClick={() => setShowDataInfoOffCanvas(true)}
                    size={20}
                    style={{ float: "right", cursor: "pointer"}} />
            </Card.Footer>

            <Offcanvas placement="end" show={showDataInfoOffCanvas} onHide={() => setShowDataInfoOffCanvas(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title
                        style={{
                            fontSize: "1.5em",
                            fontWeight: "bold"
                        }}>
                            세부 정보
                        </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <center>
                        <p style={{ marginBottom: "20px" }}>{data.name}</p>
                        <img style={{ marginBottom: "20px" }} alt="data logo" src={dataIcon}/>
                        <p style={{ marginBottom: "20px" }}>{data.created}</p>
                        <AccessedButton onClick={downloadEvent}>다운로드</AccessedButton>
                    </center>
                </Offcanvas.Body>
            </Offcanvas>
        </Card>
    );
}

export default MobileStorageListItem;