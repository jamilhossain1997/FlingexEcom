
import React, { useEffect, useState } from 'react';
import apiClient from '../api/http-common';

const pro = () => {
    const [prod, setProd] = useState([]);
    useEffect(() => {
        apiClient.get(`/v1/products/latest`)
            .then(res => {
                console.log(res.data);
                setProd(res.data)
            })
    }, [prod])
    return prod;
}

export default pro
