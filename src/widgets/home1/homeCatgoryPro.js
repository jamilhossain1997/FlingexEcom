import React from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css'
import apiClient from '../../api/http-common';
import imgUrl from '../../api/baseUrl';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiCaretRightCircle } from "react-icons/bi";
window.fn = OwlCarousel;


// const bestSeller = async () => {
//     const result = await apiClient.get(`/v1/products/home-categories`)
//     return result.data;
// }
class Newcollection extends React.Component {



    constructor(props) {
        super(props);
        this.quickview = this.quickview.bind(this);
        this.onChangeColor = this.onChangeColor.bind(this);
        this.state = {
            modelview: false,
            viewproduct: [],
            cat: [],
            SelectedSize: "",
            selectedColor: "",
            options: {
                loop: true,
                nav: true,
                dots: false,
                responsive: {
                    0: {
                        items: 1,
                    },
                    300: {
                        items: 2,
                    },
                    600: {
                        items: 2,
                    },
                    1000: {
                        items: 6
                    },
                },
            },
        };

    }



    componentDidMount() {
        apiClient.get(`v1/products/home-categories`)
            .then(res => {
                const cat = res.data;
                this.setState({ cat });
            })
    }

    quickview() {
        this.setState(prevState => ({
            modelview: !prevState.modelview
        }));
    }
    onClickQuickView(product) {
        this.setState({
            modelview: true,
            viewproduct: product
        })
    }
    Productaddcart(ProductID, ProductName, ProductImage, Qty, Rate, discount, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("CartProduct"));
        if (Cart == null)
            Cart = new Array();
        let Productadd = Cart.find(product => product.ProductID === ProductID);
        if (Productadd == null) {
            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, Discount: discount, StockStatus: StockStatus });
            localStorage.removeItem("CartProduct");
            localStorage.setItem("CartProduct", JSON.stringify(Cart));
            var flag = 0;
            if (flag == 0) {
                toast.success("Item Added to Cart");
                flag = 1;
            }
        }
        else {
            toast.warning("Item is already in Cart");
        }
    }

    onChangeColor(event) {
        console.log(event.target.value);

        this.setState({
            selectedColor: event.target.value
        });
    }

    onChangeSize(event) {
        console.log(event.target.value);
        this.setState({
            SelectedSize: event.target.value
        });
    }
    Productaddwishlist(ProductID, ProductName, ProductImage, Qty, Rate, discount, StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("WishlistProduct"));
        if (Cart == null)
            Cart = new Array();

        let Productadd = Cart.find(product => product.ProductID === ProductID);
        if (Productadd == null) {

            Cart.push({ ProductID: ProductID, ProductName: ProductName, ProductImage: ProductImage, Qty: Qty, Rate: Rate, Discount: discount, StockStatus: StockStatus });
            localStorage.removeItem("WishlistProduct");
            localStorage.setItem("WishlistProduct", JSON.stringify(Cart));

            toast.success("Item Added to WishList");
        }
        else {
            toast.warning("Item is already in WishList");
        }


    }
    CartItems(ID) {
        let checkcart = false;
        var Cart = JSON.parse(localStorage.getItem("CartProduct"));
        if (Cart && Cart.length > 0) {
            for (const cartItem of Cart) {
                if (cartItem.ProductID === ID) {
                    checkcart = true
                }
            }
        }
        return checkcart;
    }
    WishlistItems(ID) {
        let wishlist = false;
        var Wish = JSON.parse(localStorage.getItem("WishlistProduct"));

        if (Wish && Wish.length > 0) {
            for (const wishItem of Wish) {
                if (wishItem.ProductID === ID) {
                    wishlist = true
                }
            }
        }
        return wishlist;
    }

    onChangeColor(event) {
        console.log(event.target.value);

        this.setState({
            selectedColor: event.target.value
        });
    }

    onChangeSize(event) {
        console.log(event.target.value);
        this.setState({
            SelectedSize: event.target.value
        });
    }

    render() {
        const { viewproduct } = this.state;
        const convert = 0.011904761904762;



        // const { isLoading, error, data } = useQuery('repoData1', bestSeller);
        return (
            <>
                <HelmetProvider>
                    <ToastContainer autoClose={5000} />
                    {
                        this.state.cat?.map((cat, i) => {

                            return (
                                <>
                                    <Row className="justify-content-center text-center mb-5" key={i}>
                                        <Col lg={8} md={10}>
                                            <div className="mb-5">
                                                <h6 className="text-primary mb-0">
                                                    — category gallery
                                                </h6>
                                                <h2 className="mb-0">{cat.name}</h2>
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            {/* Tab panes */}
                                            <div className="tab-content p-0">

                                                <OwlCarousel
                                                    className="owl-carousel no-pb owl-2"
                                                    {...this.state.options}
                                                    navText={["<span class='la la-angle-left'><span></span></span>", "<span class='la la-angle-right'><span></span></span>"]}

                                                >
                                                    {cat.products?.map((productdata, index) => {

                                                        return (

                                                            <div className="item" key={index}>
                                                                <div className="card product-card">

                                                                    {
                                                                        productdata.video_url ?
                                                                            <Link className="d-block" to={`/product-single/${productdata.slug}`}>
                                                                                {/* <img className="card-img-top card-img-back" src={`${imgUrl}storage/app/public/product/${productdata.images[0]}`} alt="hello" /> */}
                                                                                <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} />
                                                                                <div style={{ zIndex: `9999`, marginTop: `-138px`, marginLeft: `80px` }}>
                                                                                    <BiCaretRightCircle size={70} />
                                                                                </div>

                                                                            </Link>
                                                                            :
                                                                            <Link className="d-block" to={`/product-single/${productdata.slug}`}>
                                                                                {/* <img className="card-img-top card-img-back" src={`${imgUrl}storage/app/public/product/${productdata.images[0]}`} alt="hello" /> */}
                                                                                <img className="card-img-top card-img-front" src={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} alt={`${imgUrl}storage/app/public/product/thumbnail/${productdata.thumbnail}`} />
                                                                            </Link>


                                                                    }
                                                                    {/* <BiCaretRightCircle width={10} style={{ width: `20px` }} /> */}




                                                                    <div className="product-title">
                                                                        <Link to={`/product-single/${productdata.slug}`} className="link-title ml-1" style={{ fontSize: 12 }}>
                                                                            {productdata.name}
                                                                        </Link>
                                                                    </div>
                                                                    <div className="mt-1">

                                                                        <span className="product-price text-info">
                                                                            {
                                                                                productdata.discount > 0 ? productdata?.discount_type == 'percent' ? <>৳{Math.round((productdata?.unit_price / convert) - (productdata?.unit_price / convert * productdata?.discount) / 100)}</> : <>৳{(Math.round(productdata?.unit_price / convert) - ((productdata?.discount) / convert))}</> : <>৳{Math.round(productdata?.unit_price / convert)}</>
                                                                            }

                                                                        </span><br />
                                                                        <span>
                                                                            {
                                                                                productdata?.discount > 0 ? <del className="text-muted ml-1 h6" style={{ fontSize: 12 }}> ৳{Math.round(productdata?.unit_price / convert, 2)}</del>
                                                                                    : null
                                                                            }


                                                                            {
                                                                                productdata.discount > 0 ? productdata?.discount_type == 'percent' ? <> <span className="text-muted h6 ml-1" style={{ fontSize: 12 }}>-{Math.round((productdata.discount))}%</span></> : null : null
                                                                            }

                                                                            {
                                                                                productdata.discount > 0 ? productdata?.discount_type == 'flat' ? <> <span className="text-muted h6 ml-1" style={{ fontSize: 12 }}>- ৳{Math.round((productdata.discount / convert))}</span></> : null : null
                                                                            }
                                                                        </span>
                                                                        {/* <div className="star-rating"><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" /><i className="las la-star" />
                                                                                    </div> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    )}
                                                </OwlCarousel>

                                            </div>
                                        </Col>
                                    </Row>



                                </>
                            )
                        })
                    }


                </HelmetProvider>
            </>
        )
    }
}

export default Newcollection;