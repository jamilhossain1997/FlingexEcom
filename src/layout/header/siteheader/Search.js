import React, { useEffect, useState } from 'react';
import apiClient from '../../../api/http-common';


const Search = () => {
    const [search, setSearch] = useState([]);
    const [searchpro, setSearchpro] = useState('');
    useEffect(() => {
        apiClient.get(`/v1/products/search?name=khdjkfh`)
            .then((response) => {
                console.log(response)
                setSearch(response.data);
            })
    }, [])
    return (
        <div>
            <div className="right-nav align-items-center d-flex justify-content-end">
                <form className="form-inline border rounded w-100">
                    {/* <select className="custom-select border-0 rounded-0 bg-light form-control d-none d-lg-inline">
                                        <option value={0}>All Categories</option>
                                        <option value={1}>Men</option>
                                        <option value={2}>Women</option>
                                        <option value={3}>Kids</option>
                                    </select> */}
                    <input value={searchpro} onChange={e => setSearchpro(e.target.value)} className="form-control border-0 border-left col" type="search" placeholder="Enter Your Keyword" aria-label="Search" />
                    <button className="btn btn-primary text-white col-auto" type="submit"><i className="las la-search" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Search
