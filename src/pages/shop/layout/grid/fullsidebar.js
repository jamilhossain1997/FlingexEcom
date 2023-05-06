import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FilterProduct } from '../../../../services';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import Topbar from '../../../../widgets/filter/Topbar';
import Sidebar from '../../../../widgets/filter/Sidebar';
import Discountproductlist from '../../../../widgets/shop/discountproductlist';
import Pageheading from '../../../../widgets/pageheading';
import apiClient from '../../../../api/http-common';
import Listview from '../../../../widgets/shop/listview';
import imgUrl from '../../../../api/baseUrl';

const ProductParPage = 9;
class fullsidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pro: [],
            minValue: 0,
            maxValue: 9,
            status: true,
        }
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        apiClient.get(`/v1/products/discounted-product`)
            .then(res => {
                const pro = res.data.products;
                console.log(res.data);
                this.setState({ pro });
            })
    }

    handleChange = value => {

        this.setState({
            minValue: (value - 1) * ProductParPage,
            maxValue: value * ProductParPage
        });
    };
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
        let { status } = this.state;

        // console.log(this.state.pro.name);
        return (
            <>
                {/*hero section start*/}
                <section className="bg-light">
                    <Pageheading foldername={"Product"} title={"Discount Product"} />
                </section>
                {/*hero section end*/}
                {/*body content start*/}
                {status ?
                    <div className="page-content">
                        <section>
                            <div className="container-fluid">
                                <Row>
                                    <Col lg={9} md={12} className="order-lg-1">
                                        <Topbar productdata={this.state.pro.length} />
                                        <Row>
                                            {(this.state.pro.length > 0) ?
                                                <>
                                                    {this.state.pro.slice(this.state.minValue, this.state.maxValue).map((product, index) => (
                                                        <Listview productdata={product} key={index} />
                                                    ))}
                                                    <div className="text-center col-12">
                                                        <Pagination
                                                            defaultCurrent={1}
                                                            defaultPageSize={ProductParPage}
                                                            onChange={this.handleChange}
                                                            total={this.state.pro.length}
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
                                    <Col lg={3} md={12} className="sidebar mt-8 mt-lg-0">
                                        <Sidebar />
                                    </Col>
                                </Row>
                            </div>
                        </section>
                    </div>

                    : <div>Loading</div>
                }
            </>
        );
    }
}

const ProductDispatchToProps = (state) => ({
    products: FilterProduct(state.data, state.filters)

})
export default connect(
    ProductDispatchToProps, {}
)(fullsidebar);