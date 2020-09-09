import React, { useEffect } from 'react';
import styles from './productList.module.css'
import { connect } from 'react-redux'
import { useHistory, useLocation } from "react-router-dom";
import * as Constants from '../../Common/Constants';
import { fetchProducts } from '../../StateManager/ActionCreators/ProductsActions'
import authClient from '../../Auth/Auth';
import { Badge } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';


const ProductList = (props) => {

    const [MinPrice, setMinPrice] = React.useState(0);
    const [MaxPrice, setMaxPrice] = React.useState(100);
    const [MinMaxForSlider, setMinMaxForSlider] = React.useState({ min: 0, max: 100000 });
    const [propertyType, setPropertyType] = React.useState([]);
    const [SearchText, setSearchText] = React.useState("");
    const history = useHistory();
    const location = useLocation();

    if (!authClient.isAuthenticated()) {
        history.push('/')
    }

    const OnPropTypeFilterSelection = (event) => {
        if (event.target.checked) {
            setPropertyType([...propertyType, event.target.value]);
        }
        else {
            const finalTypes = propertyType.filter(x => x !== event.target.value);
            setPropertyType(finalTypes);
        }
    }

    const OnTextSearch = (searchTxt) => {
        if (searchTxt.length > 0) {
            setSearchText(searchTxt);
        }
        else {
            setSearchText("");
        }
    }


    useEffect(() => {
        if (authClient.isAuthenticated()) {
            if (location.state)
                props.fetch_Products(location.state.excludeMyproperty, authClient.getProfile().UserEmail);
            else {
                props.fetch_Products(false, authClient.getProfile().UserEmail);
            }
        }
    }, []);

    useEffect(() => {
        if (props.products) {
            var minVal = Math.min.apply(Math, props.products.map(a => a.Price));
            var maxVal = Math.max.apply(Math, props.products.map(a => a.Price));
            setMinPrice(minVal)
            setMaxPrice(maxVal)
            setMinMaxForSlider({ min: minVal, max: maxVal })
        }

    }, [props.products]);

    useEffect(() => {
        if (props.products) {
        }
    }, [propertyType, MinPrice, MaxPrice, SearchText]);

    function filterProducts(product) {
        var resultPropertyType = true;
        var resultTxtSearch = true;
        var resultPrice = true;

        if (product && propertyType.length > 0) {
            resultPropertyType = propertyType.map(v => v.toLowerCase()).includes(product.PropertyType.toLowerCase());
        }
        if (product && SearchText.length > 0) {
            resultTxtSearch = product.PropertyName.toLowerCase().includes(SearchText.toLowerCase()) || product.City.toLowerCase().includes(SearchText.toLowerCase());
        }
        if (product) {
            if (!parseInt(MinPrice) && !parseInt(MinPrice)) {
                resultPrice = true;
            }
            else {
                resultPrice = (parseInt(MinPrice) ? product.Price >= MinPrice : true) && (parseInt(MaxPrice) ? product.Price <= MaxPrice : true);
            }
        }
        return resultPrice && resultPropertyType && resultTxtSearch;
    }

    const goToProperty = (property) => {
        history.push('./productDetail/' + property._id);
    }
    return (


        <div className={styles.flexContainer}>

            <div className={styles.filterSection}>
                <div className={styles.filterHeader}>Filters</div>
                <div className={styles.filtersArea}>

                    <div className={styles.filterModule}>
                        <div className={styles.filterTitle}> Search by name or location</div>
                        <div className={styles.filterModuleItems}>
                            <div>
                                <span style={{ display: "inline" }}>
                                    <input type="text" className={styles.txtSearchBox} onKeyUp={(e) => OnTextSearch(e.target.value)} />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.filterModule}>
                        <div className={styles.filterTitle}> Property Type</div>
                        <div className={styles.filterModuleItems}>
                            {props.propertyTypeFilters && props.propertyTypeFilters.map((item, index) => {
                                return (
                                    <div>
                                        <span style={{ display: "inline" }}>
                                            <input type="checkbox" name="example" value={item} onChange={OnPropTypeFilterSelection} />
                                            <label className={styles.filterItemText}>{item}</label>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                    <div className={styles.filterModule}>
                        <div className={styles.filterTitle}> Min Budget</div>
                        <div className={styles.filterModuleItems}>
                            <div>
                                <RangeSlider
                                    value={MinPrice}
                                    onChange={e => setMinPrice(e.target.value)}
                                    variant='primary'
                                    min={MinMaxForSlider.min}
                                    max={MinMaxForSlider.max}
                                />
                            </div>
                            <div className={styles.filterTitle}> Max Budget</div>
                            <div className={styles.filterModuleItems}>
                                <div>
                                    <RangeSlider
                                        value={MaxPrice}
                                        onChange={e => setMaxPrice(e.target.value)}
                                        variant='primary'
                                        min={MinMaxForSlider.min}
                                        max={MinMaxForSlider.max} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.productList}>
                {/* <pre>  {JSON.stringify(props.products)}</pre> */}
                {props.products && props.products.length > 0 ?
                    props.products.filter(filterProducts).map(function (item, index) {
                        return (
                            <div>

                                <div className={styles.productItem} onClick={() => goToProperty(item)}>
                                    <img className={styles.productImage}
                                        src={process.env.REACT_APP_API_URL + item.fileName} alt="img not found" />
                                    <Badge variant="dark" className={styles.productPercentCicle}>{item.Size} {item.AreaType}</Badge>
                                </div>
                                <div className={styles.itemDetailContainer}>
                                    <div className={styles.itemLeft, styles.trucateTitle, styles.Title}>{item.PropertyName}</div>
                                    <div className={styles.itemLeft, styles.trucateTitle}>{item.PropertyType}</div>
                                    <div className={styles.itemLeft}>&#8377;{item.Price}</div>
                                    <div className={styles.itemRight} >
                                        <div className={styles.itemRight, styles.ViewMore} onClick={() => goToProperty(item)} >View Details...</div>
                                    </div>

                                </div>
                            </div>

                        );
                    }) : "You have no property to sell at present."}

            </div >
        </div >
    );
}

function mapStateToProps(state) {
    return {
        products: state.ProductsReducer.products.products,
        propertyTypeFilters: state.ProductsReducer.products.products ? [...new Set(state.ProductsReducer.products.products.map(item => item.PropertyType))]  : [],
     
    }
}
const mapActionToProps = (dispatch) => ({
    fetch_Products(ExcludeMyProperty, UserEmail) {
        dispatch(fetchProducts(ExcludeMyProperty, UserEmail));
    }
})
export default connect(mapStateToProps, mapActionToProps)(ProductList)