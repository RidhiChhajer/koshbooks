import { Helmet } from "react-helmet";
import "./explore.css";
import Navbar from "../Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import API from "../../api/api";
import Book from "./Book";

const Explore = () => {
    const [books, setBooks] = useState();
    const [wishlist, setWishlist] = useState();
    const [loadBooks, setLoadBooks] = useState(false);

    const fetchBooks = async () => {
        setLoadBooks(true);
        const { data } = await axios.get(API + "book");
        setBooks(data);
        setLoadBooks(false);
    };

    const fetchWishlist = async () => {
        const { data } = await axios.get(API + "wish", {
            withCredentials: true,
        });
        setWishlist(data.wishlist);
    };

    useEffect(() => {
        fetchBooks();
        fetchWishlist();
    }, []);

    const [q, setQ] = useState("");
    const [searchParam] = useState(["name", "author"]);

    const search = (items) => {
        return items.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(q.toLowerCase()) > -1
                );
            });
        });
    };

    return (
        <>
            <Helmet>
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT"
                    crossorigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <script
                    src="https://kit.fontawesome.com/de33fbad5c.js"
                    crossorigin="anonymous"
                ></script>
                <title>Products</title>
            </Helmet>
            <Navbar />
            <body>
                <div id="pricing">
                    <div class="topp">
                        <h1>
                            <strong>BOOKS</strong>
                        </h1>
                        <div class="search-box">
                            <div class="search-icon">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="featured-products">
                        {books != null ? (
                            search(books).map((book, index) => {
                                if (
                                    wishlist &&
                                    wishlist.findIndex(
                                        (item) => item._id === book._id
                                    ) > -1
                                ) {
                                    return (
                                        <Book
                                            book={book}
                                            key={index}
                                            isFavorite={true}
                                        />
                                    );
                                } else {
                                    return (
                                        <Book
                                            book={book}
                                            key={index}
                                            isFavorite={false}
                                        />
                                    );
                                }
                            })
                        ) : (
                            <h1>Books not found</h1>
                        )}
                    </div>
                </div>
            </body>
        </>
    );
};

export default Explore;
