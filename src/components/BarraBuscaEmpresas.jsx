import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function BuscaEmpresa(){
    const [show, setShow] = useState(false);

    const inserirClose = () => setShow(false);
    const inserirShow = () => setShow(true);

    const [formData, setFormData] = useState({});

    const insertChange = (event) => {
        setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        });
    };

    const insertSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8000/api/empresas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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


    return (
        <div id="margin">
            <div class="row">
                <div class="col">
                    <Button variant="dark" onClick={inserirShow}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </Button>
                </div>
            </div>
            <Modal show={show} onHide={inserirClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Inserir</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={insertSubmit} id="formInsert">
                        <div class="row">
                            <div class="col">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Nome</Form.Label>
                                    <Form.Control type="text" placeholder="" name='nome'  onChange={insertChange}/>
                                </Form.Group>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>CNPJ</Form.Label>
                                    <Form.Control type="text" placeholder="" name='cnpj' onChange={insertChange}/>
                                </Form.Group>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Endereço</Form.Label>
                                    <Form.Control type="text" placeholder="" name='endereco'  onChange={insertChange}/>
                                </Form.Group>
                            </div>
                        </div>                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={inserirClose}>
                        Cancelar
                    </Button>
                    <Button variant="dark" onClick={insertSubmit}>
                        Enviar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default BuscaEmpresa;