import styled from "styled-components";
import { CloudModularColor } from "../../variables/color";

const COLOR_ACCESS_CLICK = "#092E0D";
const COLOR_ACCESS_OUTLINED_CLICK = "#D8EFDB";
const COLOR_DANGER_OUTLINED_CLICK = "#FFDFEA";

export const AccessedButton = styled.button`
    padding: 7px 10px 7px 10px;
    background-color: ${CloudModularColor.BOLD};
    color: white;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: ${COLOR_ACCESS_CLICK};
    }
`;
export const AccessedOutlinedButton = styled.button`
    padding: 7px 10px 7px 10px;
    color: ${CloudModularColor.BOLD};
    background-color: white;
    border: 1px ${CloudModularColor.BOLD} solid;
    border-radius: 5px;

    &:hover {
        background-color: ${COLOR_ACCESS_OUTLINED_CLICK};
    }
`;
export const DangerOutlinedButton = styled.button`
    padding: 7px 10px 7px 10px;
    color: ${CloudModularColor.DANGER};
    background-color: white;
    border: 1px ${CloudModularColor.DANGER} solid;
    border-radius: 5px;
    &:hover {
        background-color: ${COLOR_DANGER_OUTLINED_CLICK};
    }
`;