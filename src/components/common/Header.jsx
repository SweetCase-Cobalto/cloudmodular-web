import styled from "styled-components";
import { useSelector } from "react-redux";
import { BiMenu } from 'react-icons/bi';

import { Nav, Navbar, Container, Form, Offcanvas } from "react-bootstrap";
import { Desktop, Mobile} from './ScreenResponsive';
import { CloudModularColor } from "../../variables/color";
import { useCookies } from "react-cookie";
import WhiteLogoImg from "../../asset/logo-white.png";
import "../fonts.css";
import { useState } from "react";

const Header = () => {

    const [, , removeCookie] = useCookies(['token', 'user_id']);
    const user = useSelector(state => state.myAccount);
    
    // In Mobile Edition
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const logoutEvent = () => {
        // 로그아웃 이벤트
        removeCookie("token");
        removeCookie("user_id");
        window.location.replace('/login');
    }

    const searchBarEvent = (e) => {
        // 데이터 검색 이벤트
        e.preventDefault();
        const searchWord = e.target.searchWord.value;
        if(searchWord === '') {
            alert('검색어를 입력하세요.');
            return;
        }
        let url = `/storage/search?`;
        url += '&sort_create=1';
        url += '&sort_name=1';
        url += '&recursive=1';
        url += '&word=' + searchWord;
        window.location.href = url;
    }

    return (
        <NavLayer>
            <Desktop>
                <Navbar 
                    style={{
                        paddingLeft: "300px",
                        paddingRight: "300px",
                        color: "white",
                    }}
                    variant="dark"
                >
                    <Container>
                        <Navbar.Brand 
                            style={{
                                fontFamily: "'Poppins', sans-serif", 
                                fontWeight: "500"
                            }}
                        >
                            <img
                                src={WhiteLogoImg}
                                height="30"
                                className="d-inline-block align-top"
                                alt="Logo"
                            />{' '}
                            CLOUDMODULAR
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/storage?id=0">Storage</Nav.Link>
                            <Nav.Link href="/storage/favorite">Favorites</Nav.Link>
                            <Nav.Link href="/storage/search">Search</Nav.Link>
                            <Nav.Link href="/setting">Setting</Nav.Link>
                            { user.isAdmin && <Nav.Link href="/accounts#1">Accounts</Nav.Link> }
                        </Nav>
                        <Form className='d-flex' onSubmit={searchBarEvent}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                id="searchWord"
                            />
                        </Form>
                    </Container>
                    <Nav.Link onClick={logoutEvent}>Logout</Nav.Link>
                </Navbar>
            </Desktop>

            <Mobile>
                <Navbar style={{ padding: '14px 0px 14px 0px' }} variant="dark">
                    <div style={{ position: "relative", width: "100%" }}>
                        <BiMenu
                            size="40px"
                            style={{
                                position: "absolute",
                                margin: "-7px 0px 0px 10px",
                                cursor: "pointer"
                            }}
                            onClick={() => setShowMobileMenu(true)}
                        />
                        <center>
                        <img
                            src={WhiteLogoImg}
                            height="24"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                        </center>
                    </div>
                </Navbar>
                
                <Offcanvas show={showMobileMenu} onHide={() => setShowMobileMenu(false)}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title style={{ fontSize: "1.5em", fontWeight: "bold" }}>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body style={{ display: "initial" }}>
                        <MobileMenuItemWrapper>
                            <MobileMenuItem href="/storage?id=0">Storage</MobileMenuItem>
                        </MobileMenuItemWrapper>
                        <MobileMenuItemWrapper>
                            <MobileMenuItem href="/storage/favorite">Favorites</MobileMenuItem>
                        </MobileMenuItemWrapper>
                        <MobileMenuItemWrapper>
                            <MobileMenuItem href="/storage/search">Search</MobileMenuItem>
                        </MobileMenuItemWrapper>
                        <MobileMenuItemWrapper>
                            <MobileMenuItem href="/setting">Settings</MobileMenuItem>
                        </MobileMenuItemWrapper>
                        <MobileMenuItemWrapper>
                            <MobileMenuItem onClick={logoutEvent}>Logout</MobileMenuItem>
                        </MobileMenuItemWrapper>
                    </Offcanvas.Body>
                </Offcanvas>

            </Mobile>

        </NavLayer>
    );
}

export default Header;

const NavLayer = styled.div`
    width: 100%;
    background-color: ${CloudModularColor.BOLD};
    color: white;
`
const MobileMenuItem = styled.a`
    text-decoration: none;
    color: black;
`;
const MobileMenuItemWrapper = styled.div`
    margin-bottom: 20px;
`