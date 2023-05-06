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
    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //       history.push('/cart');
    //       // window.location.reload(1)
    //       // window.location.reload()
    //     } else {
    //       history.push('/sign-in');
    //     }
    //   }, [])
    const delay = ms => new Promise(res => setTimeout(res, ms));
    useEffect(() => {
        let timer = setTimeout(() => {
            delay(10000);
            apiClient.get(`/v1/customer/info`)
                .then(res => {
                    console.log(res.data);
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


    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         window.Location.reload();
    //     } else {
    //         apiClient.get(`/v1/customer/info`)
    //             .then(res => {
    //                 // console.log(res.data);
    //                 setUserData(res.data)
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     }


    // }, []);

    const handleLogout = (e) => {
        e.preventDefault();

        localStorage.removeItem('token');
        history.push('/sign-in')
    }
    const toggle = () => setDropdownOpen(!dropdownOpen);

    return (
        <Nav className="navbar-nav" tabs>
            <UncontrolledDropdown nav inNavbar >
                <DropdownToggle nav caret className="dropdown-item" >
                    {userData?.f_name}
                </DropdownToggle>
                <DropdownMenu className="childsubmenu">
                    <DropdownItem tag={Link} to={`/orderVioew`}>Order</DropdownItem>
                    <DropdownItem onClick={handleLogout} tag={Link} to={`/sign-in`}>Logout</DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>

    );
}

export default userheader