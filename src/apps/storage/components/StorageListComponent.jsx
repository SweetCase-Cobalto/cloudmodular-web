import { Table } from "react-bootstrap";
import { useSelector } from "react-redux"

import { SubTitle } from "../../../components/common/Titles";
import { CloudModularColor } from "../../../variables/color";
import StorageListItem from "./StorageListItem";


const StorageListComponent = (props) => {

    const currentDir = useSelector(state => state.storageResult);
    const isShowRootDirectory = props.showRoot ? props.showRoot : false;

    // 컴포넌트 생성
    const TableChilds = 
        currentDir.dataList
            .map(
                (data, index) => <StorageListItem key={index} idx={index} data={data} showRoot={isShowRootDirectory} />
            );

    
    return (
        <div style={{ marginTop: "40px"}}>
            <SubTitle>리스트</SubTitle>
            <Table
                striped hover
                style={{
                    color: CloudModularColor.GRAY_BOLD,
                    tableLayout: "fixed",
                }}
            >
                {
                    !isShowRootDirectory
                    &&
                    <colgroup>
                        <col style={{ width: "60%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "10%" }} />
                    </colgroup>
                }
                {
                    isShowRootDirectory
                    &&
                    <colgroup>
                        <col style={{ width: "50%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "10%" }} />
                        <col style={{ width: "10%" }} />
                    </colgroup>
                }

                <thead>
                    <tr>
                        <th>이름</th>
                        <th>생성날짜</th>
                        <th>크기</th>
                        <th>북마크</th>
                        {
                            isShowRootDirectory
                            &&
                            <th></th>
                        }
                    </tr>
                </thead>
                <tbody style={{ fontWeight: 400 }}>
                    {TableChilds}
                </tbody>
            </Table>
        </div>
    );
}
export default StorageListComponent;