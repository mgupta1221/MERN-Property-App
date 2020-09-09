import React, { useState } from 'react';
import styles from './userHome.module.css'
import { useHistory } from "react-router-dom";
import authClient from '../../Auth/Auth';
import * as Constants from '../../Common/Constants';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Container, Row, Col, Modal, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartArea, faCubes, faUniversity } from '@fortawesome/free-solid-svg-icons'




const UserHome = () => {
    const [show, setShow] = useState(false);
    const history = useHistory();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Area, setArea] = useState("Sq ft");
    const [PropImage, setPropImage] = useState(null);
    const [Terms, setTerms] = useState(false);
    const [validated, setValidated] = useState(false);
    const [ShowProgress, setShowProgress] = React.useState(false);
    const handleAreaSelect = (e) => {
        setArea(e.target.value)
    }


    if (!authClient.isAuthenticated()) {
        history.push('/')
    }
    const OnSell = (event) => {
        setShowProgress(false);
        handleShow();
    }

    const OnBuy = (param) => {
        if (history) {
            history.push({
                pathname: '/productList',
                state: { excludeMyproperty: true }
            })
        }
    }

    const ShowMyProperties = (param) => {
        if (history) {
            history.push('/productList');
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity()) {
            saveProperty(form);
        }
        event.preventDefault();
        event.stopPropagation();

        setValidated(true);

    };

    const saveProperty = (form) => {

        const upload_file = PropImage[0];
        const formData = new FormData();
        formData.append('propertyImage', upload_file);
        formData.append('city', form.city.value);
        formData.append('propertyName', form.propertyName.value);
        formData.append('propertytype', form.propertytype.value);
        formData.append('size', form.area.value);
        formData.append('price', form.price.value);
        formData.append('areaType', Area);
        formData.append('terms', form.terms.value);
        formData.append('ownerId', authClient.getProfile().UserEmail);
        
        setShowProgress(true);
        fetch(process.env.REACT_APP_SAVE_PROPERTY_URL, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(res => {   
                debugger;             
                if (res.error) {
                    throw (res.error);
                }
                setShowProgress(false);
                if (res) {
                    ShowMyProperties();
                }
            })
            .catch(error => {
                //  console.log(error)
            })
    }
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Jumbotron className={styles.buyBox} onClick={() => OnBuy()}>
                            <h1 className="header">Buy</h1>
                            <FontAwesomeIcon icon={faChartArea} size="3x" />
                        </Jumbotron>
                    </Col>
                    <Col>
                        <Jumbotron className={styles.sellBox} onClick={() => OnSell()}>
                            <h1 className="header">Sell</h1>
                            <FontAwesomeIcon icon={faCubes} size="3x" />
                        </Jumbotron>
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                    <Col>
                        <Jumbotron className={styles.myPropertiesBox} onClick={() => ShowMyProperties()}>
                            <h3 className="header">My Properties</h3>
                            <FontAwesomeIcon icon={faUniversity} size="2x" />
                        </Jumbotron>
                    </Col>
                    <Col></Col>
                </Row>

            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>    Tell us about your property</Modal.Title>
                </Modal.Header>


                <Modal.Body>  <div className={styles.sellform}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        {ShowProgress ?
                            <Form.Label size="lg" className={styles.working}>
                                Working, please wait for a moment..
                        </Form.Label>
                            : null}
                        <Form.Group controlId="formBasicCity">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" name="city"
                                required placeholder="Enter city" />
                        </Form.Group>

                        <Form.Group controlId="formBasicProperty">
                            <Form.Label>Property</Form.Label>
                            <Form.Control type="text" name="propertyName" required placeholder="Enter Property or Locality" />
                        </Form.Group>
                        <Form.Label >Property type</Form.Label>
                        <Form.Group controlId="formBasicPropertyType">
                            <Form.Check
                                inline
                                required
                                type="radio"
                                label="Residential"
                                name="propertytype"
                                value="Residential"
                                id="formPropertytype1"
                            />
                            <Form.Check
                                inline
                                required
                                type="radio"
                                label="Commercial"
                                name="propertytype"
                                value="Commercial"
                                id="formPropertytype2"
                            />
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <InputGroup className="mb-3">

                                    <FormControl
                                        type="number"
                                        placeholder="Enter Area"
                                        name="area"
                                    />
                                    <InputGroup.Append>
                                        <FormControl as="select" custom
                                            defaultValue={Area}
                                            onChange={handleAreaSelect}>
                                            <option value="Sq ft">Sq ft</option>
                                            <option value="Sq Metres">Sq Metres</option>
                                        </FormControl>
                                    </InputGroup.Append>

                                </InputGroup>
                            </Col>
                            <Col>

                                <FormControl type="number" name="price" required
                                    placeholder="Expected Price(INR)"
                                />
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="formBasicFileUpload">
                            <Form.File
                                id="custom-file"
                                label="Upload Property Image"
                                name="propertyImage"
                                custom
                                required
                                onChange={(e) => setPropImage(e.target.files)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check
                                required
                                name="terms"
                                label="Agree to terms and conditions"
                                defaultValue={Terms}
                                onChange={e => {
                                    setTerms(e.target.checked);
                                }}
                                id="validationFormik0"
                            />
                        </Form.Group>
                        <Row>
                            <Col md={{ span: 3, offset: 9 }}>
                                <Button variant="primary" type="submit">
                                    Submit
                        </Button>
                            </Col>
                        </Row>

                    </Form>
                </div>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className={styles.copyRight}>@ Copyright Reserved, 2020.</div>

        </div>
    );
}


export default UserHome