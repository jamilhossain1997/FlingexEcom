import React, { useState, useEffect } from "react";
import { Row, Col, Container } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { RiShoppingBag3Line } from "react-icons/ri";
import { BiCaretRightCircle } from "react-icons/bi";
import imgUrl from '../../api/baseUrl';
import apiClient from '../../api/http-common';
import { useParams } from "react-router-dom";

const sellerProductBanner = (props) => {
    const [banner, setBanner] = useState([])
    useEffect(() => {
        apiClient.get(`v1/seller/${props.id}/all-products`)
            .then((res) => {
                setBanner(res.data.shop);
                // console.log(res.data)
            })
    }, [])

    return (
        <div>

            <img className="card-img-top card-img-front mb-2" src={`${imgUrl}storage/app/public/shop/banner/${banner?.banner}`} />

        </div>
    )
}

export default sellerProductBanner
