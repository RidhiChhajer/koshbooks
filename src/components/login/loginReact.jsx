import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./login.css";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import API from "../../api/api";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [signup, setSignup] = useState(false);
    const history = useHistory();

    const googleSuccess = async (res) => {
        try {
            const profile = res.profileObj;
            const mail = profile.email;
            const username = profile.givenName + profile.googleId.slice(10);
            await axios.post(
                API + "signup",
                {
                    mail,
                    username,
                    password: profile.googleId.slice(10),
                    phone: profile.googleId.slice(10),
                },
                {
                    withCredentials: true,
                }
            );
            await axios.post(
                API + "login",
                {
                    mail,
                    password: profile.googleId.slice(10),
                },
                {
                    withCredentials: true,
                }
            );
            history.push("/explore");
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        history.push("/auth");
        console.log("Google Sign In was unsuccessful. Try Again Later!");
    };

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId:
                    "1013981971634-1uvgnopo31ivjta68fmsur708kj06iik.apps.googleusercontent.com",
                scope: "profile email",
            });
        }

        gapi.load("client:auth2", start);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const mail = event.target[1].value;
        const password = event.target[2].value;
        const data = await axios.post(
            API + "login",
            {
                mail,
                password,
            },
            {
                withCredentials: true,
            }
        );
        console.log(data);
        if (data.data.user != null) {
            history.push("/explore");
        } else {
            history.push("/auth");
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        const username = event.target[0].value;
        const mail = event.target[1].value;
        const phone = event.target[2].value;
        const birthdate = event.target[3].value;
        const password = event.target[4].value;
        const data = await axios.post(
            API + "signup",
            {
                username,
                mail,
                password,
                phone,
                birthdate,
            },
            {
                withCredentials: true,
            }
        );
        if (data.data.user != null) {
            history.push("/explore");
        } else {
            history.push("/auth");
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
            <div class="background-login">
                <h2 class="quote">
                    Good Books don't give up all their secrets at once.
                </h2>
                <div class={`container ${signup ? "right-panel-active" : ""}`}>
                    <div class="form-container sign-up-container">
                        <form onSubmit={handleSignup}>
                            <h1>Create Account</h1>
                            <span>or use your email for registration</span>
                            <div className="put">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                />
                                <span class="border"></span>
                            </div>
                            <div className="put">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                />
                                <span class="border"></span>
                            </div>
                            <div className="put">
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    required
                                />
                                <span class="border"></span>
                            </div>
                            <div className="put">
                                <input type="date" required />
                                <span class="border"></span>
                            </div>

                            <div className="put">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                />
                                <span class="border"></span>
                            </div>
                            <button class="btn1">Sign Up</button>
                        </form>
                    </div>
                    <div class="form-container sign-in-container">
                        <form onSubmit={handleSubmit}>
                            <h1>Sign in</h1>
                            <GoogleLogin
                                clientId="1013981971634-1uvgnopo31ivjta68fmsur708kj06iik.apps.googleusercontent.com"
                                scope="email"
                                render={(renderProps) => (
                                    <button
                                        className="social-container"
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                    >
                                        <i class="fa-brands fa-google"></i>
                                    </button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                            />
                            <span>or use your account</span>
                            <div className="put">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    name="email"
                                    className="input"
                                />
                                <span class="border"></span>
                            </div>
                            <div className="put">
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    className="input"
                                />
                                <span class="border"></span>
                            </div>
                            <div>Forgot your password?</div>
                            <button class="btn1">Sign In</button>
                        </form>
                    </div>
                    <div class="overlay-container">
                        <div class="overlay">
                            <div class="overlay-panel overlay-left">
                                <Link to="/">
                                    <img
                                        class="logo1"
                                        src="https://raw.githubusercontent.com/RidhiChhajer/koshbooks-website/main/koshbooks-website/assets/logo-removebg-preview.png"
                                        alt=""
                                    />
                                </Link>
                                <h1>Welcome Back!</h1>
                                <p>
                                    To keep connected with us please login with
                                    your personal info
                                </p>
                                <button
                                    class="ghost btn1"
                                    id="signIn"
                                    onClick={() => {
                                        setSignup(!signup);
                                    }}
                                >
                                    Sign In
                                </button>
                            </div>
                            <div class="overlay-panel overlay-right">
                                <Link to="/">
                                    <img
                                        class="logo1"
                                        src="https://raw.githubusercontent.com/RidhiChhajer/koshbooks-website/main/koshbooks-website/assets/logo-removebg-preview.png"
                                        alt=""
                                    />
                                </Link>
                                <h1>Hello, Friend!</h1>
                                <p>
                                    Enter your personal details and start
                                    journey with us
                                </p>
                                <button
                                    class="ghost btn1"
                                    id="signUp"
                                    onClick={() => {
                                        setSignup(!signup);
                                    }}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
