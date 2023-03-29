import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';

function About() {
    return (
        <Container>
            <Row>
                <Col>
                    <h2>About Fuelinator</h2>
                    <p>
                        Fuelinator is a fuel tracking app that helps you find fuel stations for every county in Ireland, and view user submitted fuel prices, allowing you to find prices before ariving!
                    </p>
                    <p>
                        Fuelinator is free and open-source software, and it's built using the latest web technologies, including React, Node.js, and MongoDB.
                    </p>
                    <p>
                        I created Fuelinator for my Final Year Software Development project, with aims to maybe one day update it to a higher standard.
                    </p>
                    <Button as={Link} to="/" variant="primary">Back to Fuelinator</Button>
                    <Button variant="secondary" href="https://github.com/CianHession" target="_blank">My GitHub</Button>

                </Col>
            </Row>
        </Container>
    );
}

function AboutPage() {
    return (
        <Routes>
            <Route path="/" element={<About />} />
        </Routes>
    );
}

export default AboutPage;