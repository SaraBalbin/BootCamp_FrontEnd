import { Card } from 'antd'
import React from 'react'

const HomeStudent = () => {
  return (
    <div>
        <nav id = 'navHome'>
            <ul>
                <div>
                    <img alt = 'logo Unal' src='https://cdiac.manizales.unal.edu.co/imagenes/LogosMini/un.png'></img>
                </div>
                <li><a href="/studentHome">Principal</a></li>
                <hr/>
                <li><a href="/solveForm">Formulario</a></li>
                <hr/>
                <li><a  onClick={() => {localStorage.removeItem('actualUser')}} href = '/'>Salir</a></li>
                <hr/>
            </ul>
        </nav>

        <div id ='menuAdmin'>
            <div id = 'barraSuperior'> 
                <p>Evaluación - Universidad Nacional de Colombia</p>
                <p>Estudiante</p>
                <img alt = 'perfil' id = 'perfil' src ='https://cdn-icons-png.flaticon.com/512/6073/6073873.png'/>
            </div>

            <div id = 'contenidoHome'>
                <div>
                    <Card title = 'Formulario' headStyle={{textAlign: 'center'}}>
                        <ul>
                            <li><a href="/solveForm">Resolver Formulario</a></li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeStudent
