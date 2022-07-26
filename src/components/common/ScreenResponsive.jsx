import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

export const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({minWidth: 1024});
    return isDesktop ? children : null;
}
export const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({maxWidth: 1023});
    return isMobile ? children : null;
}

export const DesktopLayer = styled.div`
    width: 100%;
    font-family: 'Noto Sans KR', sans-serif;
`;
export const MobileLayer = styled.div`
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 50px;
    font-family: 'Noto Sans KR', sans-serif;
`;