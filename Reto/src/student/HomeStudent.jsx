import { Card } from 'antd'
import React from 'react'

const HomeStudent = () => {
  return (
    <div>
        <nav id = 'navHome'>
            <ul>
                <div>
                    <img src='https://cdiac.manizales.unal.edu.co/imagenes/LogosMini/un.png'></img>
                </div>
                <li><a href="/adminStudent">Principal</a></li>
                <hr/>
                <li><a href="#news">Formulario</a></li>
                <hr/>
                <li><a href="#news">Información</a></li>
                <hr/>
            </ul>
        </nav>

        <div id ='menuAdmin'>
            <div id = 'barraSuperior'> 
                <p>Evaluación - Universidad Nacional de Colombia</p>
                <p>Estudiante</p>
                <img id = 'perfil' src ='https://cdn-icons-png.flaticon.com/512/6073/6073873.png'/>
            </div>

            <div id = 'contenidoHome'>
                <div>
                    <Card title = 'Cuestionario' headStyle={{textAlign: 'center'}}>
                        <ul>
                            <li><a href="/Login">Resolver Cuestionario</a></li>
                        </ul>
                    </Card>
                    
                </div>

            </div>

        </div>
       
      
    </div>
  )
}

export default HomeStudent
