import { Card, Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ListUsers = () => {

    let actualUser = JSON.parse(localStorage.getItem('actualUser'));
    const navigate = useNavigate();
    let students = JSON.parse(localStorage.getItem('students'))
    let studentsAnswer = JSON.parse(localStorage.getItem('studentsAnswer'))

    useEffect(() => {
        if (actualUser === null) {
            navigate('/')
        } else if (actualUser.role !== 'admin'){
            navigate('/studentHome')
        }
    })

    // Mostrar Usuario
    const [show, setShow] = useState(false)
    const [user, setUser] = useState('')

    const showUser = (id) => {
        setShow(true)
        for (let elemento of students){
            if (elemento.id === id){
                setUser(elemento)
            }
        }
    }
    const closeModalShow = () => {
        setShow(false)
    }
    
    // Eliminar Usuario
    const [deleted, setDeleted] = useState(false)

    const deleteUser = (id) =>{
        const result = students.filter(student => student.id !== id);
        localStorage.setItem('students', JSON.stringify(result))
        
        const result2 = studentsAnswer.filter(student => student.id !== id);
        localStorage.setItem('studentsAnswer', JSON.stringify(result2))
        setDeleted(true)
    }

    const closeModalDelete = () =>{
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
                    <li><a  onClick={() => {localStorage.removeItem('actualUser')}} href = '/'>Salir</a></li>
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
                            <Table rowKey="id" dataSource={JSON.parse(localStorage.getItem('students'))} columns = {columns} 
                            pagination={{ pageSize: 5, showSizeChanger: true }} />
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
