import React from "react";
import { Helmet } from "react-helmet";
import "./ccu.css";
import { useHistory } from "react-router-dom";

const CcuReact = () => {
    const history = useHistory();
    return (
        <>
            <Helmet>
                <title>Feedback</title>
            </Helmet>
            <div class="content_ccu">
                <div class="wrapper-1_ccu">
                    <div class="wrapper-2_ccu">
                        <h1 class="h1_ccu">Thank you !</h1>
                        <p class="h2_ccu">Enjoy Reading !!</p>
                        <p class="p_ccu">Get back to us for more books.</p>
                        <div onClick={() => history.push("/")}>
                            <button class="go-home_ccu">Go Home</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CcuReact;
