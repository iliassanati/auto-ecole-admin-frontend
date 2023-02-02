import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import AdminSideBar from '../components/AdminSideBar';
import HeaderAdministrateur from '../components/HeaderAdministrateur';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
// import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
import ToolkitProvider, {
  Search,
} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min';
import { Col, Container, Row, Form, InputGroup } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import Message from '../components/Message';
import Spinner from '../components/Spinner';
import moment from 'moment';
import { getUserDetails } from '../actions/userActions';

const UserDetailsScreen = () => {
  moment.locale('fr');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [identifiant, setIdentifiant] = useState('');
  const [cin, setCin] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [permis, setPermis] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: loadingDetails, error: errorDetails, user } = userDetails;

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      navigate('/login');
    } else {
      if (!user.identifiant || user._id !== params.idUtilisateur) {
        dispatch(getUserDetails(params.idUtilisateur));
      } else {
        setIdentifiant(user.identifiant);
        setCin(user.cin);
        setPermis(user.permis);
        setPhone(user.phone);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [userInfo, params, dispatch, navigate, user]);

  const { SearchBar } = Search;

  const data =
    user &&
    user.scoreSeries &&
    user.scoreSeries.map((scoreSerie) => ({
      id: scoreSerie._id,
      seriePermis: scoreSerie.seriePermis,
      serieNumber: scoreSerie.serieNumber,
      scoreMoyenSerie: scoreSerie.scoreMoyenSerie,
      tentative: scoreSerie.tentative,
    }));

  const columns = [
    {
      dataField: 'seriePermis',
      text: 'Type de permis  ',
      sort: true,
      headerStyle: {
        backgroundColor: '#1D1D1D',
        color: '#D0BD99',
      },
      filter: textFilter(),
      editorStyle: {
        backgroundColor: '#e9ecef',
      },
    },
    {
      dataField: 'serieNumber',
      text: 'Numero de serie',
      sort: true,
      headerStyle: {
        backgroundColor: '#1D1D1D',
        color: '#D0BD99',
      },
      filter: textFilter(),
      editorStyle: {
        backgroundColor: '#e9ecef',
      },
    },
    {
      dataField: 'scoreMoyenSerie',
      text: 'Score moyen pour cette serie',
      sort: true,
      headerStyle: {
        backgroundColor: '#1D1D1D',
        color: '#D0BD99',
      },
      filter: textFilter(),
      editorStyle: {
        backgroundColor: '#e9ecef',
      },
    },
    {
      dataField: 'tentative',
      text: 'Nombre de tentative',
      sort: true,
      headerStyle: {
        backgroundColor: '#1D1D1D',
        color: '#D0BD99',
      },
      filter: textFilter(),
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

  // function afterSaveCell(oldValue, newValue, row, column) {
  //   dispatch(
  //     updateNews(row.id, {
  //       [column.dataField]: newValue,
  //     })
  //   );
  // }

  // const selectRow = {
  //   mode: 'checkbox',
  //   style: { backgroundColor: '#c8e6c9' },
  //   onSelect: (row, isSelect, rowIndex, e) => {
  //     idNews = row.id;
  //   },
  //   clickToEdit: true,
  // };

  return (
    <div id='root'>
      <div className='app'>
        <AdminSideBar identifiant={userInfo.identifiant} />
        <main>
          <HeaderAdministrateur
            headerTitle={`Informations de ${
              user.identifiant ? user.identifiant : ''
            }`}
            endPoint='/admin/dashboard'
          />

          {loadingDetails ? (
            <Spinner size={100} />
          ) : errorDetails ? (
            <Message variant='danger'>{errorDetails}</Message>
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
              <>
                {' '}
                <h4 className=' me-5 ms-5 mt-3'>Details du profile</h4>
                <Form className='mt-2 me-5 ms-5 mb-4'>
                  <>
                    <Row>
                      <Col md={6} lg={6} sm={12}>
                        <Form.Label>Nom et prenom</Form.Label>
                        <InputGroup className='mb-3 '>
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
                      </Col>
                      <Col md={6} lg={6} sm={12}>
                        <Form.Label>Numero de la CIN</Form.Label>
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
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} lg={6} sm={12}>
                        <Form.Label>Type de permis de la CIN</Form.Label>
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
                            <option value='DE'>DE</option>
                          </Form.Control>
                        </InputGroup>
                      </Col>{' '}
                      <Col md={6} lg={6} sm={12}>
                        <Form.Label>Numero du telephone</Form.Label>
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
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} lg={6} sm={12}>
                        <Form.Label>Email</Form.Label>
                        <InputGroup className='mb-3'>
                          <InputGroup.Text>
                            <i className='fas fa-lock '></i>
                          </InputGroup.Text>
                          <Form.Control
                            type='email'
                            placeholder='Email'
                            style={{ borderRadius: '0' }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          ></Form.Control>
                        </InputGroup>
                      </Col>{' '}
                      <Col md={6} lg={6} sm={12}>
                        <Form.Label>Mot de passe</Form.Label>
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
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} lg={6} sm={12}>
                        <Form.Group
                          className='mb-3 mt-5'
                          controlId='formBasicCheckbox'
                        >
                          <Form.Check
                            type='checkbox'
                            name
                            label="Est ce que c'est un admin ?"
                            value={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>{' '}
                  <hr />
                </Form>
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
                          <h4 className=' me-3 ms-3 mb-4'>
                            Statistiques des exams
                          </h4>
                          <Row className=' me-3 ms-3 mb-3'>
                            <h5 className='mb-2 '>
                              <i className='fas fa-search'></i> Rechercher :
                            </h5>
                            <Col md={4} lg={4}>
                              <SearchBar {...props.searchProps} />
                            </Col>
                          </Row>
                        </Container>

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
                          })}
                          tabIndexCell
                        />
                      </>
                    )}
                  </ToolkitProvider>
                )}
              </>
            </Container>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserDetailsScreen;
