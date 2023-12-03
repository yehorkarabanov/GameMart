import React from "react";
import styles from './LoginModal.module.scss'
import {Button, Form, Modal, Row, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import * as yup from 'yup'
import {Formik} from "formik";
import apiInstance, {apiLoginInstance} from "../../utils/axios";
import {useDispatch, useSelector} from "react-redux";
import {setTokens} from "../../redux/slices/userSlice";
import {addManyLikeItems} from "../../redux/slices/likeSlice";


export const LoginModal = ({showLoginModal, setShowLoginModal}) => {
    const [isButtonClicked, setIsButtonCliced] = React.useState(false);
    const Likes = useSelector(state => state.like.items);
    const Cart = useSelector(state => state.cart.items);
    const chnageButtonClicked = () => {
        setIsButtonCliced(true);
    };
    const dispatch = useDispatch();

    const syncLikeWithBackend = async () => {
        const instance = await apiLoginInstance();
        if (instance != null) {
            try {
                //fail with img
                const res = await instance.get("like/like/");
                await dispatch(addManyLikeItems(res.data));
            } catch (e) {
                console.log("error with getting like");
            }
            const oldLike = Likes.filter(obj => obj.isNew !== true);
            if (oldLike.length !== 0) {
                try {
                    const res = await instance.post("like/like/", oldLike.map(game => ({game:game.pk})));
                } catch (e) {
                    console.log("error with sending like");
                }
            }
        }
    }

    const syncCartWithBackend = async () => {
        const instance = await apiLoginInstance();
        if (instance != null) {
            try {
                const res = await instance.get("cart/cart/");
                await dispatch(addManyLikeItems(res.data));
            } catch (e) {
                console.log("error with getting cart");
            }
            const oldCart = Cart.filter(obj => obj.isNew !== true);
            if (oldCart.length !== 0) {
                try {
                    const res = await instance.post("like/like/", oldCart.map(game => ({game:game.pk})));
                } catch (e) {
                    console.log("error with sending cart");
                }
            }
        }
    }


    const loginSchema = yup.object().shape({
        username: yup.string().required("Please input a username"),
        password: yup.string()
            .required("Please input a password")
            .test('apiValidation', 'Invalid username or password', async function (value) {
                try {
                    const response = await apiInstance.post('account/login/', {
                        username: this.parent.username,
                        password: value
                    });
                    dispatch(setTokens(response.data));

                    await syncLikeWithBackend();
                    //await syncCartWithBackend();
                    return true;
                } catch (error) {
                    console.log(error);
                    return this.createError({
                        path: 'username',
                        message: 'Invalid username or password'
                    });
                }
            }),
    });

    const registerSchema = yup.object().shape({
        username: yup.string()
            .required("Please input a username")
            .matches(/^[a-zA-Z0-9]+$/, 'Username can contain only letters or numbers')
            .min(6, 'Username must be at least 6 characters long'),
        email: yup.string()
            .email("Invalid email address")
            .required("Please input a username."),
        password: yup.string()
            .required("Please input a password")
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one upper case letter')
            .matches(/[0-9]/, 'Password must contain at least one number'),
        repeatPassword: yup.string()
            .required("Please repeat a password")
            .oneOf([yup.ref("password"), null], "Passwords must match")
            .test('apiValidation', 'Invalid username or password', async function (value) {
                if (isButtonClicked) {
                    try {
                        const response_reg = await apiInstance.post('account/register/', {
                            username: this.parent.username,
                            email: this.parent.email,
                            password: this.parent.password,
                            password2: this.parent.repeatPassword,
                        });
                        const response = await apiInstance.post('account/login/', {
                            username: this.parent.username,
                            password: value
                        });
                        dispatch(setTokens(response.data));
                        await syncLikeWithBackend();
                        //await syncCartWithBackend();
                        setIsButtonCliced(false);
                        return true;
                    } catch (error) {
                        setIsButtonCliced(false);
                        if (error.response.data.username) {
                            return this.createError({
                                path: 'username',
                                message: 'User with this username already exist'
                            });
                        }
                        if (error.response.data.email) {
                            return this.createError({
                                path: 'email',
                                message: 'User with this username already exist'
                            });
                        }
                    }
                }
                return true;
            }),
    });


    const [loginModelType, setLoginModelType] = React.useState(1); //1-login, 2-register
    const [loginFormValidated, setLoginFormValidated] = React.useState(false);

    const handleLoginModalClose = () => setShowLoginModal(false);
    const handleChangeTypeOfLoginModal = (val) => setLoginModelType(val);
    return (
        <Modal show={showLoginModal} onHide={handleLoginModalClose}>
            <Modal.Header closeButton>
                <ToggleButtonGroup type={"radio"} name={"LoginOrRegister"} defaultValue={loginModelType}
                                   onChange={handleChangeTypeOfLoginModal} className={styles.modalHeaderButtons}>
                    <ToggleButton id={"LoginOrRegisterButton-1"} value={1} variant={'outline-light'}>
                        Login
                    </ToggleButton>
                    <ToggleButton id={"LoginOrRegisterButton-2"} value={2} variant={'outline-light'}>
                        Register
                    </ToggleButton>
                </ToggleButtonGroup>
            </Modal.Header>

            {loginModelType === 1 ? <Formik
                validationSchema={loginSchema}
                onSubmit={(values) => {
                    setLoginFormValidated(true);
                    handleLoginModalClose();
                }}
                initialValues={{
                    username: '',
                    password: ''
                }}
                validateOnChange={false}
            >
                {({handleSubmit, handleChange, values, touched, errors}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Row className={`mb-3`}>
                                <Form.Group controlId="loginUsernameValidation">
                                    <Form.Label>Username/ E-mail</Form.Label>
                                    <Form.Control required type={`text`}
                                                  placeholder={`Username/ E-mail`}
                                                  name={`username`}
                                                  value={values.username}
                                                  onChange={handleChange}
                                                  isInvalid={!!errors.username}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className={`mb-3`}>
                                <Form.Group controlId="loginPasswordValidation">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required type={`password`}
                                                  placeholder={`Password`}
                                                  name={`password`}
                                                  value={values.password}
                                                  onChange={handleChange}
                                                  isInvalid={!!errors.password}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={`secondary`} onClick={handleLoginModalClose}>
                                Close
                            </Button>
                            <Button variant={`primary`} type={`submit`}>
                                Login
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik> : <div><Formik
                validationSchema={registerSchema}
                onSubmit={(values) => {
                    setLoginFormValidated(true);
                    handleLoginModalClose();
                }}
                initialValues={{
                    username: '',
                    password: '',
                    repeatPassword: '',
                    email: '',
                }}
            >
                {({handleSubmit, handleChange, handleBlur, values, touched, errors}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Row className={`mb-3`}>
                                <Form.Group controlId="registerUsernameValidation">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control required type={`text`}
                                                  placeholder={`Username`}
                                                  name={`username`}
                                                  value={values.username}
                                                  onChange={handleChange}
                                                  isInvalid={!!errors.username && touched.username}
                                                  isValid={touched.username && !errors.username}
                                                  onBlur={handleBlur}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className={`mb-3`}>
                                <Form.Group controlId="registerEmailValidation">
                                    <Form.Label>E-mail</Form.Label>
                                    <Form.Control required type={`text`}
                                                  placeholder={`E-mail`}
                                                  name={`email`}
                                                  value={values.email}
                                                  onChange={handleChange}
                                                  isInvalid={!!errors.email && touched.email}
                                                  isValid={touched.email && !errors.email}
                                                  onBlur={handleBlur}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className={`mb-3`}>
                                <Form.Group controlId="registerPasswordValidation">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required type={`password`}
                                                  placeholder={`Password`}
                                                  name={`password`}
                                                  value={values.password}
                                                  onChange={handleChange}
                                                  isInvalid={!!errors.password && touched.password}
                                                  isValid={touched.password && !errors.password}
                                                  onBlur={handleBlur}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row className={`mb-3`}>
                                <Form.Group controlId="registerRepeatPasswordValidation">
                                    <Form.Label>Repeat password</Form.Label>
                                    <Form.Control required type={`password`}
                                                  placeholder={`Repeat password`}
                                                  name={`repeatPassword`}
                                                  value={values.repeatPassword}
                                                  onChange={handleChange}
                                                  isInvalid={!!errors.repeatPassword && touched.repeatPassword}
                                                  isValid={touched.repeatPassword && !errors.repeatPassword}
                                                  onBlur={handleBlur}/>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.repeatPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant={`secondary`} onClick={handleLoginModalClose}>
                                Close
                            </Button>
                            <Button variant={`primary`} type={`submit`} onClick={chnageButtonClicked}>
                                Login
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik></div>}
        </Modal>
    );
}