

curl -X POST http://localhost:5000/api/partidos \
     -H "Content-Type: application/json" \
     -d '{
        "fecha": "2025-02-16T20:00:00",
        "diaSemana": "DOMINGO",
        "hora": "17",
        "tipo": "Futbol_5",
        "lugar": "Marangoni",
        "confirmados": ["Juampa", "Kiman"],
        "totalJugadores": 10,
        "estado": "Reservado",
        "imagen": "assets/images/marangoni_cancha_1.jpg"
     }'

curl -X POST http://localhost:5000/api/partidos \
     -H "Content-Type: application/json" \
     -d '{
        "fecha": "2025-02-16T16:00:00",
        "diaSemana": "DOMINGO",
        "hora": "16",
        "tipo": "Futbol_5",
        "lugar": "Marangoni",
        "confirmados": [],
        "totalJugadores": 10,
        "estado": "Reservado",
        "imagen": "assets/images/marangoni_cancha_1.jpg"
     }'

curl -X GET http://localhost:5000/api/partidos/proximos

curl -X GET http://localhost:5000/api/partidos/67aabe2bc76a99ce5837be75

curl -X POST http://localhost:5000/api/partidos/67aabe2bc76a99ce5837be75/jugadores \
     -H "Content-Type: application/json" \
     -d '{
        "jugador": "Pacopepe"
     }'
