import React, { useEffect, useState } from "react";
import "./bd.css";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar";
import { useParams, useHistory } from "react-router-dom";
import API from "../../api/api";
import axios from "axios";
// import Cookies from "js-cookie";
import { CartState } from "../../context";

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState();
    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0);
    const history = useHistory();
    const { cart, setCart } = CartState();

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

    const addQuantity = () => {
        if (quantity < 10) setQuantity(quantity + 1);
    };

    const subQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const fetchBook = async () => {
        const { data } = await axios.get(API + `book/${id}`, {
            withCredentials: true,
        });
        setBook(data);
        setPrice(data.price);
    };

    useEffect(() => {
        fetchBook();
    }, []);

    const handleClick = () => {
        setProduct(...book, quantity);
        setCart((prev) => ({
            products: [...prev.products, product],
            quantity: prev.quantity + quantity,
            total: prev.total + price,
        }));
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
                <link
                    href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800&display=swap"
                    rel="stylesheet"
                />
            </Helmet>
            <div className="background_back">
                <Navbar />
                <div class="prod_details">
                    <div class="heading-section">
                        <h2>Product Details</h2>
                    </div>
                    {book != null ? (
                        <>
                            <div class="row">
                                <div class="content_bd">
                                    <div class="item1_bd">
                                        <img src={book.image} alt={book.name} />
                                    </div>
                                    <div class="item2_bd">
                                        <div class="product-dtl">
                                            <div class="product-info">
                                                <div class="product-name">
                                                    {book.name}
                                                </div>
                                                <div class="reviews-counter">
                                                    <div class="rate">
                                                        <input
                                                            type="radio"
                                                            id="star5"
                                                            name="rate"
                                                            value="5"
                                                            checked
                                                        />
                                                        <label
                                                            for="star5"
                                                            title="text"
                                                        >
                                                            5 stars
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            id="star4"
                                                            name="rate"
                                                            value="4"
                                                            checked
                                                        />
                                                        <label
                                                            for="star4"
                                                            title="text"
                                                        >
                                                            4 stars
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            id="star3"
                                                            name="rate"
                                                            value="3"
                                                            checked
                                                        />
                                                        <label
                                                            for="star3"
                                                            title="text"
                                                        >
                                                            3 stars
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            id="star2"
                                                            name="rate"
                                                            value="2"
                                                        />
                                                        <label
                                                            for="star2"
                                                            title="text"
                                                        >
                                                            2 stars
                                                        </label>
                                                        <input
                                                            type="radio"
                                                            id="star1"
                                                            name="rate"
                                                            value="1"
                                                        />
                                                        <label
                                                            for="star1"
                                                            title="text"
                                                        >
                                                            1 star
                                                        </label>
                                                    </div>
                                                    <span>3 Reviews</span>
                                                </div>
                                                <div class="product-price-discount">
                                                    <span>
                                                        Rs {book.f_price}.00
                                                    </span>
                                                    <span class="line-through">
                                                        Rs {book.price}.00
                                                    </span>
                                                </div>
                                                <p>
                                                    Combining magic, mysticism,
                                                    wisdom and wonder into an
                                                    inspiring tale of
                                                    self-discovery, The
                                                    Alchemist has become a
                                                    modern classic, selling
                                                    millions of copies around
                                                    the world and transforming
                                                    the lives of countless
                                                    readers across generations.
                                                </p>
                                            </div>
                                            <div class="product-count">
                                                <label for="size">
                                                    Quantity
                                                </label>
                                                <div
                                                    action="#"
                                                    class="display-flex"
                                                >
                                                    <div
                                                        class="qtyminus"
                                                        onClick={() =>
                                                            subQuantity()
                                                        }
                                                    >
                                                        -
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="quantity"
                                                        value={quantity}
                                                        class="qty"
                                                    />
                                                    <div
                                                        class="qtyplus"
                                                        onClick={() =>
                                                            addQuantity()
                                                        }
                                                    >
                                                        +
                                                    </div>
                                                </div>
                                                <div
                                                    class="round-black-btn pointer"
                                                    onClick={() => {
                                                        if (
                                                            user.username !==
                                                            undefined
                                                        ) {
                                                            handleClick();
                                                        } else {
                                                            history.push(
                                                                "/auth"
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Add to Cart
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="descrip">
                                <div className="descrip_head">Description</div>
                                <div class="descrip_content">
                                    Paulo Coelho's masterpiece tells the
                                    mystical story of Santiago, an Andalusian
                                    shepherd boy who yearns to travel in search
                                    of a worldly treasure. His quest will lead
                                    him to riches far different—and far more
                                    satisfying—than he ever imagined. Santiago's
                                    journey teaches us about the essential
                                    wisdom of listening to our hearts, of
                                    recognizing opportunity and learning to read
                                    the omens strewn along life's path, and,
                                    most importantly, to follow our dreams.
                                </div>
                            </div>
                            <div className="review_bdd">
                                <div className="review_bd">
                                    <div class="review-heading">REVIEWS</div>
                                    <p class="review_bd_content">
                                        There are no reviews yet.
                                    </p>
                                </div>
                                <form class="review-form">
                                    <div class="form-group">
                                        <label>Your rating</label>
                                        <div class="reviews-counter">
                                            <div class="rate">
                                                <input
                                                    type="radio"
                                                    id="star5"
                                                    name="rate"
                                                    value="5"
                                                />
                                                <label for="star5" title="text">
                                                    5 stars
                                                </label>
                                                <input
                                                    type="radio"
                                                    id="star4"
                                                    name="rate"
                                                    value="4"
                                                />
                                                <label for="star4" title="text">
                                                    4 stars
                                                </label>
                                                <input
                                                    type="radio"
                                                    id="star3"
                                                    name="rate"
                                                    value="3"
                                                />
                                                <label for="star3" title="text">
                                                    3 stars
                                                </label>
                                                <input
                                                    type="radio"
                                                    id="star2"
                                                    name="rate"
                                                    value="2"
                                                />
                                                <label for="star2" title="text">
                                                    2 stars
                                                </label>
                                                <input
                                                    type="radio"
                                                    id="star1"
                                                    name="rate"
                                                    value="1"
                                                />
                                                <label for="star1" title="text">
                                                    1 star
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>Your message</label>
                                        <textarea
                                            class="form-control"
                                            rows="10"
                                        ></textarea>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input
                                                    type="text"
                                                    name=""
                                                    class="form-control"
                                                    placeholder="Name*"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <input
                                                    type="text"
                                                    name=""
                                                    class="form-control"
                                                    placeholder="Email Id*"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button class="round-black-btn">
                                        Submit Review
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 class="no_record">Book not found</h1>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default BookDetails;
