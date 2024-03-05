import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link as ScrollLink } from "react-scroll";
import { Link , useHistory, useLocation} from "react-router-dom";
import { scroller } from 'react-scroll';
import "../layout/main.scss";
import "../layout/style.scss";
import logo from "../images/logo.png";
import connection from '../services/connection';

const Menu = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const [idUser, setIdUser] = useState(null);

  const handleNavItemClick = (path) => {
    setActive(path);
  };

  useEffect(() => {
    setActive(location.pathname);
    const user = async () => {
      let idUser = await connection.getCurrentID();
      setIdUser(idUser);
    }
    user();
  }, [location]);

  useEffect(() => {

  }, []);

  const menuList = [
    {
      label: "Informacje",
      href: "attractions",
    },
    {
      label: "Odkrywaj",
      href: "information",
    },
    {
      label: "Kontakt",
      href: "contact",
    },
    {
      label: "Zaloguj",
      href: "/login",
    },
  ];

  const menuItems = () => {
    return menuList.map((item) => {
      if (item.subMenu) {
        return (
          <NavDropdown title={item.label} id={item.label} key={item.href}>
            {item.subMenu.map((subItem) => (
              <NavDropdown.Item
                key={subItem.href}
                as={Link}
                to={subItem.href}
                onClick={() => handleNavItemClick(subItem.href)}
              >
                {subItem.label}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        );
      } else {
        if (["Informacje", "Odkrywaj", "Kontakt"].includes(item.label)) {
          console.log("active = " + active);
          if (active !== "/" && active !== "") {
            return null;
          }

          return (
            <Nav.Item key={item.href}>
              <ScrollLink
                style={{ cursor: "pointer" }}
                to={item.href}
                smooth={true}
                duration={500}
                className={`nav-link ${active === item.href ? "active" : ""}`}
              >
                {item.label}
              </ScrollLink>
            </Nav.Item>
          );
        } else {
          if(idUser>0){
            return (
              <>
            <Nav.Item key={item.href}>
              <Link
                to="/panel"
                className={`nav-link ${active === item.href ? "active" : ""}`}
                onClick={() => handleNavItemClick("/panel")}
                >
                Panel
                </Link>               
            </Nav.Item>
              <Nav.Item key={item.href}>
                <Link
                  to={item.href}
                  className={`nav-link ${active === item.href ? "active" : ""}`}
                  onClick={() => localStorage.clear()}
                >
                  Wyloguj
                </Link>                
              </Nav.Item>
            </>
            );
          }else{
            return (
              <Nav.Item key={item.href}>
                <Link
                  to={item.href}
                  className={`nav-link ${active === item.href ? "active" : ""}`}
                  onClick={() => handleNavItemClick(item.href)}
                >
                  {item.label}
                </Link>
                
              </Nav.Item>
            );
          }
          
        }
      }
    });
  };




  return (
    <Navbar
      expand={active === '/' || active === '' ? 'md' : undefined}
      className={`w-100 
        ${active !== '/list' ? '' : 'menu-activePage'}
        ${active.substring(0, 9) === '/property' ? 'menu-darkBlue' : ''}
        `}
      style={{ padding: "10px" }}
    >
      <Container fluid className="d-flex w-100" style={{ minWidth: "270px" }}>
        <Navbar.Brand as={Link} to="" onClick={() => handleNavItemClick("")}>
         <img src={logo}  style={{height: '50px'}}/>
        </Navbar.Brand>
        <Navbar.Toggle
          className="justify-content-end"
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse
          className="justify-content-end"
          id="responsive-navbar-nav"
          end
        >
          <Nav
            activeKey={active}
            onSelect={(selectedKey) => setActive(selectedKey)}
          >
            {menuItems()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;