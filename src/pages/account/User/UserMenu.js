import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { Col, Nav, NavItem, NavLink, Container, Row, Button, Card, CardHeader, ListGroup, ListGroupItem } from 'reactstrap';

function UserMenu() {
    return (
        <>
            <div className="shadow-sm p-5 mt-5">
                <div className="widget widget-categories mb-4 pb-4 border-bottom" >
                    <Nav vertical>
                        <NavItem className='border-bottom border-danger'>
                            <NavLink tag={Link} to="/orderVioew">
                                My Order
                            </NavLink>
                        </NavItem>
                        <NavItem className='border-bottom border-danger'>
                            <NavLink tag={Link} to="/userProfile">
                                My Profile
                            </NavLink>
                        </NavItem>
                        <NavItem className='border-bottom border-danger' style={{ hover: `border 2px #0000FF` }}>
                            <NavLink tag={Link} to='/wishlist'>
                                WishList
                            </NavLink>
                        </NavItem>
                    </Nav>

                </div >
            </div>
        </>
    );
}

export default UserMenu;