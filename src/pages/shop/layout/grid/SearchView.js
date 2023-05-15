import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FilterProduct } from '../../../../services';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import Topbar from '../../../../widgets/filter/Topbar';
import Listview from '../../../../widgets/shop/listview';
import Pageheading from '../../../../widgets/pageheading';
import apiClient from '../../../../api/http-common';
// import { useLocation } from "react-router-dom";

const ProductParPage = 9;
class SearchView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ActiveProductID: parseInt(this.props.match.params.id),
            pro: [],
            minValue: 0,
            maxValue: 9,
            status: true,
        }
    }


    componentDidMount() {
        window.scrollTo(0, 0)
    }



    itemRender = (current, type, originalElement) => {
        if (type === 'prev') {
            return <Link className="page-link" to="/">Previous</Link>;
        }
        if (type === 'next') {
            return <Link className="page-link" to="/">Next</Link>;
        }
        return originalElement;
    }
    render() {

        return (
            <>
                <div className="page-content">
                    <section>
                        <Container>
                            <Row>
                                <Col lg={12} md={12}>
                                    {/* <Topbar productdata={searchProduct.length} /> */}
                                    <Row>

                                        {(this.props.location?.state?.state?.length > 0) ?
                                            <>

                                                {this.props.location?.state?.state?.map((product, index) => (
                                                    <Listview productdata={product} key={index} />
                                                ))}

                                                <div className="text-center col-12">
                                                    <Pagination
                                                        defaultCurrent={1}
                                                        defaultPageSize={ProductParPage}
                                                        onChange={this.handleChange}
                                                        total={this.props.location.state?.state?.length}
                                                        itemRender={this.itemRender}
                                                    />
                                                </div>
                                            </>
                                            :
                                            <Col lg={9} md={12} className="order-lg-12">
                                                <Row className="text-center12">
                                                    <h3>Sorry! No products were found matching your selection!    </h3>
                                                    <p>Please try to other words.</p>
                                                </Row>
                                            </Col>
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </div>


            </>
        );
    }
}

const ProductDispatchToProps = (state) => ({
    products: FilterProduct(state.data, state.filters)

})
export default connect(
    ProductDispatchToProps, {}
)(SearchView);

