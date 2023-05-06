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

const ProductParPage = 9;
class nosidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ActiveProductID: parseInt(this.props.match.params.id),
            pro: [],
            minValue: 0,
            maxValue: 9,
            status: true,
        }
    }

    // componentDidMount() {
    //   const id = this.props.match.params.id;
    //   console.log('Do something with it', id);
    //   this.fetchData(id);
    // }





    componentDidMount() {
        window.scrollTo(0, 0)
        let id = this.state.ActiveProductID;
        apiClient.get(`/v1/categories/products/${id}`)
            .then(res => {
                const pro = res.data;
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
        // let { products } = this.props;
        let { status } = this.state;
        // console.log(this.state.pro);

        return (
            <>
                {/*hero section start*/}
                <section className="bg-light">
                    <Pageheading foldername={""} title={"Product"} />
                </section>
                {/*hero section start*/}
                {/*body content start*/}
                {status ?
                    <div className="page-content">
                        <section>
                            <Container>
                                <Row>
                                    <Col lg={12} md={12}>
                                        <Topbar productdata={this.state.pro.length} />
                                        <Row>

                                            {(this.state.pro.length > 0) ?
                                                <>

                                                    {this.state.pro?.map((product, index) => (
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
                                </Row>
                            </Container>
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
)(nosidebar);