import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';

const CardItem = ({ icon, Img, title, number }) => {
  return (
    <Card
      text=''
      className='mb-2 mt-3 me-3 ms-3 pt-3 pb-3 fw-bolder '
      style={{
        backgroundColor: '#fff',
        transition: 'box-shadow 0.25s',
        boxShadow:
          '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
        borderRadius: '5px',
        width: '15rem',
      }}
    >
      <Row>
        <Col>
          <Card.Title className='ms-3 fw-bolder ' style={{ fontSize: '30px' }}>
            {number}
          </Card.Title>
        </Col>
        <Col className='me-4'>
          <i className={icon}></i>
          <Image style={{ width: '100%' }} src={Img}></Image>
        </Col>
      </Row>

      <Card.Text
        className='text-center mt-2 fw-bolder  '
        style={{ fontSize: '18px' }}
      >
        <Col>{title}</Col>
      </Card.Text>
    </Card>
  );
};

export default CardItem;
