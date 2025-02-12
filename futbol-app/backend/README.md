

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


curl -X POST http://localhost:5000/api/jugadores \
     -H "Content-Type: application/json" \
     -d '{
          "nombre": "Nacho",
          "apodo": "Toqueton",
          "apellido": "Kiman",
          "edad": 31,
          "stat_general": 44,
          "stat_ataque": 60,
          "stat_defensa": 60,
          "stat_velocidad": 35,
          "stat_stamina": 40,
          "stat_potencia": 88,
          "stat_pase": 53,
          "victorias": 2,
          "empates": 10,
          "derrotas": 50,
          "foto": "/assets/images/kiman_jugador.jpg"
        }'
