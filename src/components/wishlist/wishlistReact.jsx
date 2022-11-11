import React, { useEffect, useState } from "react";
import "../explore/explore.css";
import { Helmet } from "react-helmet";
import axios from "axios";
import API from "../../api/api";
import Book from "../explore/Book";
import Navbar from "../Navbar";

const WishlistReact = () => {
    const [books, setBooks] = useState();
    const fetchBooks = async () => {
        const { data } = await axios.get(API + "wish", {
            withCredentials: true,
        });
        setBooks(data.wishlist);
    };

    useEffect(() => {
        fetchBooks();
    }, []);
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
            <div class="featured-products-wl">
                {books != null && books.length > 0 ? (
                    books.map((book, index) => (
                        <Book book={book} key={index} isWR={true} />
                    ))
                ) : (
                    <h1>No Book</h1>
                )}
            </div>
        </>
    );
};

export default WishlistReact;
