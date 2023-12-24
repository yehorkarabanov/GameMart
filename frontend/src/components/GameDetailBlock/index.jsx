import React, {useEffect} from "react";
import styles from './GameDetailBlock.module.scss';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../../redux/slices/productSlice";
import Carousel from 'react-bootstrap/Carousel';
import {toggleLike} from "../../redux/slices/likeSlice";
import {addSingleItemToCart} from "../../redux/slices/cartSlice";
import {useNavigate} from "react-router-dom";

export const GameDetailBlock = () => {
    const {game_slug} = useParams();
    const dispatch = useDispatch();
    const item = useSelector((state) => state.product.current);
    useEffect(() => {
        dispatch(getProduct(game_slug));
    }, []);

    const isitem = useSelector(state => state.like.items.find(obj => obj.pk === item.pk));
    const toggleLikeOnClick = async () => {
        dispatch(toggleLike({
            pk: item.pk,
            name: item.name,
            image: item.image,
            price: item.price,
            slug: item.slug,
            isitem
        }));
    };

    const navigate = useNavigate();
    const addToCart = async () => {
        dispatch(addSingleItemToCart({
            pk: item.pk,
            name: item.name,
            image: item.image,
            price: item.price,
            slug: item.slug
        }))
        navigate('/cart');
    }
    return (
        <div className={`container ${styles.Product}`}>
            <div className={`${styles.FirstRow}`}>
                <div>
                    <img src={item.image} className={`image-fluid`}/>
                </div>
                <div>
                    <div className={`d-flex align-items-center`}>
                        <h1>Buy {item.name}</h1>
                        <div onClick={toggleLikeOnClick} className={styles.pointer}>
                            <box-icon type='solid' name='heart' style={!isitem ? {display: "none"} : {}}
                                      size={'md'}></box-icon>
                            <box-icon name='heart' style={isitem ? {display: "none"} : {}} size={'md'}></box-icon>
                        </div>
                    </div>
                    {item.available ? <p>Available</p> : <p>Not Available</p>}
                    <div className={`d-flex align-items-center ${styles.BuyButton}`}>
                        <button className={`btn btn-dark`} onClick={addToCart}>Add to cart</button>
                        <h4 className={`align-self-center`}>${item.price}</h4>
                    </div>
                    <p className={styles.Description}>{item.description}</p>
                </div>
            </div>

            <div className={`${styles.SecondRow}`}>
                <div className={styles.About}>
                    <ul>
                        <li>Category: {item.category.name}</li>
                        <li>Genres: {item.genre.map(genre => genre.genre).join(', ')}</li> {/*TODO: add link to genre*/}
                        <li>Release Date: 13 September 2021</li>
                        <li>Platform: Steam</li>
                        <li>Developer: Owlcat Games</li>
                        <li>Publisher: Owlcat Games</li>
                    </ul>
                </div>
                <div>
                    <h2>Screenshots</h2>
                    <Carousel data-bs-theme="dark" className={styles.Screenshots}>
                        {item.photos.map(obj =>
                            <Carousel.Item key={obj.pk}>
                                <img src={obj.photo} className={`image-fluid`}/>
                            </Carousel.Item>
                        )}
                    </Carousel>
                </div>
            </div>
            {/*<div className={``}>*/}
            {/*    <h2>Reviews 12</h2>*/}

            {/*    <div className={``}>*/}
            {/*        <div className={`first-row`}>*/}
            {/*            <div className={`img`}>*/}
            {/*                <img alt={`user`}/>*/}
            {/*            </div>*/}
            {/*            <div className={`userdata`}>*/}
            {/*                <p>data</p>*/}
            {/*                <h3>name</h3>*/}
            {/*                <h4>7/10</h4>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
}