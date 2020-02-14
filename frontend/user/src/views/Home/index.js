import React, { useEffect, useState } from 'react';
import authToken from '../../utils/authToken';
import Navbar from '../../components/navbar';
import { Container } from './styled';
import { FaThumbsUp, FaHeadphones } from 'react-icons/fa';
import imgTest from '../../assets/img/login-theme2.jpg';
import Footer from '../../components/footer';

function Home() {
    const [info, setInfo] = useState('');

    useEffect(() => {
        async function getDataByAPI() {
            const data = await authToken('/musics');
            setInfo(data.data);
            console.log(data.data);
        }

        getDataByAPI();
    }, []);

    function LayoutLogged() {
        return (
            <>
                <Navbar />
                <Container>
                    <h1>New musics: </h1>
                    <ul>
                        {info.map(item => (
                            <li key={item.id}>
                                <img src={imgTest} alt="banner of music" />
                                <p>{item.name}</p>
                                <p>{item.genre}</p>

                                <span>
                                    <button className="listen" type="button">
                                        <FaHeadphones /> Listen
                                    </button>
                                    <button className="like" type="button">
                                        <FaThumbsUp />
                                    </button>
                                </span>
                            </li>
                        ))}
                    </ul>
                </Container>
                <Footer />
            </>
        );
    }

    function LayoutNotLogged() {
        return <h1>No</h1>;
    }

    return <>{info ? LayoutLogged() : LayoutNotLogged()}</>;
}

export default Home;
