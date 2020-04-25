import React, { useState, useEffect } from 'react';
import { NavHeader, Container } from './style';
import DoLogin from '../../components/Layout/DoLogin';
import {
    FaPowerOff,
    FaFolderPlus,
    FaPlusCircle,
    FaPencilAlt,
} from 'react-icons/fa';
import { useHistory, Link } from 'react-router-dom';
import Footer from '../../components/footer';
import Chartjs from '../../components/chartjs';
import api from '../../api';

function DashboardArtists(props) {
    const history = useHistory();
    const [countLikesArtist, setCountLikesArtist] = useState(0);

    async function getDataByAPI() {
        const counts = await api.get('/users/artist', {
            headers: {
                authorization: localStorage.getItem('TokenArtist'),
            },
        });

        console.log(counts);
    }

    useEffect(() => {}, []);

    console.log(props);

    function Logoff() {
        localStorage.setItem('ArtistToken', '');
        history.push('/');
    }

    function Layout() {
        if (!props.artistID) {
            return <DoLogin />;
        }

        return (
            <>
                <NavHeader>
                    <span className="content">
                        <Link className="link">
                            <figure>
                                <img
                                    src={`http://localhost:3333/img/${props.avatar}`}
                                    alt="avatar artist"
                                />
                                <figcaption>
                                    Welcome, {props.name_artistic}
                                </figcaption>
                            </figure>
                        </Link>
                        <span>
                            <button onClick={Logoff} className="logoff">
                                <FaPowerOff />
                            </button>
                        </span>
                    </span>
                </NavHeader>
                <Container>
                    <div className="a">
                        <h1>Relavancia: </h1>
                        <span>
                            <section>
                                <Chartjs />
                            </section>
                            <section>
                                <Chartjs />
                            </section>
                            <section>
                                <Chartjs />
                            </section>
                            <section>
                                <Chartjs />
                            </section>
                        </span>
                    </div>
                    <div className="inserts">
                        <section>
                            <FaFolderPlus /> New Album
                        </section>

                        <section>
                            <FaPencilAlt /> Edit album
                        </section>

                        <section>
                            <FaFolderPlus /> New Music
                        </section>

                        <section>
                            <FaPencilAlt /> Edit musis
                        </section>

                        <section>
                            <FaFolderPlus /> Insertion music in album
                        </section>
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    return Layout();
}

export default DashboardArtists;