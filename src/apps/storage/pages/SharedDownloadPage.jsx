import fileDownload from "js-file-download";
import { useState } from "react";
import { downloadShared, getInfoSharedDataBySharedId } from "../../../util/apis";


const SharedDownloadPage = () => {

    const current = decodeURI(window.location.href);
    const search = current.split("?")[0].split('/');
    const sharedId = search[search.length-1];
    // Shared ID에 대한 정보 로드
    const [dataInfo, setDataInfo] = useState(undefined);


    const downloadEvent = () => {
        // 다운로드 이벤트
        downloadShared(sharedId)
        .then((res) => {
            if(res.err === 200) {
                const response = res.data;
                fileDownload(response, dataInfo.name);
            } else {
                alert(res.data);
            }
        })
    }

    if(dataInfo === undefined) {
        // 데이터 정보 가져오기
        getInfoSharedDataBySharedId(sharedId)
        .then((res) => {
            if(res.err === 200) {

                const isDir = res.data.is_dir;
                let name = res.data.name;
                if(isDir) name += ".zip";   // 디렉토리는 압축파일
                setDataInfo({
                    isDir: isDir,
                    name: name,
                });
            } else {
                alert(res.data);
            }
        });
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    } else {
        
        return (
            <div>
                <h1>해당 파일을 다운로드 합니다.</h1>
                <div>{dataInfo.name}</div>
                <button onClick={downloadEvent}>다운로드</button>
            </div>
        );
    }
}
export default SharedDownloadPage;