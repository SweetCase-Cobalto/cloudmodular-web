import { useSelector } from "react-redux";

import styled from "styled-components";
import MobileStorageListItem from "./MobileStorageListItem";

const MobileStorageListComponent = () => {
    const currentDir = useSelector(state => state.storageResult);

    const listItems = currentDir.dataList.map((data, index) =>
        <MobileStorageListItem key={index} idx={index} data={data} />);

    return (
        <Layer>
            {listItems}
        </Layer>
    );
}
export default MobileStorageListComponent;


const Layer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
`;