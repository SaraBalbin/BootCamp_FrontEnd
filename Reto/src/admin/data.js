export const users =  
    {
        "state": true,
        "message": "Listado de estudiantes",
        "users": [{
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
        }, ]
    }

export const questionComplete = 
{
    "state": true,
    "message": "Listado de opciones",
    "options": [{
        "id": 1,
        "option": "lunes",
    }, {
        "id": 2,
        "option": "martes",
    }, {
        "id": 3,
        "option": "miercoles",
    }, {
        "id": 4,
        "option": "jueves",
    }]
}


export const questions = 
{
    "state": true,
    "questions": [{
        "question": "¿Cuales son las ramas de la ciencia?",
        "id": "11"
    }, {
        "question": "¿que dia es hoy?",
        "id": "12"
    }]
}

export const createQuestion = 
{
    "question": "¿que dia es hoy?",
    "options": [
        {
            "opcion":"esta es correcta",
            "iscorrect":true
        },{
            "opcion":"incorrecta",
            "iscorrect":false
        },{
            "opcion":"incorrecta",
            "iscorrect":false
        },{
            "opcion":"incorrecta",
            "iscorrect":false
        } ]
}

export const formStudents =
{
    "state": true,
    "questions": [{
        "question": "¿que dia es hoy?",
        "id": "12",
        "options": [{
            "id": 1,
            "option": "lunes",
        }, {
            "id": 2,
            "option": "martes",
        }, {
            "id": 3,
            "option": "miercoles",
        }, {
            "id": 4,
            "option": "jueves",
        }]
    }, {
        "question": "¿que hora es?",
        "id": "13",
        "options": [{
            "id": 1,
            "option": "14:00",
        }, {
            "id": 2,
            "option": "20:00",
        }, {
            "id": 3,
            "option": "21:00",
        }, {
            "id": 4,
            "option": "00:00",
        }]
    }]
}
