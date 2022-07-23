import styled from "styled-components";
import { CloudModularColor } from "../../variables/color";

const COLOR_ACCESS_HOVER = "#092E0D";
const COLOR_CANCELED_HOVER = "#3c3c3c";
const COLOR_ACCESS_OUTLINED_HOVER = "#D8EFDB";
const COLOR_DANGER_OUTLINED_HOVER = "#FFDFEA";


export const AccessedButton = styled.button`
    padding: 7px 10px 7px 10px;
    background-color: ${CloudModularColor.BOLD};
    color: white;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: ${COLOR_ACCESS_HOVER};
    }
`;
export const AccessedOutlinedButton = styled.button`
    padding: 7px 10px 7px 10px;
    color: ${CloudModularColor.BOLD};
    background-color: white;
    border: 1px ${CloudModularColor.BOLD} solid;
    border-radius: 5px;

    &:hover {
        background-color: ${COLOR_ACCESS_OUTLINED_HOVER};
    }
`;
export const DangerOutlinedButton = styled.button`
    padding: 7px 10px 7px 10px;
    color: ${CloudModularColor.DANGER};
    background-color: white;
    border: 1px ${CloudModularColor.DANGER} solid;
    border-radius: 5px;
    &:hover {
        background-color: ${COLOR_DANGER_OUTLINED_HOVER};
    }
`;
export const CanceledButton = styled.button`
    padding: 7px 10px 7px 10px;
    background-color: ${CloudModularColor.GRAY_BOLD};
    color: white;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: ${COLOR_CANCELED_HOVER};
    }
`