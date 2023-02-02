import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import CardItem from '../components/CardItem';
import Heading from '../components/Heading';
import { listUsers } from '../actions/userActions';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { allNewsList } from '../actions/newsActions';

const DashboardScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { users, loading: loadingUsers, error: errorUsers } = userList;

  const newsList = useSelector((state) => state.newsList);
  const { allNews } = newsList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      dispatch(allNewsList());
    } else {
      navigate('/');
    }
  }, [userInfo, dispatch, navigate]);

  const permisA = users && users.filter((user) => user.permis === 'A');
  const permisB = users && users.filter((user) => user.permis === 'B');
  const permisC = users && users.filter((user) => user.permis === 'C');
  const permisDE = users && users.filter((user) => user.permis === 'DE');

  return (
    <>
      <div id='root'>
        <div className='app'>
          <main className='my-3'>
            <Heading title={`Auto Ecole Taj El Idrissi`} />
            <div className='pt-3'>
              <>
                {loadingUsers ? (
                  <Spinner size={100} />
                ) : errorUsers ? (
                  <Message variant='danger'>{errorUsers}</Message>
                ) : (
                  <Container
                    className='mb-4 mt-4 pt-3  pb-3 '
                    style={{
                      backgroundColor: '#f4f6f8',
                      transition: 'box-shadow 0.25s',
                      boxShadow:
                        '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
                    }}
                  >
                    <Container>
                      <h2 className='text-center mt-3 mb-3'>
                        Situation des donnees de l'application{' '}
                      </h2>
                      <>
                        <Row className='justify-content-center'>
                          <Col
                            md={2}
                            lg={2}
                            sm={12}
                            style={{ marginRight: '35px' }}
                          >
                            <Link to='/admin/utilisateurs'>
                              <CardItem
                                style={{ backgroundColor: '#ffff' }}
                                Img='/assets/utilisateurs.png'
                                title='Total'
                                number={
                                  <CountUp
                                    end={users && users.length}
                                    durantion={20}
                                    delay={0.25}
                                  />
                                }
                              />
                            </Link>
                          </Col>
                          <Col
                            md={2}
                            lg={2}
                            sm={12}
                            style={{ marginRight: '35px' }}
                          >
                            <Link to='/admin/news'>
                              <CardItem
                                style={{ backgroundColor: '#ffff' }}
                                Img='/assets/post.png'
                                title='News'
                                number={
                                  <CountUp
                                    end={allNews && allNews.length}
                                    durantion={20}
                                    delay={0.25}
                                  />
                                }
                              />
                            </Link>
                          </Col>
                          <Col
                            md={2}
                            lg={2}
                            sm={12}
                            style={{ marginRight: '35px' }}
                          >
                            <Link to='/admin/questions'>
                              <CardItem
                                style={{ backgroundColor: '#ffff' }}
                                Img='/assets/questions.png'
                                title='Q&A'
                                number={
                                  <CountUp
                                    end={permisB && permisB.length}
                                    durantion={20}
                                    delay={0.25}
                                  />
                                }
                              />
                            </Link>
                          </Col>{' '}
                          <Col
                            md={2}
                            lg={2}
                            sm={12}
                            style={{ marginRight: '35px' }}
                          >
                            <Link to='/admin/activites'>
                              <CardItem
                                style={{ backgroundColor: '#ffff' }}
                                Img='/assets/activity.png'
                                title='Activites'
                                number={
                                  <CountUp
                                    end={permisC && permisC.length}
                                    durantion={20}
                                    delay={0.25}
                                  />
                                }
                              />
                            </Link>
                          </Col>{' '}
                          <Col
                            md={2}
                            lg={2}
                            sm={12}
                            style={{ marginRight: '35px' }}
                          >
                            <Link to='/admin/activites'>
                              <CardItem
                                style={{ backgroundColor: '#ffff' }}
                                Img='/assets/services.png'
                                title='Services'
                                number={
                                  <CountUp
                                    end={permisC && permisC.length}
                                    durantion={20}
                                    delay={0.25}
                                  />
                                }
                              />
                            </Link>
                          </Col>
                        </Row>
                        <Row className='justify-content-md-center'>
                          <Col
                            md={2}
                            lg={2}
                            sm={12}
                            style={{ marginRight: '35px' }}
                          >
                            <Link to='/admin/utilisateurs'>
                              <CardItem
                                style={{ backgroundColor: '#ffff' }}
                                Img='/assets/permisA.png'
                                title='Permis A'
                                number={
                                  <CountUp
                                    end={permisA && permisA.length}
                                    durantion={20}
                                    delay={0.25}
                                  />
                                }
                              />
                            </Link>
                          </Col>
                          <Col
                            md={2}
                            lg={2}
                            sm={12}
                            style={{ marginRight: '35px' }}
                          >
                            <Link to='/admin/utilisateurs'>
                              <CardItem
                                style={{ backgroundColor: '#ffff' }}
                                Img='/assets/permisB.png'
                                title='Permis B'
                                number={
                                  <CountUp
                                    end={permisB && permisB.length}
                                    durantion={20}
                                    delay={0.25}
                                  />
                                }
                              />
                            </Link>
                          </Col>
                          <Col
                            md={2}
                            lg={2}
                            sm={12}
                            style={{ marginRight: '35px' }}
                          >
                            <Link to='/admin/utilisateurs'>
                              <CardItem
                                style={{ backgroundColor: '#ffff' }}
                                Img='/assets/permisC.png'
                                title='Permis C'
                                number={
                                  <CountUp
                                    end={permisC && permisC.length}
                                    durantion={20}
                                    delay={0.25}
                                  />
                                }
                              />
                            </Link>
                          </Col>
                          <Col
                            md={2}
                            lg={2}
                            sm={12}
                            style={{ marginRight: '35px' }}
                          >
                            <Link to='/admin/utilisateurs'>
                              <CardItem
                                style={{ backgroundColor: '#ffff' }}
                                Img='/assets/permisD.png'
                                title='Permis D'
                                number={
                                  <CountUp
                                    end={permisDE && permisDE.length}
                                    durantion={20}
                                    delay={0.25}
                                  />
                                }
                              />
                            </Link>
                          </Col>{' '}
                          <Col
                            md={2}
                            lg={2}
                            sm={12}
                            style={{ marginRight: '35px' }}
                          >
                            <Link to='/admin/utilisateurs'>
                              <CardItem
                                style={{ backgroundColor: '#ffff' }}
                                Img='/assets/permisCE.png'
                                title='Permis CE'
                                number={
                                  <CountUp
                                    end={permisDE && permisDE.length}
                                    durantion={20}
                                    delay={0.25}
                                  />
                                }
                              />
                            </Link>
                          </Col>
                        </Row>
                      </>
                    </Container>
                  </Container>
                )}
              </>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardScreen;
