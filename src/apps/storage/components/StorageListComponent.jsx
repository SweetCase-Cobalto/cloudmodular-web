import { useDispatch, useSelector } from "react-redux"

import { SubTitle } from "../../../components/common/Titles";
import ButtonListComponent from "./ButtonListComponent";

const StorageListComponent = () => {

    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.storageResult);

    return (
        <div style={{ marginTop: "40px"}}>
            <SubTitle>리스트</SubTitle>
            <ButtonListComponent />
        </div>
    );
}
export default StorageListComponent;