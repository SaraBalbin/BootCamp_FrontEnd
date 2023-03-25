import { Card, Modal, Table } from 'antd'
import React, { useState } from 'react'
import { users } from './data'
import { useNavigate } from 'react-router-dom';

const ListUsers = () => {
    const [deleted, setDeleted] = useState(false)
    const [closeDelete, setCloseDelete] = useState(false)

    const [show, setShow] = useState(false)
    const [closeShow, setCloseShow] = useState(false)

    const navigate = useNavigate();
    const [user, setUser] = useState('')

    const showUser = (id) => {
        setShow(true)
        for (let elemento of users.users){
            if (elemento.id === id){
                setUser(elemento)
            }
        }

    }
    const closeModalShow = () => {
        setShow(false)
        setCloseShow(true)
    }
    
    const deleteUser = (id) =>{
        console.log(id)
        setDeleted(true)
    }

    const closeModalDelete = () =>{
        setCloseDelete(true)
        setDeleted(false)
    }

    const columns = [
        {
            title: 'ID de usuario',
            dataIndex: 'id'
        },
        {
            title: 'Nombres',
            dataIndex: '',
            render:(dataIndex) => {
                return `${dataIndex.firstName} ${dataIndex.secondName}`
            }
        },
        {
            title: 'Apellidos',
            dataIndex: '',
            render:(dataIndex) => {
                return `${dataIndex.surname} ${dataIndex.secondSurName}`
            }
        },
        {
            title: 'Correo',
            dataIndex: 'email'
        },
        {
            title: 'Acciones',
            dataIndex: 'id',
            render:(id)=>{
                return (
                    <div>
                        <button className = 'botonListar editarVer' onClick={() => {showUser(id)}}>Ver</button>
                        <button className = 'botonListar editarVer' onClick={() => navigate(`/editUser/${id}`, {state:{id:id}})}>Editar</button>
                        <button className = 'botonListar borrar' onClick={() => {deleteUser(id)}}> X </button>
                    </div>
                )
            }
        },
    ]

    return (
        <div>
            <nav id = 'navHome'>
                <ul>
                    <div>
                        <img alt = 'escudoUnal' src='https://cdiac.manizales.unal.edu.co/imagenes/LogosMini/un.png'></img>
                    </div>
                    <hr/>
                    <li><a href="/adminHome">Principal</a></li>
                    <hr/>
                    <li><a className='activo' href="/listUsers">Usuarios</a></li>
                    <hr/>
                    <li><a href="/listQuestions">Preguntas</a></li>
                    <hr/>
                    <li><a href="#news">Información</a></li>
                    <hr/>
                </ul>
            </nav>
            <div id ='menuAdmin'>
                <div id = 'barraSuperior'> 
                    <p>Sistema de administracion académico - Universidad Nacional de Colombia</p>
                    <p>Admin</p>
                    <img id = 'perfil' alt = 'perfil' src ='https://cdn-icons-png.flaticon.com/512/6073/6073873.png'/>
                </div>
                <div id = 'contenidoAdmin'>
                    <div className='contenidoSuperior'>
                        <h3>Administracion de Usuarios</h3>
                        <button onClick={() => navigate('/createUser')} >Crear Usuario</button>
                    </div>
                    <div>
                        <Card id = 'tablaUsers'>
                            <Table rowKey="id" dataSource={users.users} columns = {columns} />
                        </Card>
                    </div>
        
                </div>
            </div>
            <Modal open ={deleted}
                onOk= {closeModalDelete}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { backgroundColor: '#5595c9' } }}
                title = 'Borrado de usuario'
                    >
                El usuario seleccionado ha sido eliminado 
            </Modal>

            <Modal open ={show}
                onOk= {closeModalShow}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { backgroundColor: '#5595c9' } }}
                title = 'Información del usuario'
            >
                <table className='verInformacion'>
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>{user.id}</td>
                        </tr>
                        <tr>
                            <td>Nombres</td>
                            <td>{user.firstName} {user.secondName}</td>
                        </tr>
                        <tr>
                            <td>Apellidos</td>
                            <td>{user.surname} {user.secondSurName}</td>
                        </tr>
                        <tr>
                            <td>Identificación</td>
                            <td>{user.documentNumber}</td>
                        </tr>
                        <tr>
                            <td>Correo</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>Celular</td>
                            <td>{user.phone}</td>
                        </tr>                 
                    </tbody>
                </table>             
            </Modal>
        </div>
    )
}

export default ListUsers
