import { Card } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';


const HomeAdmin = () => {
    let actualUser = JSON.parse(localStorage.getItem('actualUser'));
    const navigate = useNavigate();

    useEffect(() => {
        if (actualUser === null) {
            navigate('/')
        } else{
            if (actualUser.role === 'estudiante'){
                navigate('/studentHome')
            }
        }
    })

  return (
    <div>
        <nav id = 'navHome'>
            <ul>
                <div>
                    <img alt = 'escudoUnal' src='https://cdiac.manizales.unal.edu.co/imagenes/LogosMini/un.png'></img>
                </div>
                <li><a className='activo' href="/adminHome">Principal</a></li>
                <hr/>
                <li><a href="/listUsers">Usuarios</a></li>
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

            <div id = 'contenidoHome'>
                <div>
                    <Card title = 'Usuarios' headStyle={{textAlign: 'center'}}>
                        <ul>
                            <li><a href="/listUsers">Ver lista de Usuarios</a></li>
                            <li><a href="/createUser">Crear Usuario</a></li>
                        </ul>
                    </Card>
                    <Card title = 'Preguntas' headStyle={{textAlign: 'center'}}>
                         <ul>
                         <li><a href="/listQuestions">Ver lista de Preguntas</a></li>
                            <li><a href="/createQuestion">Crear Pregunta</a></li>
                        </ul>
                    </Card>
                </div>

            </div>

        </div>
       
      
    </div>
  )
}

export default HomeAdmin
