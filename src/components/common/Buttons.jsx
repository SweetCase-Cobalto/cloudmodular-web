import styled from "styled-components";
import { CloudModularColor } from "../../variables/color";

const COLOR_ACCESS_HOVER = "#092E0D";
const COLOR_CANCELED_HOVER = "#3c3c3c";
const COLOR_ACCESS_OUTLINED_HOVER = "#D8EFDB";
const COLOR_DANGER_OUTLINED_HOVER = "#FFDFEA";
const COLOR_CANCELED_OUTLINED_HOVER = '#DDDDDD';


export const AccessedButton = styled.button`
    padding: 7px 10px 7px 10px;
    background-color: ${CloudModularColor.BOLD};
    color: white;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: ${COLOR_ACCESS_HOVER};
    }
    &:disabled {
        background-color: gray;
        color: white;
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
    &:disabled {
        background-color: gray;
        color: white;
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
    &:disabled {
        background-color: gray;
        color: white;
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

    &:disabled {
        background-color: gray;
        color: white;
    }
`;
export const CanceledOutlinedButton = styled.button`
    padding: 7px 10px 7px 10px;
    background-color: white;
    color: ${CloudModularColor.GRAY_BOLD};
    border: 1px ${CloudModularColor.GRAY_BOLD} solid;
    border-radius: 5px;

    &:hover {
        background-color: ${COLOR_CANCELED_OUTLINED_HOVER};
    }
    &:disabled {
        background-color: gray;
        color: white;
    }
`;