import styled from "styled-components";

import { Nav, Navbar, Container, Form } from "react-bootstrap";
import { Desktop, Mobile} from './ScreenResponsive';
import { CloudModularColor } from "../../variables/color";
import { useCookies } from "react-cookie";
import WhiteLogoImg from "../../asset/logo-white.png";
import "../fonts.css";

const Header = () => {

    const [, , removeCookie] = useCookies(['token', 'user_id']);

    const logoutEvent = () => {
        removeCookie("token");
        removeCookie("user_id");
        window.location.replace('/login');
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
                            <Nav.Link href="/storage?id=0">Favorites</Nav.Link>
                            <Nav.Link href="/storage?id=0">Settings</Nav.Link>
                            <Nav.Link href="/storage?id=0">Search</Nav.Link>
                        </Nav>
                        <Form className='d-flex'>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                        </Form>
                    </Container>
                    <Nav.Link onClick={logoutEvent}>Logout</Nav.Link>
                </Navbar>
            </Desktop>
            <Mobile>
                <Navbar style={{ paddingLeft: "30px", paddingRight: "30px", color: "white"}} variant="dark">
                    <Container>
                    </Container>
                </Navbar>
            </Mobile>
        </NavLayer>
    );
}
export default Header;

const NavLayer = styled.div`
    width: 100%;
    background-color: ${CloudModularColor.BOLD};
`