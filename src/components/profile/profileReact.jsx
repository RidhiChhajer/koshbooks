import React, { useEffect, useState } from "react";
import "./profile.css";
import { Helmet } from "react-helmet";
import Navbar from "../Navbar";
import axios from "axios";
import API from "../../api/api";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";

const ProfileReact = () => {
    const [user, setUser] = useState();
    const history = useHistory();

    const Logout = () => {
        Cookies.remove("user_sid");
        history.push("/");
    };

    const fetchUser = async () => {
        const { data } = await axios.get(API + `user`, {
            withCredentials: true,
        });
        setUser(data);
    };

    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <div className="profile_back_pp">
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
            <div class="container_pp">
                <div className="leftbox_pp">
                    <img
                        src="https://irs01.wisgoon.com/irs01/8b/ee/21/fc/irs01_s3old_1574520821651743.jpg"
                        alt="profile"
                    />
                </div>
                {user != null ? (
                    <div class="rightbox_pp">
                        <h1 class="h1_pp">Personal Info</h1>
                        <h2 class="h2_pp">Full Name</h2>
                        <div class="p_pp">{user.username}</div>
                        <h2 class="h2_pp">Birthday</h2>
                        <div class="p_pp">
                            {user.birthdate != null
                                ? user.birthdate
                                : "Not Specified"}
                        </div>
                        <h2 class="h2_pp">Email</h2>
                        <div class="p_pp">{user.mail}</div>
                        <h2 class="h2_pp">Phone</h2>
                        <div class="p_pp">
                            {user.phone != null ? user.phone : "Not Specified"}
                        </div>
                        <button className="logout" onClick={() => Logout()}>
                            Log out
                        </button>
                    </div>
                ) : (
                    <h1>No Profile</h1>
                )}
            </div>
        </div>
    );
};

export default ProfileReact;
