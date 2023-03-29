import { Card } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const HomeAdmin = () => {
    let actualUser = JSON.parse(localStorage.getItem('actualUser'));
    const navigate = useNavigate();

    const getQuestions = () => {
        if (localStorage.getItem('questions') === null){
            localStorage.setItem('questions', JSON.stringify([{
              "question": "¿Los números son estudiados por?",
              "id": 1,
              "options": [{
                  "id": 1,
                  "option": "La biología",
                  "iscorrect":false
              }, {
                  "id": 2,
                  "option": "Las Matemáticas",
                  "iscorrect":true
              }, {
                  "id": 3,
                  "option": "La sociología",
                  "iscorrect":false
              }, {
                  "id": 4,
                  "option": "La medicina",
                  "iscorrect":false
              }]
          }, {
              "question": "¿Qué ciencia o disciplina estudia la estructura y funcionamiento del cuerpo humano?",
              "id": 2,
              "options": [{
                  "id": 5,
                  "option": "Cardiología",
                  "iscorrect":false
              }, {
                  "id": 6,
                  "option": "Zoología",
                  "iscorrect":false
              }, {
                  "id": 7,
                  "option": "Anatomía",
                  "iscorrect":true
              }, {
                  "id": 8,
                  "option": "Fisiología humana",
                  "iscorrect":false
              }]
          }]))
        }
    }
    const getStudents = () => {
        if (localStorage.getItem('students') === null){
            localStorage.setItem('students', JSON.stringify([{
                'id': 1,
                "firstName": "daniel",
                "secondName": "jose",
                "surname": "cruz",
                "secondSurName": "casallas",
                "typeDocument": 1,
                "documentNumber": "123456789",
                "email": "danielc88@gmail.co",
                "phone": "32123122314",
                'password': '1234'
            }, {
                'id': 2,
                "firstName": "sara",
                "secondName": "catalina",
                "surname": "balbin",
                "secondSurName": "ramirez",
                "typeDocument": 1, 
                "documentNumber": "1000415580",
                "email": "sbalbin@gmail.co",
                "phone": "32123122314",
                'password': '1234'
            }, ]))
            localStorage.setItem('studentsAnswer', JSON.stringify([
                {
                    'id': 1,
                    'answers': [],
                    'formOk': false
                },
                {
                    'id': 2,
                    'answers': [],
                    'formOk': false
                }
            ]))
        }
    }

    useEffect(() => {
        if (actualUser === null) {
            navigate('/')
        } else if (actualUser.role !== 'admin'){
            navigate('/studentHome')
        }
        getQuestions()
        getStudents()
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
