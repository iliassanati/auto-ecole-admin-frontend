import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import AdminSideBar from '../components/AdminSideBar';
import HeaderAdministrateur from '../components/HeaderAdministrateur';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
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

import {
  deleteUser,
  listUsers,
  registerUser,
  updateUser,
} from '../actions/userActions';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import { useToasts } from 'react-toast-notifications';
import {
  USER_UPDATE_RESET,
  USER_DELETE_RESET,
  USER_REGISTER_RESET,
  USER_DETAILS_RESET,
} from '../constants/userConstants';
import moment from 'moment';
import FormContainer from '../components/FormContainer';

const UtilisateursScreen = () => {
  moment.locale('fr');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [identifiant, setIdentifiant] = useState('');
  const [cin, setCin] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [permis, setPermis] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { addToast } = useToasts();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: loadingRegister,
    error: errorRegister,
    success: successRegister,
  } = userRegister;

  const userList = useSelector((state) => state.userList);
  const { users, loading: loadingUsers, error: errorUsers } = userList;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: successUpdate,
    loading: loadingUpdate,
    error: errorUpdate,
  } = userUpdate;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch({ type: USER_DETAILS_RESET });
      dispatch(listUsers());
    } else {
      navigate('/');
    }
    if (successUpdate) {
      addToast('Modification effectuee avec succes', {
        appearance: 'success',
        autoDismiss: true,
      });
      dispatch({ type: USER_UPDATE_RESET });
    }
    if (successRegister) {
      setShow(false);
      dispatch({ type: USER_REGISTER_RESET });
    }
    if (successDelete) {
      addToast('Utilisateur supprime', {
        appearance: 'success',
        autoDismiss: true,
      });
      dispatch({ type: USER_DELETE_RESET });
    }
  }, [
    userInfo,
    dispatch,
    navigate,
    successUpdate,
    addToast,
    successRegister,
    successDelete,
  ]);

  const signupHandler = () => {
    dispatch(registerUser(identifiant, cin, phone, password, permis, isAdmin));
  };

  const { SearchBar } = Search;

  const data =
    users &&
    users.map((user) => ({
      id: user._id,
      identifiant: user.identifiant,
      cin: user.cin,
      phone: user.phone,
      email: user.email,
      permis: user.permis,
      createdAt: user.createdAt,
    }));

  const columns = [
    // {
    //   dataField: 'id',
    //   text: 'Id',
    //   sort: true,
    //   headerStyle: {
    //     backgroundColor: '#1D1D1D',
    //     color: '#D0BD99',
    //   },
    // },
    {
      dataField: 'identifiant',
      text: 'Nom et prenom ',
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
      dataField: 'cin',
      text: 'Numero de la CIN',
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
      dataField: 'phone',
      text: 'Numero de telephone',
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
      dataField: 'email',
      text: 'Email',
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
      dataField: 'permis',
      text: 'Type de permis',
      sort: true,
      headerStyle: {
        backgroundColor: '#1D1D1D',
        color: '#D0BD99',
      },
      editorStyle: {
        backgroundColor: '#e9ecef',
      },
      editor: {
        type: Type.SELECT,
        options: [
          {
            value: 'A',
            label: 'A',
          },
          {
            value: 'B',
            label: 'B',
          },
          {
            value: 'C',
            label: 'C',
          },
          {
            value: 'D',
            label: 'D',
          },
          {
            value: 'EC',
            label: 'EC',
          },
        ],
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

  let idUtilisateur = '';
  let utilisateurs = [];

  function afterSaveCell(oldValue, newValue, row, column) {
    dispatch(
      updateUser(row.id, {
        [column.dataField]: newValue,
      })
    );
  }

  const selectRow = {
    mode: 'checkbox',
    style: { backgroundColor: '#c8e6c9' },
    onSelect: (row, isSelect, rowIndex, e) => {
      idUtilisateur = row.id;
      utilisateurs.push(row);
    },
    onSelectAll: (isSelect, rows, e) => {
      rows.map((row) => utilisateurs.push(row));
    },
    clickToEdit: true,
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    if (utilisateurs.length === 0) {
      setMessage('Veuillez choisir au moins un utilisateur');
    } else {
      utilisateurs.map((utilisateur) => {
        dispatch(deleteUser(utilisateur.id));
      });
    }
  };

  return (
    <div id='root'>
      <div className='app'>
        <AdminSideBar identifiant={userInfo.identifiant} />
        <main>
          <HeaderAdministrateur
            headerTitle='Liste des utilisateurs'
            endPoint='/admin/dashboard'
          />

          {loadingDelete && <Spinner size={150} />}
          {loadingUpdate && <Spinner size={150} />}
          {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          {loadingUsers ? (
            <Spinner size={100} />
          ) : errorUsers ? (
            <Message variant='danger'>{errorUsers}</Message>
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
                              <i className='fas fa-user-plus'></i>
                            </Button>
                            <Button
                              size='sm'
                              variant='btn btn-outline-success'
                              className='me-2'
                              onClick={() =>
                                navigate(`/admin/utilisateurs/${idUtilisateur}`)
                              }
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
              <i className='fas fa-user-plus'></i> Creation d'un nouveau
              utilisateur
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormContainer>
              <Form className='mt-3'>
                {message && <Message variant='danger'>{message}</Message>}
                {errorRegister && (
                  <Message variant={'danger'}>
                    <i className='fas fa-exclamation-triangle'></i>{' '}
                    {errorRegister}
                  </Message>
                )}
                <>
                  <InputGroup className='mb-3 mt-3'>
                    <InputGroup.Text>
                      <i className='fas fa-user '></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      placeholder='Identifiant'
                      style={{ borderRadius: '0' }}
                      value={identifiant}
                      onChange={(e) => setIdentifiant(e.target.value)}
                    ></Form.Control>
                  </InputGroup>

                  <InputGroup className='mb-3'>
                    <InputGroup.Text>
                      <i className='fas fa-id-card '></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      placeholder='Num CIN'
                      style={{ borderRadius: '0' }}
                      value={cin}
                      onChange={(e) => setCin(e.target.value)}
                    ></Form.Control>
                  </InputGroup>

                  <InputGroup className='mb-3'>
                    <InputGroup.Text>
                      <i className='fas fa-lock '></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='password'
                      placeholder='Mot de passe'
                      style={{ borderRadius: '0' }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </InputGroup>

                  <InputGroup className='mb-3'>
                    <InputGroup.Text>
                      <i className='fas fa-phone '></i>
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      placeholder='Numero de telephone'
                      style={{ borderRadius: '0' }}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    ></Form.Control>
                  </InputGroup>

                  <InputGroup className='mb-3'>
                    <InputGroup.Text>
                      <i className='fas fa-car'></i>
                    </InputGroup.Text>
                    <Form.Control
                      as='select'
                      placeholder='Type de permis'
                      style={{ borderRadius: '0' }}
                      value={permis}
                      onChange={(e) => setPermis(e.target.value)}
                    >
                      <option value=''>Selectionner le permis</option>
                      <option value='A'>A</option>
                      <option value='B'>B</option>
                      <option value='C'>C</option>
                      <option value='D'>D</option>
                      <option value='CE'>CE</option>
                    </Form.Control>
                  </InputGroup>

                  <Form.Group className='mb-3' controlId='formBasicCheckbox'>
                    <Form.Check
                      type='checkbox'
                      label="Est ce que c'est un admin ?"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                  </Form.Group>
                </>
              </Form>
            </FormContainer>
          </Modal.Body>
          <Modal.Footer>
            {loadingRegister ? (
              <Spinner size={50} />
            ) : (
              <>
                <Button variant='secondary' onClick={handleClose}>
                  <i className='fas fa-times'></i> Fermer
                </Button>
                <Button variant='primary' onClick={signupHandler}>
                  <i classNme='fal fa-user-plus'></i> Ajouter l'utilisateur
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default UtilisateursScreen;
