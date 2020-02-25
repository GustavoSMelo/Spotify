import React, { useEffect, useState } from 'react';
import authToken from '../../utils/authToken';
import Navbar from '../../components/navbar';
import { Container, ContainerNotLogged } from './styled';
import { FaThumbsUp, FaHeadphones } from 'react-icons/fa';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';
import Player from '../../components/player';

function Home() {
    const [info, setInfo] = useState('');
    const [haveMusic, setHaveMusic] = useState(false);
    const [MusicName, setMusicName] = useState('');
    useEffect(() => {
        async function getDataByAPI() {
            const data = await authToken('/musics');

            if (!data) {
                return setInfo(null);
            }
            return setInfo(data.data);
        }

        getDataByAPI();
    }, []);

    async function ListenMusic(musicpath) {
        await setHaveMusic(false);
        await setMusicName(musicpath);
        return await setHaveMusic(true);
    }

    function LayoutLogged() {
        return (
            <>
                <Navbar />
                <Container>
                    <h1>New musics: </h1>
                    <ul>
                        {info ? (
                            info.map(item => (
                                <li key={item.id}>
                                    <img
                                        src={`http://localhost:3333/img/${item.banner_path}`}
                                        alt="banner of music"
                                    />
                                    <p>{item.name}</p>
                                    <p>{item.genre}</p>

                                    <span>
                                        <button
                                            className="listen"
                                            type="button"
                                            onClick={() =>
                                                ListenMusic(item.path)
                                            } //Error = ListenMusic(item.path) //Success = () => ListenMusic(item.path)
                                        >
                                            <FaHeadphones /> Listen
                                        </button>
                                        <button className="like" type="button">
                                            <FaThumbsUp />
                                        </button>
                                    </span>
                                </li>
                            ))
                        ) : (
                            <h1>
                                Doesn't have any music registred in database{' '}
                            </h1>
                        )}
                    </ul>
                </Container>
                {haveMusic ? <Player musicpath={MusicName} /> : <></>}
                <Footer />
            </>
        );
    }

    function LayoutNotLogged() {
        return (
            <ContainerNotLogged>
                <h1>To continue, please make login</h1>
                <Link className="btnLogin" to="/login/user">
                    Login
                </Link>
            </ContainerNotLogged>
        );
    }

    return <>{info ? LayoutLogged() : LayoutNotLogged()}</>;
}

export default Home;
