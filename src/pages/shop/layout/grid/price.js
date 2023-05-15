import React from 'react';
import { useEffect, useState } from 'react';
import apiClient from '../../../../api/http-common';
import { useHistory } from "react-router-dom";
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import { AiOutlineArrowRight } from "react-icons/ai";


const price = () => {
    const convert = 0.011904761904762;
    const [minPrice, setMinPrice] = useState('');
    const [mexPrice, setMexPrice] = useState('');
    const minPrice_unt = (minPrice * convert);
    const mexPrice_unt = (mexPrice * convert);
    const history = useHistory();
    const priceSubmit = () => {
        apiClient.post(`/v1/products/searchPrice?min_price=${minPrice_unt}&max_price=${mexPrice_unt}`)
            .then(res => {
                // console.log(res)
                history.push("/PriceSearch", { price: res.data });
            })
    }

    return (
        <>
            <div className="widget widget-price mb-4 pb-4 border-bottom">
                <h4 className="widget-title mb-3">Price</h4>
                {/* <button className="border-0 p-0 bg-transparent btn-link" onClick={() => this.PriceFilterClear(this.props.prices)}>clear</button> */}
                <div className="price_slider_wrapper">

                    <form>
                        <div className='container-fluid'>
                            <div className='row'>
                                <input type="number" min="10"
                                    style={{ width: `35 %` }} value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="form-control form-control-sm" placeholder='Minimum Price' />
                                <strong>To</strong>
                                <input type="number" min="10" style={{ width: `35 %` }} value={mexPrice} onChange={(e) => setMexPrice(e.target.value)} className="form-control form-control-sm" placeholder='Maxmam Price' />
                                <button type="button" onClick={priceSubmit} class="btn btn-info mt-3">
                                    <AiOutlineArrowRight />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default price