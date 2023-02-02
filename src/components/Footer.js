import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer id='main-footer' className='text-center p-4 mt-3 '>
      <Container>
        <Row>
          <Col>
            <h6>
              copyright © 2022 AUTO ECOLE TAJ EL IDRISSI. Tous les droits sont
              réservés.
              <span id='year'></span>
            </h6>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
