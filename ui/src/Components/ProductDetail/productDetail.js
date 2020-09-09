import React, { useEffect } from 'react';
import styles from './productDetail.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, withRouter } from "react-router-dom";
import authClient from '../../Auth/Auth';
import * as Constants from '../../Common/Constants';
import { fetchProduct } from '../../StateManager/ActionCreators/ProductsActions'
import { Row, Col, Card,  Button,Container } from 'react-bootstrap';



const ProductDetail = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    if (!authClient.isAuthenticated()) {
        history.push('/')
    }

    useEffect(() => {
        if (props.match.params.id) {
            dispatch(fetchProduct(props.match.params.id));
        }
    }, []);

    const GoBack = (param) => {
        if (history) {
           history.goBack()
        }
    }
    const product = useSelector((state) => state.ProductsReducer.product);

    const handleSubmit = (event) => {

    };
    return (
        <div className={styles.sellform}>

            {product ?
                <div>
                    <Container>
                        <Card >
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <div className={styles.propertyPane}>
                                            <img src={process.env.REACT_APP_API_URL + product.fileName} alt="" />
                                        </div>
                                    </Col>
                                    <Col>
                                        <h3 className={styles.productTitle} >{product.PropertyName}</h3>
                                        <p className={styles.productDescription} text-muted>{product.PropertyType}</p>
                                        <p className={styles.priceTitle}>Offered price:
                                        <span className={styles.price}>{product.Price}</span></p>
                                        <p className={styles.priceTitle}>Size:
                                         <span className={styles.price}>{product.Size} {product.AreaType}</span>
                                        </p>
                                        <p className={styles.priceTitle}>City:
                                         <span className={styles.price}>{product.City}</span>
                                        </p>
                                        <Row>
                                            <Col>
                                                <Button variant="success">Contact Seller</Button>
                                            </Col>
                                            <Col>
                                                <Button variant="outline-danger" onClick={() => GoBack()}>See more</Button>{' '}
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>

                : <h1>Product not found!</h1>}

            <div className={styles.copyRight}>@Copyrights Reserved, 2020.</div>

        </div >
    );
}

export default withRouter(ProductDetail);