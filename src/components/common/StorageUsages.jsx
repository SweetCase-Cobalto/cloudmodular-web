import { useSelector } from "react-redux";
import styled from "styled-components";


export const StorageUsageOnPage = () => {

    const myAccount = useSelector(state => state.myAccount);
    const entire = myAccount.storageSize * (10 ** 9);
    let used = myAccount.usage;

    const percentage = (used/entire) * 100;


    let text = `${myAccount.storageSize} GB / `;

    if(used < (10**3)) text = text + `${used} bytes`;
    else if(used < (10**6)) text = text + `${((used/(10**3)).toFixed(3))} KB`;
    else if (used < (10**9)) text = text + `${((used/(10**6)).toFixed(3))} MB`;
    else text = text + `${((used/(10**9)).toFixed(3))} GB`;

    return (
        <Layer>
            <p style={{ fontSize: "0.8em"}}>{text}</p>
            <GageLayer>
                <div style={{ backgroundColor: "green", width: percentage.toString()+'%', height: "5px"}} />
                <div style={{ backgroundColor: "white", width: (100-percentage).toString()+'%', height: "5px" }} />
            </GageLayer>
        </Layer>
    );
};
const Layer = styled.div`
    padding: 10px;
    border: 1px solid green;
    width: 100%;
    background-color: #F2F2F2;
    margin-bottom: 30px;
    border-radius: 10px;
`;
const GageLayer = styled.div`
    display: flex;
`;