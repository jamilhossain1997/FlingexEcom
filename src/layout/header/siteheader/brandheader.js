import React, { useEffect, useState } from 'react';
import {
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    Container,
    Row,
    Col
} from 'reactstrap';
import apiClient from '../../../api/http-common';
import { Link } from 'react-router-dom';

const brandheader = (props) => {
    const [brand, setBrand] = useState([]);
    // const [isOpen, setIsOpen] = useState(false)
    // const history = useHistory();


    useEffect(() => {
        apiClient.get(`v1/brands`)
            .then(res => {
                setBrand(res.data);
            })
    }, []);


    return (
        <UncontrolledDropdown nav inNavbar >
            <DropdownToggle nav caret className="dropdown-item" >
                Brand
            </DropdownToggle>
            <DropdownMenu onClick={props.toggle} className="childsubmenu" style={{ overflowY: 'scroll', maxHeight: "500px", width: "800px" }}>
                <Container>
                    <Row>
                        {
                            brand?.map((branditem) => (
                                <React.Fragment key={branditem} >
                                    <Col xs={12} md={4} >
                                        <DropdownItem>
                                            <Link to={`/grid-left-sidebar/${branditem.id}`} style={{ textTransform: `uppercase` }}>
                                                {branditem.name}

                                            </Link>
                                        </DropdownItem>
                                    </Col>
                                </React.Fragment>

                            ))
                        }
                    </Row>
                </Container>
            </DropdownMenu>
        </UncontrolledDropdown >

    );
}



export default brandheader
