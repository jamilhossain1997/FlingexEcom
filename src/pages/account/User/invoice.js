import React, { useEffect, useState } from 'react';
import apiClient from '../../../api/http-common';
import imgUrl from '../../../api/baseUrl'
import { useParams } from 'react-router-dom';
import Invoicedownload from './invoicedownload';
import Pdf from "react-to-pdf";
// import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFDownloadLink, Document, Page, PDFViewer, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const invoice = () => {
    const ref = React.createRef();
    const [inv, setInvo] = useState([]);
    const [address, setAddress] = useState([]);
    const { id } = useParams();
    const [orderView, SetOrderView] = useState([]);
    const [logo, setLogo] = useState([]);
    const [companyAddress, setCompanyAddress] = useState([]);
    const [companyphone, setCompanyphone] = useState([]);
    // const [phone, setPhone] = useState([]);
    useEffect(() => {
        apiClient.get(`v1/company-info`)
            .then(res => {
                setLogo(res.data)
            })
    }, [])

    useEffect(() => {
        apiClient.get(`v1/company-address`)
            .then(res => {
                setCompanyAddress(res.data)
            })
    }, [])
    useEffect(() => {
        apiClient.get(`v1/company-phone`)
            .then(res => {
                setCompanyphone(res.data)
            })
    }, [])

    useEffect(() => {
        apiClient.get(`v1/customer/order/list`)
            .then(res => {
                SetOrderView(res.data)
                // console.log(res.data)
            })
    }, []);

    useEffect(() => {
        apiClient.get(`v1/customer/order/details?order_id=${id}`)
            .then(res => {
                // console.log(res.data);
                setInvo(res.data);
            })
    }, [inv]);

    useEffect(() => {
        apiClient.get(`v1/customer/address/list`)
            .then(res => {
                console.log(res)
                setAddress(res.data)
                // history.push('/order-complate')
            })
            .catch(err => {
                console.log(err);
            })
    }, [address])


    // const submitForm = async (event) => {
    //     event.preventDefault(); // prevent page reload
    //     const blob = await pdf(
    //         <Invoicedownload orderID={id} />
    //     ).toBlob();

    //     saveAs(blob, 'wycena.pdf');
    // }

    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [4, 2]
    };

    const price = inv.details?.reduce((total, item) => total + (item?.product_details?.unit_price * item?.qty), 0)
    const discount = inv.details?.reduce((total, item) => total + (((item?.product_details?.discount_type == 'percent') ? ((item?.product_details?.unit_price * item?.product_details?.discount) / 100) : item?.product_details?.discount) * item?.qty), 0);
    const convert = 0.011904761904762;
    const shipping_cost = Math.round(inv.order?.shipping_cost / convert);
    const borderColor = '#3778C2'
    const styles = StyleSheet.create({
        page: {
            backgroundColor: '#fff',
            fontFamily: 'Helvetica',
            fontSize: 11,
            paddingTop: 30,
            paddingLeft: 50,
            paddingRight: 50,
            lineHeight: 1.5,
            flexDirection: 'column',
        },
        logo: {
            width: 84,
            height: 70,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        titleContainer: {
            marginTop: 24,
        },
        reportTitle: {
            color: '#3778C2',
            letterSpacing: 4,
            fontSize: 25,
            textAlign: 'center',
            textTransform: 'uppercase',
        }
        ,
        container: {
            flexDirection: 'row',
            borderBottomColor: '#3778C2',
            backgroundColor: '#3778C2',
            color: '#fff',
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,
            textAlign: 'center',
            fontStyle: 'bold',
            flexGrow: 1,
        },
        tableContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 24,
            borderWidth: 1,
            borderColor: '#3778C2',
        },
        description: {
            width: '60%',
            borderRightColor: borderColor,
            borderRightWidth: 1,
        },
        qty: {
            width: '10%',
            borderRightColor: borderColor,
            borderRightWidth: 1,
        },
        rate: {
            width: '15%',
            borderRightColor: borderColor,
            borderRightWidth: 1,
        },
        amount: {
            width: '15%'
        },
    });

    const InvoiceTableRow = StyleSheet.create({
        row: {
            flexDirection: 'row',
            borderBottomColor: '#3778C2',
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,
            fontStyle: 'bold',
        },
        description: {
            width: '60%',
            textAlign: 'left',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingLeft: 8,
        },
        qty: {
            width: '10%',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            textAlign: 'right',
            paddingRight: 8,
        },
        rate: {
            width: '15%',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            textAlign: 'right',
            paddingRight: 8,
        },
        amount: {
            width: '15%',
            textAlign: 'right',
            paddingRight: 8,
        },
    });

    const InvoiceTableFooter = StyleSheet.create({
        row: {
            flexDirection: 'row',
            borderBottomColor: '#3778C2',
            borderBottomWidth: 1,
            alignItems: 'center',
            height: 24,
            fontSize: 12,
            fontStyle: 'bold',
        },
        description: {
            width: '85%',
            textAlign: 'right',
            borderRightColor: borderColor,
            borderRightWidth: 1,
            paddingRight: 8,
        },
        total: {
            width: '15%',
            textAlign: 'right',
            paddingRight: 8,
        },
    });


    const BillTo = StyleSheet.create({
        headerContainer: {
            marginTop: 10,
            justifyContent: 'flex-start',
            width: '50%'
        },
        billTo: {
            marginTop: 20,
            paddingBottom: 3,
            fontFamily: 'Helvetica-Oblique'
        },
    });

    const invoiceNo = StyleSheet.create({
        invoiceNoContainer: {
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'flex-end'
        },
        invoiceDateContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
        },
        label: {
            width: 60
        }
    });
    const InvoiceThankYouMsg = StyleSheet.create({
        titleContainer: {
            marginTop: 12
        },
        reportTitle: {
            fontSize: 12,
            textAlign: 'center',
            textTransform: 'uppercase',
        }
    });
    const MyDoc = () => (
        <>
            <Document>
                <Page size="A4" style={styles.page}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.reportTitle}>Invoice</Text>
                    </View>
                    <Image style={styles.logo} src="https://cors.bridged.cc/https://admin.sajerbela.com/storage/app/public/company/2023-03-31-6426dc9918aaa.png" />
                    {/* <View style={invoiceNo.invoiceNoContainer}>
                        <Text >Company Information:</Text>
                        <Text>{companyAddress.value}</Text>

                        <Text style={invoiceNo.invoiceDate}>
                        </Text>

                    </View > */}
                    {/* <View style={invoiceNo.invoiceNoContainer}>
                        <Text>{companyphone.value}</Text>
                    </View > */}

                    <View style={BillTo.headerContainer}>
                        <Text style={BillTo.billTo}>Shipping To:</Text>

                        <Text>{address.contact_person_name},</Text>
                        <Text>{address.phone},</Text>
                        <Text>{address.address},</Text>
                        <Text>{address.city},</Text>
                        <Text>{address.address_type}</Text>
                        <Text>Invoice No:{id}</Text>
                        <Text >Payment status:{inv?.order?.payment_status}</Text>
                        <Text >Payment Method:{inv?.order?.payment_method}</Text>
                        <Text >Order Status:{inv?.order?.order_status}</Text>
                    </View>
                    {/* table */}
                    <View style={styles.tableContainer}>
                        <View style={styles.container}>
                            <Text style={styles.description}>Item Description</Text>
                            <Text style={styles.qty}>Qty</Text>
                            <Text style={styles.rate}>Price</Text>
                            <Text style={styles.rate}>Discount</Text>
                            <Text style={styles.amount}>Amount</Text>
                        </View>
                        {
                            inv.details?.map((item, i) => {
                                return (
                                    <>
                                        <View style={InvoiceTableRow.row} key={i}>
                                            <Text style={InvoiceTableRow.description}>{item?.product_details?.name}</Text>
                                            <Text style={InvoiceTableRow.qty}>{item.qty}</Text>
                                            <Text style={InvoiceTableRow.rate}>
                                                {Math.round((item?.product_details?.unit_price) / convert)}TK
                                            </Text>

                                            <Text style={InvoiceTableRow.rate}>
                                                {
                                                    item?.product_details.discount > 0 ? item?.product_details?.discount_type == 'percent' ? <>{Math.round((item?.product_details.discount))}%</> : null : null
                                                }

                                                {
                                                    item?.product_details.discount > 0 ? item?.product_details?.discount_type == 'flat' ? <> {Math.round((item?.product_details.discount / convert))}TK</> : null : null
                                                }
                                            </Text>
                                            <Text style={InvoiceTableRow.amount}>
                                                {
                                                    item?.product_details?.discount_type == 'percent' ?
                                                        <>
                                                            {((Math.round(item?.product_details.unit_price / convert, 2) * item.qty)) - ((Math.round((item?.product_details.unit_price * item?.product_details.discount) / convert, 2) / 100) * item.qty)}TK
                                                        </> : null

                                                }

                                                {
                                                    item?.product_details?.discount_type == 'flat' ?
                                                        <>
                                                            {((Math.round(item?.product_details.unit_price / convert, 2) * item.qty)) - ((Math.round((item?.product_details.discount) / convert, 2)) * item.qty)}TK
                                                        </> : null
                                                }
                                            </Text>

                                        </View>
                                    </>)
                            })}
                        <View style={InvoiceTableFooter.row}>
                            <Text style={InvoiceTableFooter.description}>TOTAL PRICE</Text>
                            <Text style={InvoiceTableFooter.total}>{Math.round(price / convert)} TK</Text>
                        </View>
                        <View style={InvoiceTableFooter.row}>
                            <Text style={InvoiceTableFooter.description}>TOTAL DISCOUNT</Text>
                            <Text style={InvoiceTableFooter.total}>{Math.round(discount / convert)} TK</Text>
                        </View>
                        <View style={InvoiceTableFooter.row}>
                            <Text style={InvoiceTableFooter.description}>SUB TOTAL</Text>
                            <Text style={InvoiceTableFooter.total}>{Math.round(price / convert) - Math.round(discount / convert)} TK</Text>
                        </View>
                        <View style={InvoiceTableFooter.row}>
                            <Text style={InvoiceTableFooter.description}>SHIPPING COST</Text>
                            <Text style={InvoiceTableFooter.total}>{shipping_cost} TK</Text>
                        </View>
                        <View style={InvoiceTableFooter.row}>
                            <Text style={InvoiceTableFooter.description}>VAT</Text>
                            <Text style={InvoiceTableFooter.total}>0 TK</Text>
                        </View>
                        <View style={InvoiceTableFooter.row}>
                            <Text style={InvoiceTableFooter.description}>TOTAL</Text>
                            <Text style={InvoiceTableFooter.total}>{Math.round(price / convert) - Math.round(discount / convert) + shipping_cost} TK</Text>
                        </View>
                        {/* <View style={InvoiceTableFooter.row}>
                            <Text style={InvoiceTableFooter.description}>Discount</Text>
                            <Text style={InvoiceTableFooter.description}>Shipping Cost</Text>
                            <Text style={InvoiceTableFooter.description}>VAT</Text>
                            <Text style={InvoiceTableFooter.description}>TOTAL</Text>
                            <Text style={InvoiceTableFooter.total}>{Math.round(discount / convert)} TK</Text>
                            <Text style={InvoiceTableFooter.total}>{shipping_cost}TK</Text>
                            <Text style={InvoiceTableFooter.total}>0 TK</Text>
                            <Text style={InvoiceTableFooter.total}>{Math.round(price / convert) - Math.round(discount / convert) + shipping_cost}</Text>
                        </View> */}

                    </View>
                    <View style={InvoiceThankYouMsg.titleContainer}>
                        <Text style={InvoiceThankYouMsg.reportTitle}>*** Thank You ***</Text>
                    </View>
                </Page>
            </Document>
        </>
    );


    // console.log(shipping_cost);
    return (
        <>
            <div style={{ textAling: `center` }}>
                <div class="container mt-5 mb-5">
                    {/* <div className='row'>
                        <div className='mb-5 ml-5'>
                            <span class="" style={{ marginLeft: `189px` }}>
                                <Pdf targetRef={ref} filename="invoice.pdf">
                                    {({ toPdf }) => <button class="btn btn-primary" onClick={toPdf}>Download</button>}
                                </Pdf>
                            </span>
                        </div>
                    </div> */}
                    <div class="card mb-2">
                        <div class="card-header">


                            <strong>{invoice.created_at}</strong>
                            <span class="float-right" >
                                <PDFDownloadLink document={<MyDoc />} fileName="Invoice.pdf">
                                    {({ blob, url, loading, error }) =>
                                        'Download now!'
                                    }
                                </PDFDownloadLink>
                                {/* <img className="img-fluid" src={`${imgUrl}storage/app/public/company/${logo.value}`} alt="hello" /> */}
                            </span>
                        </div>
                        <div class="card-body">
                            <h1 className='invoiceHeader'>Invoice</h1>
                            <div class="row mb-4">
                                <div class="col-sm-6">
                                    <h6 class="mb-3">From:</h6>
                                    <div>
                                        <strong>Invoice No:#{id}</strong>
                                    </div>
                                    <div>
                                        <strong>{address.contact_person_name}</strong>
                                    </div>
                                    <div>{address.phone}</div>
                                    <div>{address.address}</div>
                                </div>
                                <div className='col-sm-6'>
                                    <span class="float-right" >
                                        <img className="img-fluid" src={`${imgUrl}storage/app/public/company/${logo.value}`} alt="hello" style={{ height: `112px` }} />
                                    </span>
                                </div>
                            </div>

                            <div class="table-responsive-sm">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            {/* <th>Description</th> */}
                                            {/* <th>Delivery Status</th>
                                        <th>Payment Status</th> */}
                                            <th class="right">Unit Cost</th>
                                            <th>Discount</th>
                                            <th class="center">Qty</th>
                                            <th class="right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            inv.details?.map((item, i) => {
                                                return (
                                                    <>
                                                        <tr key={i}>
                                                            <td class="left strong">{item?.product_details?.name}</td>
                                                            {/* <td class="right">{item?.product_details?.details}</td> */}
                                                            {/* <td>{item.delivery_status}</td>
                                                        <td>{item.payment_status}</td> */}
                                                            <td class="left">৳{Math.round((item?.product_details?.unit_price) / convert)}</td>
                                                            <td class="left">
                                                                {
                                                                    item?.product_details.discount > 0 ? item?.product_details?.discount_type == 'percent' ? <>{Math.round((item?.product_details.discount))}%</> : null : null
                                                                }

                                                                {
                                                                    item?.product_details.discount > 0 ? item?.product_details?.discount_type == 'flat' ? <> ৳{Math.round((item?.product_details.discount / convert))}</> : null : null
                                                                }
                                                            </td>
                                                            <td class="center">{item?.qty}</td>
                                                            {/* <td class="right">{item?.product_details.discount > 0 ? item.product_details?.discount_type == 'percent' ? <>৳{((Math.round(item?.product_details?.unit_price / convert, 2) * item.qty)) - (Math.round(((item?.product_details.unit_price / convert * item?.product_details.discount)), 2) / 100)}</> : <>৳{((Math.round(item?.product_details.unit_price / convert, 2) * item.qty)) - (Math.round((item?.product_details.discount) / convert, 2))}</> : <>৳{Math.round((item?.product_details.unit_price / convert, 2) * item.qty)}</>}</td> */}
                                                            <td>
                                                                {
                                                                    item?.product_details?.discount_type == 'percent' ?
                                                                        <>
                                                                            ৳{((Math.round(item?.product_details.unit_price / convert, 2) * item.qty)) - ((Math.round((item?.product_details.unit_price * item?.product_details.discount) / convert, 2) / 100) * item.qty)}
                                                                        </> :
                                                                        <>
                                                                            ৳{((Math.round(item?.product_details.unit_price / convert, 2) * item.qty)) - ((Math.round((item?.product_details.discount) / convert, 2)) * item.qty)}
                                                                        </>
                                                                }
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }


                                    </tbody>
                                </table>
                            </div>
                            <div class="row">
                                <div class="col-md-7"></div>
                                <div class="col-md-5">
                                    <table class="table table-clear">
                                        <tbody>
                                            <tr>
                                                <td class="left">
                                                    Total Price
                                                </td>
                                                <td class="right">৳{Math.round(price / convert)}</td>
                                            </tr>
                                            <tr>
                                                <td class="left">
                                                    Total Discount
                                                </td>
                                                <td class="right">৳{Math.round(discount / convert)}</td>
                                            </tr>
                                            <tr>
                                                <td class="left">
                                                    Sub Total
                                                </td>
                                                <td class="right">৳{Math.round(price / convert) - Math.round(discount / convert)}</td>
                                            </tr>
                                            <tr>
                                                <td class="left">
                                                    Shipping Cost
                                                </td>
                                                <td class="right">৳{shipping_cost}</td>
                                            </tr>
                                            <tr>
                                                <td class="left">
                                                    VAT
                                                </td>
                                                <td class="right">৳0</td>
                                            </tr>
                                            <tr>
                                                <td class="left">
                                                    <strong>Total</strong>
                                                </td>
                                                <td class="right">
                                                    <strong>৳{Math.round(price / convert) - Math.round(discount / convert) + shipping_cost}</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default invoice