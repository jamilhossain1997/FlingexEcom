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

const brandheader = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [brand, setBrand] = useState([]);
    // const history = useHistory();

    useEffect(() => {
        apiClient.get(`/v1/brands`)
            .then(res => {
                setBrand(res.data);
            })
    }, []);


    return (
        <UncontrolledDropdown nav inNavbar >
            <DropdownToggle nav caret className="dropdown-item" >
                Brand
            </DropdownToggle>
            <DropdownMenu className="childsubmenu" style={{ overflowY: 'scroll', maxHeight: "200px" }}>
                {
                    brand?.map((branditem, i) => (
                        <DropdownItem key={i} tag={Link} to={`/grid-left-sidebar/${branditem.id}`} >{branditem.name}
                        </DropdownItem>
                    ))
                }
            </DropdownMenu>
        </UncontrolledDropdown>

    );
}



export default brandheader
