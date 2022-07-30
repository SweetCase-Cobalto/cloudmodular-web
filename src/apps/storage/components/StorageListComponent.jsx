import { Table } from "react-bootstrap";
import { useSelector } from "react-redux"

import { SubTitle } from "../../../components/common/Titles";
import { CloudModularColor } from "../../../variables/color";
import StorageListItem from "./StorageListItem";


const StorageListComponent = () => {

    const currentDir = useSelector(state => state.storageResult);

    // 컴포넌트 생성
    const TableChilds = currentDir.dataList.map((data, index) => <StorageListItem key={index} idx={index} data={data} />);
    return (
        <div style={{ marginTop: "40px"}}>
            <SubTitle>리스트</SubTitle>
            <Table style={{
                "color": CloudModularColor.GRAY_BOLD,
            }}>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>생성날짜</th>
                        <th>북마크</th>
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