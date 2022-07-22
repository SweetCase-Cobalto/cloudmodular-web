import styled from "styled-components";

export const RootTag = (props) => {
    const name = props.name;
    return (<RootTagLayer>{name}</RootTagLayer>);
};
const RootTagLayer = styled.div`
    padding: 4px 7px 4px 7px;
    color: #1F5225;
    background-color: #D1EFCC;
    border 0.5px solid #1F5225;
    margin-right: 6px;
    cursor: pointer;
    font-size: 0.8em;
    border-radius 5px;
`;