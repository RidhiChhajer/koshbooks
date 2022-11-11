import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import API from "../../api/api";

const Book = ({ book, index, isFavorite, isWR }) => {
    const history = useHistory();
    const handleClick = async () => {
        await axios.post(
            API + `wish/${book._id}`,
            { mesage: true },
            {
                withCredentials: true,
            }
        );
    };

    const handleDelete = async () => {
        await axios.delete(API + `wish/${book._id}`, {
            withCredentials: true,
        });
    };

    return (
        <div class="product-wrap">
            <div class="product-img">
                <img src={book.image} alt="" />
            </div>
            <div class="product-icons">
                <div
                    class="add-to-favorite"
                    onClick={() => {
                        if (!isWR) {
                            handleClick();
                        } else {
                            handleDelete();
                        }
                        window.location.reload();
                    }}
                >
                    <span class="icon-heart">
                        {!isWR ? (
                            <i
                                class={`fa  ${
                                    isFavorite ? "fa-heart wish" : "fa-heart-o"
                                }`}
                            ></i>
                        ) : (
                            <i class="fa-solid fa-trash"></i>
                        )}
                    </span>
                </div>
                <p>
                    <span class="discount">{book.offer}</span>% off
                </p>
            </div>
            <button
                class="product-description"
                onClick={() => history.push(`/books/${book._id}`)}
            >
                <div class="product-name">{book.name}</div>
                <div class="money">
                    <del>
                        <span>₹ {book.price}</span>
                    </del>
                    <ins>
                        <span>₹ {book.f_price}</span>
                    </ins>
                </div>
            </button>
        </div>
    );
};

export default Book;
