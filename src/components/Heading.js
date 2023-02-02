import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Heading = ({ title, text }) => {
  return (
    <header id='page-header'>
      <Container>
        <Row>
          <Col md={8} className='m-auto text-center'>
            <h1>{title}</h1>
            <p>{text}</p>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Heading;
