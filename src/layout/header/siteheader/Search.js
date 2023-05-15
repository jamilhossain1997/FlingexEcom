import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiClient from '../../../api/http-common';
import { useHistory } from "react-router-dom";

const Search = () => {
    const [search, setSearch] = useState([]);
    let history = useHistory();


    function searchFilter(key) {
        apiClient.get(`/v1/products/search/${key}`)
            .then((response) => {
                console.log(response)
                history.push("/Search", { state: response.data });
                setSearch(response.data);
            })
    }


    // console.log(search);
    return (
        <div>
            <div className="right-nav align-items-center d-flex justify-content-end">
                <form className="form-inline border rounded w-100" >
                    <input onChange={(e) => searchFilter(e.target.value)} className="form-control border-0 border-left col" type="search" placeholder="Enter Your Keyword" aria-label="Search" />
                    <button className="btn btn-info text-white col-auto" type="submit"><i className="las la-search" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Search
