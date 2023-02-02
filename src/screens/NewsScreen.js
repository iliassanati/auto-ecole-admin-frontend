import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import AdminSideBar from '../components/AdminSideBar';
import HeaderAdministrateur from '../components/HeaderAdministrateur';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
// import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import {
  Col,
  Container,
  Row,
  Button,
  Modal,
  Form,
  InputGroup,
} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';

import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { useToasts } from 'react-toast-notifications';
import moment from 'moment';
import FormContainer from '../components/FormContainer';
import {
  allNewsList,
  createNews,
  deleteNews,
  updateNews,
} from '../actions/newsActions';
import {
  NEWS_DELETE_RESET,
  NEWS_UPDATE_RESET,
} from '../constants/newsConstants';

const NewsScreen = () => {
  moment.locale('fr');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [type, setType] = useState('');
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [message] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { addToast } = useToasts();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const newsCreate = useSelector((state) => state.newsCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = newsCreate;

  const newsList = useSelector((state) => state.newsList);
  const { allNews, loading: loadingAllNews, error: errorAllNews } = newsList;

  const newsUpdate = useSelector((state) => state.newsUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = newsUpdate;

  const newsDelete = useSelector((state) => state.newsDelete);
  const { success: successDelete } = newsDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(allNewsList());
    } else {
      navigate('/');
    }
    if (successUpdate) {
      addToast('Modification effectuee avec succes', {
        appearance: 'success',
        autoDismiss: true,
      });
      dispatch({ type: NEWS_UPDATE_RESET });
    }
    if (successCreate) {
      setShow(false);
      dispatch({ type: 'NEWS_CREATE_RESET' });
    }
    if (successDelete) {
      addToast('News supprime', {
        appearance: 'success',
        autoDismiss: true,
      });
      dispatch({ type: NEWS_DELETE_RESET });
    }
  }, [
    userInfo,
    dispatch,
    navigate,
    successUpdate,
    addToast,
    successCreate,
    successDelete,
  ]);

  const newsCreateHandler = () => {
    dispatch(createNews(type, titre, contenu));
  };

  const { SearchBar } = Search;

  const data =
    allNews &&
    allNews.map((news) => ({
      id: news._id,
      type: news.type,
      titre: news.titre,
      contenu: news.contenu,
    }));

  const columns = [
    {
      dataField: 'type',
      text: 'Type  ',
      sort: true,
      headerStyle: {
        backgroundColor: '#1D1D1D',
        color: '#D0BD99',
      },
      editorStyle: {
        backgroundColor: '#e9ecef',
      },
    },
    {
      dataField: 'titre',
      text: 'Titre',
      sort: true,
      headerStyle: {
        backgroundColor: '#1D1D1D',
        color: '#D0BD99',
      },
      editorStyle: {
        backgroundColor: '#e9ecef',
      },
    },
    {
      dataField: 'contenu',
      text: 'Contenu',
      sort: true,
      headerStyle: {
        backgroundColor: '#1D1D1D',
        color: '#D0BD99',
      },
      editorStyle: {
        backgroundColor: '#e9ecef',
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: 'createdAt',
      order: 'asc',
    },
  ];
  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    sizePerPageList: [
      {
        text: '10',
        value: 10,
      },
      {
        text: '20',
        value: 20,
      },
      {
        text: '50',
        value: 50,
      },
      {
        text: '100',
        value: 100,
      },
      {
        text: '200',
        value: 200,
      },
      {
        text: '300',
        value: 300,
      },
    ],
  };

  let idNews = '';

  function afterSaveCell(oldValue, newValue, row, column) {
    dispatch(
      updateNews(row.id, {
        [column.dataField]: newValue,
      })
    );
  }

  const selectRow = {
    mode: 'checkbox',
    style: { backgroundColor: '#c8e6c9' },
    onSelect: (row, isSelect, rowIndex, e) => {
      idNews = row.id;
    },
    clickToEdit: true,
  };

  const deleteHandler = () => {
    dispatch(deleteNews(idNews));
  };

  return (
    <div id='root'>
      <div className='app'>
        <AdminSideBar identifiant={userInfo.identifiant} />
        <main>
          <HeaderAdministrateur
            headerTitle='Liste des news'
            endPoint='/admin/dashboard'
          />

          {loadingUpdate && <Spinner size={150} />}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loadingAllNews ? (
            <Spinner size={100} />
          ) : errorAllNews ? (
            <Message variant='danger'>{errorAllNews}</Message>
          ) : (
            <Container
              className='mb-4 mt-4 pt-3  pb-3 font-weight-bold'
              style={{
                backgroundColor: '#fff',
                transition: 'box-shadow 0.25s',
                boxShadow:
                  '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
              }}
            >
              {data && (
                <ToolkitProvider
                  keyField='id'
                  data={data}
                  columns={columns}
                  columnToggle
                  search
                >
                  {(props) => (
                    <>
                      <Container>
                        <Row>
                          <h5 className='mb-2'>
                            <i className='fas fa-search'></i> Rechercher :
                          </h5>
                          <Col md={4} lg={4}>
                            <SearchBar {...props.searchProps} />
                          </Col>
                          <Col className='ms-4 text-end'>
                            <Button
                              size='sm'
                              className='me-2'
                              variant='btn btn-outline-info'
                              onClick={handleShow}
                            >
                              <i className='fas fa-plus'></i>
                            </Button>
                            <Button
                              size='sm'
                              variant='btn btn-outline-success'
                              className='me-2'
                            >
                              <i className='fas fa-user'></i>
                            </Button>
                            <Button
                              size='sm'
                              className='me-2'
                              variant='btn btn-outline-danger'
                              onClick={deleteHandler}
                            >
                              <i className='fas fa-trash'></i>
                            </Button>
                          </Col>
                        </Row>
                      </Container>

                      <hr />
                      <BootstrapTable
                        {...props.baseProps}
                        keyField='id'
                        bootstrap4={true}
                        data={data}
                        columns={columns}
                        wrapperClasses='table-responsive text-center'
                        hover
                        noDataIndication='Le Tableau est vide'
                        defaultSorted={defaultSorted}
                        pagination={paginationFactory(options)}
                        filter={filterFactory()}
                        cellEdit={cellEditFactory({
                          mode: 'click',
                          afterSaveCell,
                        })}
                        selectRow={selectRow}
                        tabIndexCell
                      />
                    </>
                  )}
                </ToolkitProvider>
              )}
            </Container>
          )}
        </main>
      </div>
      <>
        <Modal show={show} onHide={handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title className='mt-2 mb-2 '>
              <i className='fas fa-plus '></i> Creation d'une nouvelle news
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormContainer>
              <Form className='mt-3'>
                {message && <Message variant='danger'>{message}</Message>}
                {errorCreate && (
                  <Message variant={'danger'}>
                    <i className='fas fa-exclamation-triangle'></i>{' '}
                    {errorCreate}
                  </Message>
                )}
                <>
                  <InputGroup className='mb-3 mt-3'>
                    <InputGroup.Text>
                      <i className='fas fa-car '></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      placeholder='Type'
                      style={{ borderRadius: '0' }}
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    ></Form.Control>
                  </InputGroup>

                  <InputGroup className='mb-3'>
                    <InputGroup.Text>
                      <i className='fas fa-font'></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      placeholder='Titre'
                      style={{ borderRadius: '0' }}
                      value={titre}
                      onChange={(e) => setTitre(e.target.value)}
                    ></Form.Control>
                  </InputGroup>

                  <InputGroup className='mb-3'>
                    <InputGroup.Text>
                      <i className='fas fa-paste'></i>
                    </InputGroup.Text>
                    <Form.Control
                      as='textarea'
                      rows={3}
                      placeholder='Contenu'
                      style={{ borderRadius: '0' }}
                      value={contenu}
                      onChange={(e) => setContenu(e.target.value)}
                    ></Form.Control>
                  </InputGroup>
                </>
              </Form>
            </FormContainer>
          </Modal.Body>
          <Modal.Footer>
            {loadingCreate ? (
              <Spinner size={50} />
            ) : (
              <>
                <Button variant='secondary' onClick={handleClose}>
                  <i className='fas fa-times'></i> Fermer
                </Button>
                <Button variant='primary' onClick={newsCreateHandler}>
                  <i classNme='fal fa-user-plus'></i> Creer la news
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default NewsScreen;
