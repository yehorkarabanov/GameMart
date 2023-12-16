import React from "react";
import styles from './CartList.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {CartListItem} from "./CartListItem";
import {clearCart, clearUserCart} from "../../redux/slices/cartSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export const CartList = () => {
    const [showModal, setModalShow] = React.useState(false);
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const cleanCart = () => {
        setModalShow(false)
        dispatch(clearUserCart());
    }

    return (
        <>
            {cart.length !== 0 ?
                <>
                    <Modal show={showModal} onHide={() => setModalShow(false)} size="lg"
                           aria-labelledby="contained-modal-title-vcenter" centered className={`${styles.Modal}`}>
                        <Modal.Header closeButton>
                            <Modal.Title className={`${styles.ModalText}`}>Are you sure that you want to clear your
                                cart?</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <ButtonGroup className={styles.ModalButtons}>
                                <Button onClick={() => setModalShow(false)} variant={`secondary`}
                                        className={styles.BtnClose}>Close</Button>
                                <Button onClick={() => cleanCart()} variant={`dark`}
                                        className={styles.BtnClear}>Clear Cart</Button>
                            </ButtonGroup>
                        </Modal.Footer>
                    </Modal>

                    <div className={`${styles.Cart}`}>
                        <div className={`container-fluid`}>
                            <div className={`row`}>
                                <div className={`col-lg-8`}>
                                    <div className={` ${styles.CartInner}`}>
                                        <div className={`table-responsive`}>
                                            <table className={`${styles.Table} table-bordered`}>
                                                <thead className={`${styles.TheadDark}`}>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                    <th>Remove</th>
                                                </tr>
                                                </thead>
                                                <tbody className={`align-middle`}>
                                                {cart.map(obj => <CartListItem key={obj.pk} {...obj}/>)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-lg-4`}>
                                    <div className={`${styles.CartInner}`}>
                                        <div className={`row`}>
                                            <div className={`col-md-12`}>
                                                <div className={`${styles.Coupon}`}>
                                                    <input type={"text"} placeholder={`Coupon Code`}/>
                                                    <button>Apply Code</button>
                                                </div>
                                            </div>
                                            <div className={`col-md-12`}>
                                                <div className={`${styles.CartSummary}`}>
                                                    <div className={`${styles.CartContent}`}>
                                                        <h1>Cart Summary</h1>
                                                        <p>Sub Total <span>$99</span></p>{/*TODO: change to dynamic*/}
                                                        <p>Coupon Discount <span>-$1</span></p>
                                                        <h2>Grand Total<span>$100</span></h2>
                                                    </div>
                                                    <div className={`${styles.CartBtn}`}>
                                                        <button onClick={() => setModalShow(true)}>Clear Cart</button>
                                                        {/*TODO: add clear cart*/}
                                                        <button>Checkout</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className={`container py-5 h-100`}>
                    <div className={styles.NoLike}>
                        You don't have any item in your cart.
                    </div>
                </div>
            }
        </>
    );
}