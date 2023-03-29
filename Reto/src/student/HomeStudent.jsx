import { Card, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

const HomeStudent = () => {
    let actualUser = JSON.parse(localStorage.getItem('actualUser'));
    const navigate = useNavigate();
    let studentsAnswer = JSON.parse(localStorage.getItem('studentsAnswer'))
    let questions = JSON.parse(localStorage.getItem('questions'));


    const [showScore, setShowScore] = useState(false)
    const [scoreStudent, setScoreStudent] = useState(0)

    const score = (student) => {
        let score = 0
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            for (let j = 0; j < 4; j++) {
                const option = question.options[j];
                if (option.id === student.answers[i] && option.iscorrect === true){
                    score += 1
                    break
                }             
            }
        }
        setScoreStudent(score)
        setShowScore(true)
    }

    const closeModalScore = () =>{
        setShowScore(false)
    }

    const solveOK = () => {
        for (let student of studentsAnswer){
            if(student.id === actualUser.id){
                if (student.formOk){
                    return (
                        <button onClick={() =>{score(student)}} className='botonEditarCrear' style={{marginTop:'20px', marginLeft: '20px'}}>Ver Calificacion</button>
                    )
                }
            }
        }
    }

    useEffect(() => {
        if (actualUser === null) {
            navigate('/')
        } else if (actualUser.role === 'admin'){
            navigate('/adminHome')
        }
    })
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
                            {solveOK()}
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
        <Modal open ={showScore}
                onOk= {closeModalScore}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { backgroundColor: '#5595c9' } }}
                title = 'Puntaje obtenido'
                    >
                <p>Preguntas correctas: {scoreStudent}</p>
                <p>Total de preguntas: {questions.length}</p>        
                La calificación obtenida es: <span>{(scoreStudent/questions.length) * 5}</span>
        </Modal>
    </div>
  )
}

export default HomeStudent
