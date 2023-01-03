import { useEffect, useState } from "react";
import "./cart_react.css";
import { Helmet } from "react-helmet";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import Navbar from "../Navbar";
import { Link, useHistory } from "react-router-dom";
import { CartState } from "../../context";
import API from "../../api/api";

const Cart = () => {
    const { cart, setCart } = CartState();
    const [open, setOpen] = useState(false);
    const [cash, setCash] = useState(false);
    var amount = 0;
    const currency = "USD";
    const style = { layout: "vertical" };
    const history = useHistory();

    const [user, setUser] = useState();
    const fetchUser = async () => {
        const { data } = await axios.get(API + `user`, {
            withCredentials: true,
        });
        setUser(data);
    };
    useEffect(() => {
        fetchUser();
    }, []);

    const createOrder = async (data) => {
        try {
            console.log("data-->", data);
            // const res = await axios.post(
            //     "http://localhost:3000/api/orders",
            //     data
            // );
            console.log("Connected");
            // res.status === 201 && history.push("/orders/" + res.data._id);
            // dispatch(reset());
            history.push("/ccu");
            setCart({
                quantity: 0,
                total: 0,
                products: new Map(),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);

        return (
            <>
                {showSpinner && isPending && <div className="spinner" />}
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[1, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: 1,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            // Your code here after capture the order
                            const shipping = details.purchase_units[0].shipping;
                            createOrder({
                                customer: shipping.name.full_name,
                                address: shipping.address.address_line_1,
                                total: 1,
                                method: 1,
                            });
                        });
                    }}
                />
            </>
        );
    };

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("http://localhost:5000/payment/orders");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }
        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_5uFNte2ng1rkYG", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "KoshBooks",
            description: "Test Transaction",
            image: "",
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post(
                    "http://localhost:5000/payment/success",
                    data
                );

                if (result.status === 200) {
                    alert("Payment Successful");
                    setCart({
                        quantity: 0,
                        total: 0,
                        products: new Map(),
                    });
                    history.push("/ccu");
                } else {
                    alert("Payment Unsuccessful");
                }
            },
            prefill: {
                name: "Soumya Dey",
                email: "SoumyaDey@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    const Delete = (id) => {
        if (cart.products.has(id)) {
            var amount = cart.products.get(id).price;
            var quantity = cart.products.get(id).quantity;
            cart.products.delete(id);
            setCart((prev) => ({
                quantity: prev.quantity - quantity,
                total: prev.total - quantity * amount,
                products: prev.products,
            }));
        } else {
            console.log("No");
        }
    };

    return (
        <>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <script
                    src="https://kit.fontawesome.com/de33fbad5c.js"
                    crossorigin="anonymous"
                ></script>
            </Helmet>
            <Navbar />

            <div className="container_c">
                <div className="left_c">
                    <table className="table_c">
                        <tbody>
                            <tr className="tr_title">
                                <th>Product</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </tbody>
                        {[...cart.products.values()].map((val) => (
                            <tbody key={val._id}>
                                <tr className="tr_c">
                                    <td>
                                        <div className="imgContainer_c">
                                            <img src={val.image} alt="" />
                                        </div>
                                    </td>
                                    <td>
                                        <Link to={`/books/${val._id}`}>
                                            <span className="name_c">
                                                {val.name}
                                            </span>
                                        </Link>
                                    </td>
                                    <td>
                                        <span className="price_c">
                                            ${val.price}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="quantity_c">
                                            {val.quantity}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="total_c">
                                            ${val.price * val.quantity}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => Delete(val._id)}
                                            class="delete"
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>

                <div className="right_c">
                    <div className="wrapper_c">
                        <h2 className="title_c">CART TOTAL</h2>
                        <div className="total_text_c">
                            <b className="totalTextTitle_c">Quantity:</b>
                            {cart.quantity}
                        </div>
                        <div className="total_text_c">
                            <b className="totalTextTitle_c">Total:</b>${" "}
                            {cart.products.forEach(
                                (val, key) =>
                                    (amount += val.quantity * val.price)
                            )}
                            {amount}
                        </div>
                        {open ? (
                            <div className="payment_methods">
                                <button
                                    className="paybutton"
                                    onClick={() => setCash(true)}
                                >
                                    CASH ON DELIVERY
                                </button>
                                <PayPalScriptProvider
                                    options={{
                                        "client-id":
                                            "ASnPxSusZ32j7LyBrGmLMg5MCJe3XmX9Ls18BsfN06oIlom_ZdzhFEeFAJ_tslyVVBt6dc3cf8nOmqJn",
                                        components: "buttons",
                                        currency: "USD",
                                        "disable-funding": "credit,card,p24",
                                    }}
                                >
                                    <ButtonWrapper
                                        currency={currency}
                                        showSpinner={false}
                                    />
                                </PayPalScriptProvider>
                                <button
                                    className="razor_pay"
                                    onClick={displayRazorpay}
                                >
                                    RazorPay
                                </button>
                            </div>
                        ) : user === undefined ? (
                            <Link to="/auth">
                                <button className="login">
                                    Sign in to continue
                                </button>
                            </Link>
                        ) : (
                            <button
                                onClick={() => setOpen(true)}
                                className="button_c"
                            >
                                CHECKOUT NOW!
                            </button>
                        )}
                    </div>
                </div>

                {cash &&
                    createOrder({
                        customer: "Willam Jones",
                        address: "33 Cali, HK - 64",
                        total: 500,
                        method: 2,
                    })}
            </div>
        </>
    );
};

export default Cart;
