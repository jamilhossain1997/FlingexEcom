import React, { useEffect, useState } from 'react';
import {
    Nav,
    NavItem,
    Dropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    NavLink,
} from 'reactstrap';
import { useQuery } from 'react-query';
import apiClient from '../../../api/http-common';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const userheader = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userData, setUserData] = useState([]);
    const [toekn, setToken] = useState(JSON.stringify(localStorage.getItem('token')));
    const history = useHistory();
    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        const intervalId = setInterval(() => {
            const expirationTime = localStorage.getItem('expirationTime');
            if (expirationTime && new Date().getTime() > expirationTime) {
                // user is logged out
                localStorage.removeItem('expirationTime');
                localStorage.removeItem('token');
                history.push('/otpLogin')
            }
        }, 60 * 1000); // check every minute
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        let timer = setTimeout(() => {
            delay(10000);
            apiClient.get(`/v1/customer/info`)
                .then(res => {
                    // console.log(res.data);
                    setUserData(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }, 2000);
        return () => {
            clearTimeout(timer);
        };
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem('token');
        history.push('/otpLogin')
    }
    const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
        <Nav >
            <NavItem >
                <UncontrolledDropdown nav inNavbar >
                    <DropdownToggle nav caret className="dropdown-item" >
                        {
                            userData?.l_name != null ?
                                <span >{userData?.l_name}</span> :
                                <><span >Hello</span></>
                        }

                    </DropdownToggle>
                    <DropdownMenu className="childsubmenu" style={{ overflowY: 'scroll', maxHeight: "200px" }}>
                        <DropdownItem style={{ padding: `15px` }} tag={Link} to={`/orderVioew`}>Order</DropdownItem>
                        <DropdownItem style={{ padding: `15px` }} tag={Link} to={`/userProfile`}>My Profile</DropdownItem>
                        <DropdownItem style={{ padding: `15px` }} onClick={handleLogout} tag={Link} to={`/sign-in`}>Logout</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </NavItem>
        </Nav>

    );
}

export default userheader