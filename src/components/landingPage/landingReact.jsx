import { Helmet } from "react-helmet";
import "./lp.css";
import Logo from "../../assets/logo-removebg-preview.png";
import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../api/api";
import { Link } from "react-router-dom";

const Landing = () => {
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

    return (
        <>
            <Helmet>
                <meta charset="utf-8" />
                <title>KoshBooks</title>
                <script
                    src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
                    integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
                    crossorigin="anonymous"
                ></script>
                <script
                    src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js"
                    integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz"
                    crossorigin="anonymous"
                ></script>

                <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;1,300;1,400&family=Quicksand:wght@300;400;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
                />
            </Helmet>{" "}
            <header>
                <img src={Logo} id="header-img" alt="Soygo Logo" />
                {user === undefined ? (
                    <Link class="btn" to="/auth">
                        Sign Up
                    </Link>
                ) : (
                    <Link class="btn" to="/explore">
                        Buy a Book
                    </Link>
                )}
            </header>
            <main>
                <section id="home">
                    <div class="overlayy"></div>
                    <div class="header-message">
                        <h2>
                            Let's Read and Escape Together. <br /> Connect by
                            Disconnecting
                        </h2>
                        <p>
                            Start your day with a book, grab a cup and
                            experience the changing world around you.
                        </p>
                        <div>
                            <Link to="/explore">Explore</Link>
                        </div>
                    </div>
                </section>
                <section id="services">
                    <div class="header-message">
                        <h2>Why choose us?</h2>
                        <p>Our services.</p>
                    </div>
                    <div class="services">
                        <div class="service">
                            <img
                                class="service-images service-icon"
                                src="https://png.pngtree.com/png-clipart/20210225/ourlarge/pngtree-brown-ordinary-open-door-clipart-png-image_2953255.jpg"
                                alt="Eco-friendly"
                            />
                            <div class="service-message">
                                <h3>Second hand and new book available!</h3>
                                <p>
                                    Buy second hand books and get great deals.
                                    Be a part of change with us. Get the fresh
                                    and second-hand copies all at one place.
                                </p>
                            </div>
                        </div>
                        <div class="service">
                            <img
                                class="services-images"
                                src="https://media.istockphoto.com/vectors/books-swap-exchange-or-crossing-vector-illustration-with-hand-gives-vector-id1328717786?k=20&m=1328717786&s=612x612&w=0&h=g_MFweJ45fWDd3m9dk2kNO9yqZ6ERKiOUk66rDhBOAk="
                                alt="experience something new"
                            />
                            <div class="service-message">
                                <h3>Exchange/ Book Swap!</h3>
                                <p>
                                    {" "}
                                    Share what you have without risking any
                                    information. Exchang your books for a period
                                    or swap them with the people in need and let
                                    us deliver and do all the work.
                                </p>
                            </div>
                        </div>
                        <div class="service">
                            <img
                                class="services-images service-icon"
                                src="https://raw.githubusercontent.com/Ming-desu/fcc-landing-page/7cb6177f2965ecc78fca9926d7dceb34c0b03dfc/img/undraw_environment_iaus.svg"
                                alt="Eco-friendly"
                            />
                            <div class="service-message">
                                <h3>Love nature, love mother earth!</h3>
                                <p>
                                    We are actively participating some clean and
                                    green projects that aims to make the
                                    pollution in the planet Earth lessen. All of
                                    the items being used in our place is 100%
                                    from recycled materials.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="how">
                    <h2>Watch some random video!</h2>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/Nwd5a3-tVYA"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                    ></iframe>
                </section>
                <section id="contact">
                    <div class="contact-us">
                        <h2>We are right here.</h2>
                        <p>How can we assist you.</p>
                    </div>
                    <form action="/" id="form" method="get">
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="E.g. example@domain.com"
                            />
                        </div>
                        <div class="form-group">
                            <label for="message">Personal Message</label>
                            <textarea
                                name="message"
                                id="message"
                                cols="30"
                                rows="10"
                                placeholder="What do you want to tell us?"
                            ></textarea>
                        </div>
                        <div class="right">
                            <input type="submit" id="submit" value="Send" />
                        </div>
                    </form>
                </section>
            </main>
        </>
    );
};

export default Landing;
