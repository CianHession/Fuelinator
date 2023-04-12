import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { auth } from './Firebase';

function About() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleBackButtonClick = () => {
        if (isAuthenticated) {
            navigate('/fuelinator');
        } else {
            navigate('/');
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h2>About Fuelinator</h2>
                    <p>
                        Fuelinator is a fuel tracking app that helps you find fuel stations for every county in Ireland, viewing user submitted fuel prices, allowing you to find prices before arriving!
                    </p>
                    <p>
                        Fuelinator is free and open-sourced software, it's built using the latest web technologies, including React, Node.js,Firebase and MongoDB.
                    </p>
                    <p>
                        I created Fuelinator for my Final Year Software Development project, with the aim of one day updating it to a higher standard, offering more functionality.
                    </p>
                    <Button variant="primary" onClick={handleBackButtonClick}>
                        Back to Fuelinator
                    </Button>
                    <Button variant="secondary" href="https://github.com/CianHession" target="_blank">
                        My GitHub
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

function AboutPage() {
    return (
        <About />
    );
}

export default AboutPage;