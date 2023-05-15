import React, { useEffect, useState } from 'react';
import apiClient from '../../../api/http-common';
import { useParams } from 'react-router-dom';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const invoicedownload = (props) => {

    const ref = React.createRef();
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });
    const price = props.inv.details?.reduce((total, item) => total + (item?.product_details?.unit_price * item?.qty), 0)
    const discount = props.inv.details?.reduce((total, item) => total + (((item?.product_details?.discount_type == 'percent') ? ((item?.product_details?.unit_price * item?.product_details?.discount) / 100) : item?.product_details?.discount) * item?.qty), 0);
    const convert = 0.011904761904762;
    const shipping_cost = Math.round(props.inv.order?.shipping_cost / convert);
    console.log(props.address.contact_person_name)
    return (
        <>

            <Document>
                <Page size="A4" style={styles.page}>

                    <View style={styles.section}>
                        <Text>{props.address.contact_person_name}</Text>
                    </View>
                </Page>
            </Document>

        </>
    )
}

export default invoicedownload