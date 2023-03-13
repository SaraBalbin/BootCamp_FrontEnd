import { Card } from 'antd'
import React from 'react'

const HomeAdmin = () => {
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
                            <li><a href="/Login">Crear Pregunta</a></li>
                        </ul>
            

                    </Card>
                </div>

            </div>

        </div>
       
      
    </div>
  )
}

export default HomeAdmin
