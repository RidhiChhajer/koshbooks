import React from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import { CartState } from "../context";
import Logo from "../assets/logo-removebg-preview.png";

const Navbar = () => {
    const { cart } = CartState();
    return (
        <div id="header">
            <div class="navigation">
                <Link to="/">
                    <img
                        src={Logo}
                        id="header-img"
                        alt="KoshBooks Logo"
                        width="80"
                        height="60"
                    />
                </Link>

                <div class="navigate">
                    <Link to="/explore" className="ll">
                        <div className="navi">
                            <i class="fa-solid fa-bars"></i>
                            <div>Menu</div>
                        </div>
                    </Link>
                    <Link to="/wishlist" className="ll">
                        <div className="navi">
                            <i class="fa-solid fa-heart"></i>
                            <div>Wishlist</div>
                        </div>
                    </Link>
                    <Link to="/profile" className="ll">
                        <div className="navi">
                            <i class="fa-solid fa-user"></i>
                            <div>Profile</div>
                        </div>
                    </Link>
                    <Link to="/cart" className="ll">
                        <div className="navi">
                            <i class="fa-solid fa-cart-shopping"></i>
                            <div>Cart</div>
                            <div className="cart_quantity">{cart.quantity}</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
