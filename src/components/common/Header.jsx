import styled from "styled-components";
import { useSelector } from "react-redux";

import { Nav, Navbar, Container, Form } from "react-bootstrap";
import { Desktop, Mobile} from './ScreenResponsive';
import { CloudModularColor } from "../../variables/color";
import { useCookies } from "react-cookie";
import WhiteLogoImg from "../../asset/logo-white.png";
import "../fonts.css";

const Header = () => {

    const [, , removeCookie] = useCookies(['token', 'user_id']);
    const user = useSelector(state => state.myAccount);

    const logoutEvent = () => {
        removeCookie("token");
        removeCookie("user_id");
        window.location.replace('/login');
    }

    const searchBarEvent = (e) => {
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