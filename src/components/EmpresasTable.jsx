import Table from 'react-bootstrap/Table';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../_assets/css/table.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import format from "date-fns/format";

function EmpresasTable() {

    const [filter, setFilter] = useState({});

    const tableFilter = (column, value) => {
        setFilter({ ...filter, [column]: value });
    };

    const [data, setData] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [showEditar, setShowEditar] = useState(false);
    const [showExcluir, setShowExcluir] = useState(false);
    const [showRelacionar, setShowRelacionar] = useState(false);

    const editarClose = () => setShowEditar(false);
    const editarShow = () => setShowEditar(true);

    const excluirClose = () => setShowExcluir(false);
    const excluirShow = () => setShowExcluir(true);

    const relacionarClose = () => setShowRelacionar(false);
    const relacionarShow = () => setShowRelacionar(true);

    const [formDataEditar, setFormData] = useState({});
    const [formDataExcluir, setFormDataExcluir] = useState({});
    const [formDataRelacionar, setFormDataRelacionar] = useState({});

    const editarChange = (event) => {
        setFormData({
        ...formDataEditar,
        [event.target.name]: event.target.value,
        });
    };

    const editForm = (item) => {
        editarShow();
        setTimeout(preencherForm, 500, item);
    }

    const editFormExcluir = (item) => {
        excluirShow();
        setTimeout(preencherFormExcluir, 500, item);
    }

    const editFormRelacionar = (item) => {
        relacionarShow();
        setTimeout(preencherFormRelacionar, 500, item);
    }

    const preencherForm = (item) => {
        document.getElementById('editarNome').value = item.nome;
        document.getElementById('editarCnpj').value = item.cnpj;
        document.getElementById('editarEndereco').value = item.endereco;
        document.getElementById('editarId').value = item.id;
        setFormData({
            ...formDataEditar,
            ['id']: item.id,
            ['nome']: item.nome,
            ['cnpj']: item.cnpj,
            ['endereco']: item.endereco,
        });
    }

    const preencherFormExcluir = (item) => {
        document.getElementById('excluirId').value = item.id;
        setFormDataExcluir({
            ...formDataExcluir,
            ['id']: item.id,
        });
    }

    const preencherFormRelacionar = (item) => {
        document.getElementById('relacionarId').value = item.id;
        setFormDataRelacionar({
            ...formDataRelacionar,
            ['empresa_id']: document.getElementById('relacionarId').value,
            ['usuario_id']: document.getElementById('relacionarEmpresaId').value,
        });
    }

    const editarSubmit = async (event) => {
        event.preventDefault();

        console.log(formDataEditar);
        const response = await fetch('http://localhost:8000/api/empresas', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataEditar),
        });

        console.log(response);

        if (response.ok) {
            const apiResponse = await response.json();
            console.log(apiResponse.message);
            window.location.reload();
        } else {
            console.error('There was a problem with the API request');
        }
    };

    const excluirSubmit = async (event) => {
        event.preventDefault();

        console.log(formDataExcluir);
        const response = await fetch('http://localhost:8000/api/empresas', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataExcluir),
        });

        console.log(response);

        if (response.ok) {
            const apiResponse = await response.json();
            console.log(apiResponse.message);
            window.location.reload();
        } else {
            console.error('There was a problem with the API request');
        }
    };

    const relacionarSubmit = async (event) => {
        event.preventDefault();

        setFormDataRelacionar({
            ...formDataRelacionar,
            ['usuario_id']: document.getElementById('relacionarId').value,
            ['empresa_id']: document.getElementById('relacionarEmpresaId').value,
        });

        setTimeout(async function (){
            console.log(formDataRelacionar);
            const response = await fetch('http://localhost:8000/api/gerenciamento/alocar-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataRelacionar),
            });
    
            console.log(response);
    
            if (response.ok) {
                const apiResponse = await response.json();
                console.log(apiResponse.message);
                window.location.reload();
            } else {
                console.error('There was a problem with the API request');
            }
        }, 2000);

        
    };

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('http://localhost:8000/api/empresas', {
            method: 'GET',
          });
          const apiData = await response.json();
          console.log(apiData);
          setData(apiData);
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('http://localhost:8000/api/usuarios', {
            method: 'GET',
          });
          const apiData = await response.json();
          console.log(apiData);
          setUsuarios(apiData);
        };
    
        fetchData();
      }, []);
    
    

    return (
        <div>
      <Table striped hover id="tableView">
        <thead>
          <tr>
            <th>
                <Form.Control
                    type="text"
                    placeholder="Filtrar por nome"
                    onChange={e => tableFilter("nome", e.target.value)}
                />
            </th>
            <th>
                <Form.Control
                    type="text"
                    placeholder="Filtrar por cnpj"
                    onChange={e => tableFilter("cnpj", e.target.value)}
                />
            </th>
            <th>
                <Form.Control
                    type="text"
                    placeholder="Filtrar por endereço"
                    onChange={e => tableFilter("endereco", e.target.value)}
                />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            {data.filter(data =>
                Object.entries(filter).every(([column, value]) =>
                data[column].toString().includes(value))).map((item) => (
                <tr>
                    <td>{item.nome}</td>
                    <td>{item.cnpj}</td>
                    <td>{item.endereco}</td>
                    <td>
                        <div class="row">
                            <div class="col">
                                <Button variant="dark" onClick={() => editForm(item)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
                                    </svg>
                                </Button>
                            </div>
                            <div class="col">
                                <Button variant="dark" onClick={() => editFormExcluir(item)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
                                        <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
                                    </svg>
                                </Button>
                            </div>
                            <div class="col">
                                <Button variant="dark" title='Criar relacionamento' onClick={() => editFormRelacionar(item)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
                                        <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
                                        <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
      </Table>
      
      <Modal show={showEditar} onHide={editarClose}>
      <Modal.Header closeButton>
          <Modal.Title>Atualizar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form onSubmit={editarSubmit} id="formUpdate">
          <Form.Control type="hidden" placeholder="" name='id' id='editarId' onChange={editarChange}/>
              <div class="row">
                  <div class="col">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>Nome</Form.Label>
                          <Form.Control type="text" placeholder="" name='nome' id='editarNome' onChange={editarChange}/>
                      </Form.Group>
                  </div>
              </div>
              <div class="row">
                  <div class="col">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>CNPJ</Form.Label>
                          <Form.Control type="text" placeholder="" name='cnpj' id='editarCnpj' onChange={editarChange}/>
                      </Form.Group>
                  </div>
              </div>
              <div class="row">
                  <div class="col">
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label>EEndereço</Form.Label>
                          <Form.Control type="text" placeholder="" name='endereco' id='editarEndereco' onChange={editarChange}/>
                      </Form.Group>
                  </div>
              </div>              
          </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="dark" onClick={editarClose}>
              Cancelar
          </Button>
          <Button variant="dark" onClick={editarSubmit}>
              Enviar
          </Button>
      </Modal.Footer>
  </Modal>

  <Modal show={showExcluir} onHide={excluirClose}>
      <Modal.Header closeButton>
          <Modal.Title>Atualizar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Após excluir <b>NÃO</b> será possivel restaurar o usuário, <br /> deseja confirmar a exclusão?</p>
          <Form onSubmit={excluirSubmit} id="formUpdate">
          <Form.Control type="hidden" placeholder="" name='id' id='excluirId' onChange={editarChange}/>
          </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="dark" onClick={excluirClose}>
              Cancelar
          </Button>
          <Button variant="danger" onClick={excluirSubmit}>
              Confirmar
          </Button>
      </Modal.Footer>
  </Modal>
  <Modal show={showRelacionar} onHide={relacionarClose}>
      <Modal.Header closeButton>
          <Modal.Title>Criar relacionamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form onSubmit={excluirSubmit} id="formUpdate">
          <Form.Control type="hidden" placeholder="" name='usuario_id' id='relacionarId' onChange={editarChange}/>
            <div class="row">
                <div class="col">
                    <p>Selecione a empresa deste usuário</p>
                    <Form.Select aria-label="Empresa" name='empresa_id' id='relacionarEmpresaId' onChange={editarChange}>
                        {usuarios.map((usuario) => (
                            <option value={usuario.id}>{usuario.nome}</option>
                        ))}
                    </Form.Select>
                </div>
            </div>
          </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="dark" onClick={relacionarClose}>
              Cancelar
          </Button>
          <Button variant="dark" onClick={relacionarSubmit}>
              Confirmar
          </Button>
      </Modal.Footer>
  </Modal>
  </div>
    );
  }
  
  export default EmpresasTable;