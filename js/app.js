const messageContainer = document.querySelector('#message_container');
const send = document.getElementById('send_button');
const message = document.getElementById('message_box')


message.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    showMessages()
  }
});

var ip ;
var country ;
var device_id ;

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(res => {
        ip = res.ip
        country = res.country || 'Colombia'
    });
    device_id =  Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
    messageContainer.innerHTML = `
    <div class="chat-message">
        <div class="flex items-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                    Bienvenido al ChatBot de CampusLand </br>
                </span></div>
            </div>
            <img src="https://yt3.googleusercontent.com/eJG_qiZmgwaP8iEXJqiFZxVKGWJBAwPOpf3JiF2e2-ruu668j-RKXCXwSi7ZdRRhBrPyWW_E=s900-c-k-c0x00ffffff-no-rj" alt="My profile" class="w-6 h-6 rounded-full order-1">
        </div>
    </div>
    `
})


send.addEventListener('click', () => {
    showMessages()
});


function showMessages() {
    if (message.value) {
        messageContainer.innerHTML += `
        <div class="chat-message">
            <div class="flex items-end justify-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                <div><span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                    ${message.value}
                </span></div>
            </div>
            <img src="https://scontent.fbaq1-1.fna.fbcdn.net/v/t39.30808-6/419899807_2234794613389421_7439094271622892549_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeExASrkkzf_BWnwYURD_DS1jsgHNt8GSaCOyAc23wZJoGIm4zyiovqCZZX6hICgbezKZ7MNN9mF8cDYY1s1h__7&_nc_ohc=i44mSi0Ev4oAb7NtCAn&_nc_ht=scontent.fbaq1-1.fna&oh=00_AfArgRWSvUGv1n5IaoT_BaiFSUEk4CzVaj-2fwJOZpJ-gw&oe=662C91C0" alt="My profile" class="w-6 h-6 rounded-full order-2">
            </div>
        </div>
        `
        const res = obtenerRespuesta(message.value)
        messageContainer.innerHTML += `
            <div class="chat-message">
                <div class="flex items-end">
                    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
                            ${res}
                        </span></div>
                    </div>
                    <img src="https://yt3.googleusercontent.com/eJG_qiZmgwaP8iEXJqiFZxVKGWJBAwPOpf3JiF2e2-ruu668j-RKXCXwSi7ZdRRhBrPyWW_E=s900-c-k-c0x00ffffff-no-rj" alt="My profile" class="w-6 h-6 rounded-full order-1">
                </div>
            </div>
        `
    
        message.value = ''
    }
}


  
function obtenerRespuesta(texto) {
    // Convertir el texto a minúsculas para facilitar la comparación
    texto = texto.toLowerCase();
  
    // Lista de patrones y respuestas prediseñadas
    var patronesRespuestas = [
        { patron: ["y tu", "saludo"], respuesta: "estoy bien, ¡gracias por preguntar! ¿Y tú, cómo estás hoy?." }, 
        { patron: ["bien", "gracias"], respuesta: "Me alegra escuchar eso. ¿Hay algo en particular que te gustaría hablar o discutir hoy?" },
        { patron: ["campus", "centro de formación"], respuesta: "Soy un apasionado por la educación. Los campus son lugares emocionantes donde se comparte conocimiento y se fomenta el aprendizaje. ¿Te gustaría saber más sobre algún tema en particular relacionado con los campus o la formación?" },
        { patron: ["lenguajes", "enseñan"], respuesta: "Los centros de formación de programación suelen enseñar una variedad de lenguajes de programación, como Python, JavaScript, Java, C#, entre otros. ¿Hay algún lenguaje en específico del que te gustaría aprender más?" },
        { patron: ["te llamas"], respuesta: "¡Me llamo CampusLand Centro de Formación! ¿En qué puedo ayudarte hoy?" },
        { patron: ["aprender", "programación"], respuesta: "¡Aprender programación es una excelente decisión! Te abre las puertas a un mundo de posibilidades creativas y profesionales. ¿Hay algún lenguaje de programación en particular que te interese aprender?" },
        { patron: ["carrera", "tecnología"], respuesta: "La carrera en tecnología es emocionante y en constante evolución. Hay una amplia gama de roles y especialidades, desde desarrollo de software hasta ciberseguridad y análisis de datos. ¿Tienes algún área específica de interés?" },
        { patron: ["desarrollo", "web"], respuesta: "El desarrollo web es una habilidad muy demandada en la actualidad. Se necesitan conocimientos de HTML, CSS y JavaScript, entre otros, para crear sitios web interactivos y atractivos. ¿Te gustaría aprender más sobre este tema?" },
        { patron: ["cursos", "ofrecen"], respuesta: "Los centros de formación suelen ofrecer una variedad de cursos, desde cursos introductorios hasta programas de certificación en tecnologías específicas. ¿Hay algún curso en particular que te interese?" },
        { patron: ["experiencia", "enseñanza"], respuesta: "La experiencia de enseñanza en los campus puede ser muy enriquecedora tanto para los estudiantes como para los instructores. ¿Tienes alguna experiencia personal que te gustaría compartir?" },
        { patron: "clima", respuesta: "El clima está soleado hoy." },
        { patron: "hora", respuesta: "Son las " + new Date().toLocaleTimeString() + "." },
        { patron: ["hola", "buenos días", "buenas tardes"], respuesta: "¡Hola! ¿Cómo estás?" },
        { patron: ["gracias", "agradecido"], respuesta: "¡De nada! Estoy aquí para ayudar." },
        { patron: ["adios", "despedida"], respuesta: "¡Hasta luego! Que tengas un buen día." },
        { patron: "comida", respuesta: "¡Me encanta hablar sobre comida! ¿Hay algo en particular que te gustaría saber?" },
        { patron: ["cansado", "fatigado"], respuesta: "Lamento escuchar eso. Asegúrate de descansar lo suficiente y cuidarte bien." },
        { patron: "trabajo", respuesta: "¿Cómo te está yendo en el trabajo? ¿Necesitas algún consejo?" },
        { patron: ["feliz", "contento"], respuesta: "¡Me alegra escuchar que estás feliz! ¿Hay algo en lo que pueda ayudarte?" },
        { patron: ["triste", "deprimido"], respuesta: "Lo siento mucho. ¿Quieres hablar sobre ello?" },
        { patron: ["amor", "enamorado"], respuesta: "¡El amor es hermoso! ¿Hay algo específico sobre lo que quieras hablar?" },
        { patron: ["divertido", "entretenido"], respuesta: "¡Eso suena divertido! ¿Qué es lo que te divierte?" },
        { patron: "música", respuesta: "¡La música es increíble! ¿Tienes algún género favorito?" },
        { patron: ["salud", "bienestar"], respuesta: "La salud es importante. ¿Hay algo en particular que te preocupe?" },
        { patron: ["viaje", "vacaciones"], respuesta: "¡Los viajes son emocionantes! ¿Tienes algún destino en mente?" },
        { patron: ["lectura", "libro"], respuesta: "¡Los libros son una gran fuente de conocimiento! ¿Hay algún género que prefieras?" },
        { patron: ["aprender", "conocimiento"], respuesta: "Aprender cosas nuevas es emocionante. ¿Hay algo en lo que estés interesado en aprender?" },
        { patron: ["ejercicio", "entrenamiento"], respuesta: "¡El ejercicio es importante para mantenerse saludable! ¿Tienes alguna rutina de ejercicios?" },
        { patron: ["tecnología", "innovación"], respuesta: "La tecnología avanza rápidamente. ¿Hay algún avance tecnológico que te llame la atención?" },
        { patron: ["arte", "creatividad"], respuesta: "El arte es una forma maravillosa de expresión. ¿Tienes alguna forma de arte favorita?" },
        { patron: ["animales", "mascotas"], respuesta: "¡Los animales son adorables! ¿Tienes alguna mascota?" },
        { patron: ["familia", "amigos"], respuesta: "La familia y los amigos son fundamentales. ¿Hay algo que quieras compartir sobre ellos?" },
        { patron: ["videojuegos", "juegos"], respuesta: "Los videojuegos son una forma divertida de pasar el tiempo. ¿Tienes algún juego favorito?" },
        { patron: ["series", "películas"], respuesta: "¡Las series y películas son geniales para relajarse! ¿Tienes algún género favorito?" },
        { patron: ["noticias", "actualidad"], respuesta: "Estar al tanto de las noticias es importante. ¿Hay algún tema que te interese en particular?" },
        { patron: ["humor", "chiste"], respuesta: "¡Me encanta el buen humor! ¿Tienes algún chiste para compartir?" },
        { patron: ["compras", "tiendas"], respuesta: "Ir de compras es divertido. ¿Hay algo que estés buscando?" },
        { patron: ["hambre", "comida"], respuesta: "¡Hmm, suena delicioso! ¿Tienes algún antojo en particular?" },
        { patron: ["sed", "bebida"], respuesta: "Es importante mantenerse hidratado. ¿Qué te gustaría beber?" },
        { patron: ["sueño", "dormir"], respuesta: "El descanso es crucial para la salud. ¿Has tenido suficiente descanso?" },
        { patron: ["cine", "teatro"], respuesta: "Ir al cine o al teatro es una experiencia única. ¿Hay alguna película o obra que te gustaría ver?" },
        { patron: ["tráfico", "transporte"], respuesta: "El tráfico puede ser estresante. ¿Cómo ha sido tu viaje?" },
        { patron: ["deporte", "ejercicio"], respuesta: "¡El deporte es una excelente forma de mantenerse activo! ¿Practicas algún deporte?" },
        { patron: ["educación", "estudios"], respuesta: "La educación es clave para el crecimiento personal. ¿Estás estudiando algo en particular?" },
        { patron: ["clase", "escuela"], respuesta: "Las clases pueden ser desafiantes pero gratificantes. ¿Cómo te está yendo en la escuela?" },
        { patron: ["trabajo", "empleo"], respuesta: "El trabajo ocupa gran parte de nuestras vidas. ¿Te gusta lo que haces?" },
        { patron: ["dinero", "finanzas"], respuesta: "Las finanzas son importantes para la estabilidad. ¿Necesitas algún consejo financiero?" },
        { patron: ["tecnología", "gadgets"], respuesta: "¡Los gadgets tecnológicos son geniales! ¿Tienes algún gadget favorito?" },
        { patron: ["naturaleza", "aire libre"], respuesta: "Estar al aire libre es rejuvenecedor. ¿Tienes algún lugar natural favorito para visitar?" },
        { patron: ["pasatiempo", "hobby"], respuesta: "Los pasatiempos son una excelente manera de relajarse. ¿Cuál es tu pasatiempo favorito?" },
        { patron: ["religión", "espiritualidad"], respuesta: "La espiritualidad es importante para muchas personas. ¿Tienes alguna creencia religiosa?" },
        { patron: ["juegos de mesa", "juegos de cartas"], respuesta: "Los juegos de mesa y de cartas son divertidos para jugar con amigos y familiares. ¿Tienes algún favorito?" },
        { patron: ["aplicaciones", "software"], respuesta: "Las aplicaciones y el software hacen nuestras vidas más fáciles. ¿Tienes alguna aplicación favorita?" },
        { patron: ["medicina", "salud"], respuesta: "La medicina es fascinante. ¿Tienes alguna pregunta sobre salud o medicina?" },
        { patron: ["belleza", "maquillaje"], respuesta: "La belleza es diversa y emocionante. ¿Tienes algún consejo de belleza para compartir?" },
        { patron: ["moda", "estilo"], respuesta: "La moda es una forma de expresión. ¿Tienes algún estilo de moda favorito?" },
        { patron: ["ciencia ficción", "fantasía"], respuesta: "La ciencia ficción y la fantasía nos transportan a mundos imaginarios. ¿Tienes algún libro o película favorita?" },
        { patron: ["ciencia", "investigación"], respuesta: "La ciencia nos ayuda a comprender el mundo que nos rodea. ¿Hay algún campo científico que te interese?" },
        { patron: ["ambiente", "ecología"], respuesta: "El cuidado del medio ambiente es crucial. ¿Qué haces para ser más respetuoso con el medio ambiente?" },
        { patron: ["celebridad", "famoso"], respuesta: "Las celebridades y personas famosas son interesantes de seguir. ¿Tienes algún ídolo o modelo a seguir?" },
        { patron: ["política", "gobierno"], respuesta: "La política puede ser controvertida pero importante. ¿Tienes alguna opinión política que te gustaría compartir?" },
        { patron: ["boda", "matrimonio"], respuesta: "Las bodas son eventos especiales. ¿Hay algún detalle de planificación que te preocupe?" },
        { patron: ["emocionado", "entusiasmado"], respuesta: "¡Qué emocionante! ¿Qué te tiene tan entusiasmado?" },
        { patron: ["cine", "película"], respuesta: "El cine es una forma poderosa de contar historias. ¿Hay alguna película que te haya impresionado recientemente?" },
        { patron: ["arte", "pintura"], respuesta: "El arte es inspirador. ¿Tienes alguna pintura favorita?" },
        { patron: ["poesía", "verso"], respuesta: "La poesía es hermosa y evocadora. ¿Tienes algún poema favorito?" },
        { patron: ["viaje", "turismo"], respuesta: "Viajar es una aventura emocionante. ¿Tienes algún destino de viaje soñado?" },
        { patron: ["ciudad", "urbano"], respuesta: "La vida en la ciudad es vibrante. ¿Qué es lo que más te gusta de vivir en la ciudad?" },
        { patron: ["campo", "rural"], respuesta: "La vida en el campo es tranquila y pacífica. ¿Hay algún lugar rural que te guste visitar?" },
        { patron: ["playa", "costa"], respuesta: "La playa es un lugar relajante. ¿Tienes algún recuerdo especial de la playa?" },
        { patron: ["montaña", "senderismo"], respuesta: "La montaña ofrece vistas impresionantes. ¿Has hecho alguna caminata recientemente?" },
        { patron: ["gimnasio", "entrenamiento"], respuesta: "El gimnasio es ideal para mantenerse en forma. ¿Tienes alguna rutina de ejercicios favorita?" },
        { patron: ["yoga", "meditación"], respuesta: "El yoga y la meditación son excelentes para el bienestar. ¿Practicas alguna de estas disciplinas?" },
        { patron: ["spa", "relax"], respuesta: "¡El spa es perfecto para relajarse y rejuvenecer! ¿Tienes algún tratamiento favorito?" },
        { patron: ["jardinería", "plantas"], respuesta: "La jardinería es terapéutica. ¿Tienes un jardín o plantas en casa?" },
        { patron: ["cocina", "recetas"], respuesta: "Cocinar es una forma creativa de preparar alimentos. ¿Tienes alguna receta favorita?" },
        { patron: ["arte culinario", "gastronomía"], respuesta: "El arte culinario es apasionante. ¿Tienes algún plato o cocina favorita?" },
        { patron: ["arte", "museo"], respuesta: "Los museos son una fuente de inspiración. ¿Hay alguna exposición que te gustaría visitar?" },
        { patron: ["tecnología", "innovación"], respuesta: "La tecnología está en constante evolución. ¿Hay algún avance tecnológico que te haya impresionado recientemente?" },
        { patron: ["naturaleza", "paisaje"], respuesta: "La naturaleza es hermosa y diversa. ¿Hay algún paisaje natural que te haya dejado sin palabras?" },
        { patron: ["ciencia", "descubrimiento"], respuesta: "La ciencia nos revela los misterios del universo. ¿Hay algún descubrimiento científico que te haya fascinado?" },
        { patron: ["familia", "relaciones"], respuesta: "Las relaciones familiares son importantes para el bienestar emocional. ¿Cómo es tu relación con tu familia?" },
        { patron: ["amistad", "compañerismo"], respuesta: "La amistad es invaluable. ¿Tienes amigos cercanos con los que compartes momentos especiales?" },
        { patron: ["educación", "aprendizaje"], respuesta: "La educación es fundamental para el crecimiento personal. ¿Hay algo que te gustaría aprender?" },
        { patron: ["carrera", "profesión"], respuesta: "La elección de carrera es importante. ¿Estás satisfecho con tu carrera actual?" },
        { patron: ["finanzas", "ahorro"], respuesta: "Las finanzas personales son clave para la estabilidad económica. ¿Tienes algún consejo de ahorro que quieras compartir?" },
        { patron: ["tecnología", "dispositivos"], respuesta: "Los dispositivos tecnológicos son parte de nuestra vida diaria. ¿Tienes algún dispositivo favorito?" },
        { patron: ["medicina", "salud"], respuesta: "La salud es invaluable. ¿Qué haces para mantener un estilo de vida saludable?" },
        { patron: ["belleza", "cuidado personal"], respuesta: "El cuidado personal es importante para sentirse bien consigo mismo. ¿Tienes alguna rutina de belleza que te guste?" },
        { patron: ["moda", "tendencias"], respuesta: "La moda refleja nuestra personalidad. ¿Sigues alguna tendencia de moda?" },
        { patron: ["ciencia ficción", "futurismo"], respuesta: "La ciencia ficción nos hace reflexionar sobre el futuro. ¿Tienes alguna visión del futuro que te parezca interesante?" },
        { patron: ["ciencia", "experimento"], respuesta: "Los experimentos científicos nos ayudan a entender el mundo que nos rodea. ¿Has realizado algún experimento interesante recientemente?" },
        { patron: ["política", "partidos políticos"], respuesta: "La política es parte de nuestra sociedad. ¿Cuál es tu opinión sobre los diferentes partidos políticos?" },
        { patron: ["boda", "planificación de bodas"], respuesta: "La planificación de bodas es emocionante. ¿Cómo va la planificación de tu boda?" },
        { patron: ["felicidad", "alegría"], respuesta: "La felicidad es contagiosa. ¿Qué te hace sentir feliz?" },
        { patron: ["dolor", "tristeza"], respuesta: "El dolor y la tristeza son parte de la vida. ¿Cómo manejas tus emociones cuando te sientes triste?" },
        { patron: ["amor", "romance"], respuesta: "El amor es hermoso. ¿Tienes alguna historia de amor que quieras compartir?" },
        { patron: ["risa", "humor"], respuesta: "La risa es el mejor remedio. ¿Tienes algún chiste que te haga reír?" },
        { patron: ["compras", "consumismo"], respuesta: "El consumismo puede ser adictivo. ¿Cómo controlas tus hábitos de compra?" },
        { patron: ["hambre", "apetito"], respuesta: "El hambre es una sensación común. ¿Qué te gusta comer cuando tienes hambre?" },
        { patron: ["sed", "bebida"], respuesta: "La sed es una señal de que necesitas hidratarte. ¿Cuál es tu bebida favorita?" },
        { patron: ["sueño", "descanso"], respuesta: "El sueño es reparador. ¿Tienes alguna rutina antes de ir a dormir?" },
        { patron: ["cine", "película"], respuesta: "El cine es una forma de arte. ¿Tienes alguna película favorita que te gustaría recomendar?" },
        { patron: ["pintura", "arte"], respuesta: "La pintura es una expresión creativa. ¿Tienes algún pintor favorito?" },
        { patron: ["poesía", "verso"], respuesta: "La poesía es un medio de expresión emocional. ¿Tienes algún poema favorito?" },
        { patron: ["viaje", "destino"], respuesta: "Viajar amplía nuestros horizontes. ¿Cuál es tu destino de viaje soñado?" },
        { patron: ["ciudad", "urbano"], respuesta: "La vida en la ciudad es dinámica. ¿Qué es lo que más te gusta de vivir en la ciudad?" },
        { patron: ["campo", "rural"], respuesta: "La vida en el campo es tranquila. ¿Te gusta la vida rural?" },
        { patron: ["playa", "costa"], respuesta: "La playa es un lugar relajante. ¿Cuál es tu playa favorita?" },
        { patron: ["montaña", "senderismo"], respuesta: "La montaña ofrece vistas impresionantes. ¿Tienes alguna experiencia de senderismo que te haya marcado?" },
        { patron: ["gimnasio", "entrenamiento"], respuesta: "El gimnasio es ideal para mantenerse en forma. ¿Cuál es tu rutina de entrenamiento?" },
        { patron: ["yoga", "meditación"], respuesta: "El yoga y la meditación son beneficiosos para la mente y el cuerpo. ¿Practicas alguna de estas disciplinas?" },
        { patron: ["spa", "relax"], respuesta: "El spa es perfecto para desconectar y relajarse. ¿Has visitado algún spa recientemente?" },
        { patron: ["jardinería", "plantas"], respuesta: "La jardinería es terapéutica. ¿Tienes un jardín en casa?" },
        { patron: ["cocina", "recetas"], respuesta: "La cocina es un arte. ¿Cuál es tu receta favorita para cocinar?" },
        { patron: ["arte culinario", "gastronomía"], respuesta: "La gastronomía es una parte importante de la cultura. ¿Tienes algún plato favorito?" },
        { patron: ["arte", "museo"], respuesta: "Los museos son una fuente de inspiración. ¿Te gustaría visitar algún museo próximamente?" },
        { patron: ["tecnología", "innovación"], respuesta: "La tecnología avanza rápidamente. ¿Qué avance tecnológico te sorprende más?" },
        { patron: ["naturaleza", "paisaje"], respuesta: "La naturaleza es impresionante. ¿Cuál es tu paisaje natural favorito?" },
        { patron: ["ciencia", "experimento"], respuesta: "Los experimentos científicos nos ayudan a entender el mundo. ¿Tienes alguna curiosidad científica?" },
        { patron: ["política", "gobierno"], respuesta: "La política es un tema importante. ¿Cuál es tu opinión sobre el gobierno actual?" },
        { patron: ["boda", "matrimonio"], respuesta: "Las bodas son eventos especiales. ¿Estás planeando una boda?" },
        { patron: ["felicidad", "alegría"], respuesta: "La felicidad es contagiosa. ¿Qué te hace feliz?" },
        { patron: "tecnología", respuesta: "La tecnología está en constante evolución. ¿Hay algún aspecto específico que te interese?" },
        { patron: "innovación", respuesta: "La innovación impulsa el progreso. ¿Hay alguna innovación reciente que te haya llamado la atención?" },
        { patron: ["inteligencia artificial", "IA"], respuesta: "La inteligencia artificial está transformando diversas industrias. ¿Tienes alguna pregunta sobre IA?" },
        { patron: ["big data", "datos masivos"], respuesta: "El análisis de datos masivos permite obtener información valiosa. ¿Qué te gustaría saber sobre el big data?" },
        { patron: ["ciberseguridad", "seguridad informática"], respuesta: "La ciberseguridad es fundamental en la era digital. ¿Cómo proteges tus datos en línea?" },
        { patron: ["blockchain", "cadena de bloques"], respuesta: "La tecnología blockchain ofrece transacciones seguras y transparentes. ¿Qué opinas sobre esta tecnología?" },
        { patron: ["realidad aumentada", "RA"], respuesta: "La realidad aumentada mejora nuestra experiencia en el mundo real. ¿Has probado alguna aplicación de RA?" },
        { patron: ["realidad virtual", "RV"], respuesta: "La realidad virtual nos sumerge en entornos virtuales. ¿Has experimentado la RV alguna vez?" },
        { patron: ["criptomonedas", "bitcoin"], respuesta: "Las criptomonedas están cambiando la forma en que entendemos el dinero. ¿Qué piensas sobre el futuro de las criptomonedas?" },
        { patron: ["privacidad en línea", "datos personales"], respuesta: "La privacidad en línea es crucial para proteger nuestros datos personales. ¿Cómo proteges tu privacidad en línea?" },
        { patron: ["psicología", "mente"], respuesta: "La psicología nos ayuda a entender la mente humana. ¿Hay algún aspecto de la psicología que te interese?" },
        { patron: ["emociones", "sentimientos"], respuesta: "Las emociones y los sentimientos son parte de nuestra experiencia humana. ¿Cómo manejas tus emociones?" },
        { patron: ["autoestima", "confianza"], respuesta: "La autoestima y la confianza en uno mismo son importantes para el bienestar emocional. ¿Cómo trabajas en tu autoestima?" },
        { patron: ["motivación", "metas"], respuesta: "La motivación nos impulsa a alcanzar nuestras metas. ¿Cómo te mantienes motivado?" },
        { patron: ["estrés", "ansiedad"], respuesta: "El estrés y la ansiedad son desafíos comunes en la vida moderna. ¿Cómo manejas el estrés?" },
        { patron: ["depresión", "tristeza"], respuesta: "La depresión es una enfermedad mental seria. ¿Conoces alguna estrategia para lidiar con la depresión?" },
        { patron: ["terapia", "apoyo emocional"], respuesta: "La terapia ofrece un espacio seguro para explorar nuestras emociones. ¿Has considerado la terapia alguna vez?" },
        { patron: ["adicción", "dependencia"], respuesta: "Las adicciones pueden tener un impacto negativo en nuestra vida. ¿Cómo puedes ayudar a alguien que lucha con una adicción?" },
        { patron: ["ética", "moral"], respuesta: "La ética y la moral son fundamentales en cualquier sociedad. ¿Tienes alguna pregunta sobre ética o moralidad?" },
        { patron: ["privacidad", "protección de datos"], respuesta: "La protección de la privacidad es un derecho fundamental. ¿Qué medidas crees que deberían tomarse para proteger la privacidad en línea?" },
        { patron: ["derechos humanos", "libertades"], respuesta: "Los derechos humanos son universales. ¿Cómo podemos asegurarnos de proteger los derechos humanos en un mundo cada vez más digitalizado?" },
        { patron: ["responsabilidad", "ética profesional"], respuesta: "La responsabilidad y la ética son importantes en todos los campos profesionales. ¿Cómo puedes promover la ética en tu trabajo?" },
        { patron: ["sostenibilidad", "medio ambiente"], respuesta: "La sostenibilidad es crucial para el futuro de nuestro planeta. ¿Qué acciones tomas para vivir de manera más sostenible?" },
        { patron: ["inteligencia emocional", "autoconocimiento"], respuesta: "La inteligencia emocional es importante para comprender y manejar nuestras emociones. ¿Cómo practicas la inteligencia emocional en tu vida diaria?" },
        { patron: ["resiliencia", "superación"], respuesta: "La resiliencia nos ayuda a superar los desafíos de la vida. ¿Cómo cultivas la resiliencia en ti mismo?" },
        { patron: ["autocontrol", "gestión emocional"], respuesta: "El autocontrol es crucial para mantener el equilibrio emocional. ¿Qué estrategias utilizas para gestionar tus emociones?" },
        { patron: ["empatía", "compasión"], respuesta: "La empatía nos permite comprender y compartir los sentimientos de los demás. ¿Cómo practicas la empatía en tus relaciones?" },
        { patron: ["psicoterapia", "tratamiento psicológico"], respuesta: "La psicoterapia es un proceso de exploración y crecimiento personal. ¿Has considerado la psicoterapia como opción de tratamiento?" },
        { patron: ["fobias", "miedos"], respuesta: "Las fobias son miedos irracionales que pueden afectar nuestra vida diaria. ¿Cómo enfrentas tus miedos?" },
        { patron: ["autoestima", "aceptación personal"], respuesta: "La autoestima es fundamental para sentirnos seguros y satisfechos con nosotros mismos. ¿Qué haces para fortalecer tu autoestima?" },
        { patron: ["psicología positiva", "bienestar"], respuesta: "La psicología positiva se centra en cultivar emociones positivas y fortalecer el bienestar mental. ¿Cómo integras la psicología positiva en tu vida?" },
        { patron: ["mindfulness", "atención plena"], respuesta: "La atención plena nos ayuda a estar presentes en el momento actual. ¿Cómo practicas la atención plena en tu vida diaria?" },
        { patron: ["trastornos alimenticios", "anorexia"], respuesta: "Los trastornos alimenticios son enfermedades graves que requieren tratamiento profesional. ¿Conoces los signos y síntomas de la anorexia?" },
        { patron: ["trastorno obsesivo compulsivo", "TOC"], respuesta: "El trastorno obsesivo compulsivo es un trastorno de ansiedad que se caracteriza por pensamientos obsesivos y comportamientos compulsivos. ¿Has buscado ayuda para el TOC?" },
        { patron: ["trastorno bipolar", "manía"], respuesta: "El trastorno bipolar es una enfermedad mental que se caracteriza por cambios extremos de humor. ¿Cómo afecta el trastorno bipolar tu vida?" },
        { patron: ["trastorno por déficit de atención", "TDAH"], respuesta: "El trastorno por déficit de atención con hiperactividad afecta la capacidad de atención y el control de los impulsos. ¿Cómo manejas el TDAH en tu vida diaria?" },
        { patron: ["autismo", "espectro autista"], respuesta: "El autismo es un trastorno del desarrollo que afecta la comunicación y la interacción social. ¿Cómo apoyas a las personas en el espectro autista?" },
        { patron: ["esquizofrenia", "alucinaciones"], respuesta: "La esquizofrenia es un trastorno mental grave que puede causar alucinaciones y delirios. ¿Conoces a alguien que viva con esquizofrenia?" },
        { patron: ["trastorno de estrés postraumático", "TEPT"], respuesta: "El trastorno de estrés postraumático es una reacción a un evento traumático. ¿Cómo afecta el TEPT tu vida cotidiana?" },
        { patron: ["trastornos de la personalidad", "borderline"], respuesta: "Los trastornos de la personalidad afectan la forma en que percibimos el mundo y nos relacionamos con los demás. ¿Cómo afecta el trastorno límite de la personalidad tu vida?" },
        { patron: ["adicción a las redes sociales", "dependencia digital"], respuesta: "La adicción a las redes sociales puede afectar negativamente nuestra salud mental y bienestar. ¿Cómo manejas tu tiempo en las redes sociales?" },
        { patron: ["adicción al trabajo", "workaholism"], respuesta: "La adicción al trabajo puede causar estrés y agotamiento. ¿Cómo encuentras un equilibrio entre el trabajo y la vida personal?" },
        { patron: ["adicción al juego", "ludopatía"], respuesta: "La ludopatía es un trastorno adictivo que afecta la vida personal y financiera. ¿Cómo buscas ayuda para la ludopatía?" },
        { patron: ["adicción a las drogas", "drogadicción"], respuesta: "La adicción a las drogas es una enfermedad crónica que requiere tratamiento profesional. ¿Cómo afecta la drogadicción a tu vida?" },
        { patron: ["adicción al alcohol", "alcoholismo"], respuesta: "El alcoholismo es una enfermedad grave que puede causar problemas de salud y sociales. ¿Cómo buscas apoyo para superar el alcoholismo?" },
        { patron: ["bullying", "acoso escolar"], respuesta: "El bullying puede tener un impacto devastador en la vida de los afectados. ¿Cómo podemos prevenir el acoso escolar?" },
        { patron: ["abuso emocional", "maltrato psicológico"], respuesta: "El abuso emocional puede dejar cicatrices invisibles en las víctimas. ¿Cómo podemos apoyar a quienes han experimentado abuso emocional?" },
        { patron: ["violencia doméstica", "abusos"], respuesta: "La violencia doméstica es un problema grave que afecta a personas de todas las edades y géneros. ¿Cómo podemos crear conciencia sobre la violencia doméstica?" },
        { patron: ["discriminación", "prejuicio"], respuesta: "La discriminación y el prejuicio son injustos y dañinos. ¿Qué podemos hacer para promover la igualdad y la inclusión?" },
        { patron: ["derechos humanos", "libertades"], respuesta: "Los derechos humanos son fundamentales para una sociedad justa y equitativa. ¿Cómo podemos defender los derechos humanos en todo el mundo?" },
        { patron: ["corrupción", "fraude"], respuesta: "La corrupción socava la confianza en las instituciones y perjudica a la sociedad en su conjunto. ¿Qué medidas podemos tomar para combatir la corrupción?" },
        { patron: ["ética empresarial", "responsabilidad social"], respuesta: "La ética empresarial y la responsabilidad social son fundamentales para el éxito a largo plazo de una empresa. ¿Cómo pueden las empresas ser más éticas y socialmente responsables?" },
        { patron: ["justicia social", "equidad"], respuesta: "La justicia social busca garantizar que todas las personas tengan igualdad de oportunidades y acceso a recursos. ¿Qué podemos hacer para promover la justicia social en nuestra comunidad?" },
        { patron: ["diversidad cultural", "inclusión"], respuesta: "La diversidad cultural enriquece nuestras comunidades y promueve el entendimiento mutuo. ¿Cómo podemos celebrar y respetar la diversidad cultural?" },
        { patron: ["cambio climático", "calentamiento global"], respuesta: "El cambio climático es uno de los mayores desafíos de nuestro tiempo. ¿Qué acciones individuales y colectivas podemos tomar para mitigar el cambio climático?" },
        { patron: ["conservación", "biodiversidad"], respuesta: "La conservación de la biodiversidad es esencial para mantener los ecosistemas saludables. ¿Cómo puedes contribuir a la conservación de la biodiversidad?" },
        { patron: ["energías renovables", "sostenibilidad energética"], respuesta: "Las energías renovables son clave para reducir nuestra dependencia de los combustibles fósiles y mitigar el cambio climático. ¿Cómo puedes apoyar el uso de energías renovables?" },
        { patron: ["contaminación", "calidad del aire"], respuesta: "La contaminación del aire afecta la salud de millones de personas en todo el mundo. ¿Qué medidas puedes tomar para reducir la contaminación del aire?" },
        { patron: ["agua potable", "acceso al agua"], respuesta: "El acceso al agua potable es un derecho humano fundamental. ¿Qué podemos hacer para garantizar que todas las personas tengan acceso a agua limpia y segura?" },
        { patron: ["gestión de residuos", "reciclaje"], respuesta: "La gestión adecuada de los residuos es crucial para proteger el medio ambiente y conservar los recursos naturales. ¿Cómo puedes reducir tu huella de residuos y fomentar el reciclaje?" },
        { patron: ["educación ambiental", "conciencia ecológica"], respuesta: "La educación ambiental es clave para crear una sociedad más sostenible. ¿Cómo puedes promover la conciencia ecológica en tu comunidad?" },
        { patron: ["bienestar animal", "derechos de los animales"], respuesta: "El bienestar animal es una preocupación ética importante. ¿Qué acciones puedes tomar para promover el respeto y la protección de los derechos de los animales?" },
        { patron: ["consumo responsable", "compras sostenibles"], respuesta: "El consumo responsable implica tomar decisiones informadas y éticas sobre lo que compramos y consumimos. ¿Cómo puedes practicar el consumo responsable en tu vida diaria?" },
        { patron: ["turismo sostenible", "viajes responsables"], respuesta: "El turismo sostenible promueve la conservación del medio ambiente y el bienestar de las comunidades locales. ¿Cómo puedes ser un turista más responsable?" },
        { patron: ["comercio justo", "equidad económica"], respuesta: "El comercio justo busca garantizar condiciones laborales justas y salarios dignos para los trabajadores en todo el mundo. ¿Cómo puedes apoyar el comercio justo?" },
        { patron: ["ética médica", "derechos del paciente"], respuesta: "La ética médica es fundamental para garantizar la calidad y la integridad en la atención médica. ¿Qué aspectos de la ética médica te interesan?" },
        { patron: ["investigación científica", "ética de la investigación"], respuesta: "La ética de la investigación garantiza la integridad y el respeto en la realización de estudios científicos. ¿Cómo puedes promover la ética en la investigación científica?" },
        { patron: ["tecnología", "privacidad de datos"], respuesta: "La privacidad de datos es un tema importante en la era digital. ¿Cómo puedes proteger tu privacidad en línea?" },
        { patron: ["tecnología", "ética de la inteligencia artificial"], respuesta: "La ética de la inteligencia artificial es fundamental para garantizar que las tecnologías sean utilizadas de manera responsable y justa. ¿Qué principios éticos crees que deberían guiar el desarrollo y uso de la IA?" },
        { patron: ["tecnología", "seguridad cibernética"], respuesta: "La seguridad cibernética es crucial en un mundo digitalizado. ¿Qué medidas tomas para protegerte contra las amenazas cibernéticas?" },
        { patron: ["tecnología", "ética en la ingeniería de software"], respuesta: "La ética en la ingeniería de software implica tomar decisiones responsables que consideren el impacto de la tecnología en la sociedad y el medio ambiente. ¿Qué aspectos de la ética en la ingeniería de software te interesan?" },
        { patron: ["tecnología", "acceso digital"], respuesta: "El acceso digital es fundamental para la inclusión y la equidad en la sociedad. ¿Qué podemos hacer para cerrar la brecha digital y garantizar que todos tengan acceso a la tecnología?" },
        { patron: ["tecnología", "huella de carbono digital"], respuesta: "La huella de carbono digital se refiere al impacto ambiental de nuestras actividades en línea. ¿Cómo puedes reducir tu huella de carbono digital?" },
        { patron: ["tecnología", "desigualdad digital"], respuesta: "La desigualdad digital se refiere a la brecha entre aquellos que tienen acceso a la tecnología y aquellos que no. ¿Qué acciones podemos tomar para reducir la desigualdad digital?" },
        { patron: ["tecnología", "ética en el desarrollo de aplicaciones móviles"], respuesta: "La ética en el desarrollo de aplicaciones móviles implica considerar el impacto social y ambiental de las aplicaciones. ¿Qué aspectos de la ética en el desarrollo de aplicaciones móviles te preocupan?" },
        { patron: ["tecnología", "ética en el uso de drones"], respuesta: "La ética en el uso de drones implica consideraciones sobre la privacidad, la seguridad y el impacto ambiental. ¿Qué principios éticos crees que deberían guiar el uso de drones?" },
        { patron: ["tecnología", "inteligencia artificial responsable"], respuesta: "La inteligencia artificial responsable implica desarrollar y utilizar tecnologías de IA de manera ética y transparente. ¿Qué medidas crees que deberían tomarse para promover la IA responsable?" },
        { patron: ["tecnología", "ética en la robótica"], respuesta: "La ética en la robótica implica consideraciones sobre el uso ético de robots en diversas aplicaciones. ¿Qué aspectos de la ética en la robótica te interesan?" },
        { patron: ["tecnología", "ética en la realidad virtual y aumentada"], respuesta: "La ética en la realidad virtual y aumentada implica considerar el impacto psicológico y social de estas tecnologías. ¿Qué preocupaciones éticas tienes sobre la realidad virtual y aumentada?" },
        { patron: ["tecnología", "derechos digitales"], respuesta: "Los derechos digitales son derechos fundamentales en la era digital. ¿Qué medidas crees que deberían tomarse para proteger los derechos digitales de las personas?" },
        { patron: ["tecnología", "ética en la inteligencia artificial en la atención médica"], respuesta: "La ética en la inteligencia artificial en la atención médica implica garantizar la precisión, la equidad y la privacidad en el uso de IA en el cuidado de la salud. ¿Qué principios éticos crees que deberían guiar el desarrollo y uso de la IA en la atención médica?" },
        { patron: ["tecnología", "privacidad en la Internet de las cosas"], respuesta: "La privacidad en la Internet de las cosas es importante para proteger nuestros datos en un mundo cada vez más conectado. ¿Qué preocupaciones tienes sobre la privacidad en la IoT?" },
        { patron: ["tecnología", "ética en la realidad aumentada y virtual"], respuesta: "La ética en la realidad aumentada y virtual implica considerar el impacto psicológico, social y ambiental de estas tecnologías emergentes. ¿Qué principios éticos crees que deberían guiar el desarrollo y uso de la realidad aumentada y virtual?" },
        { patron: ["tecnología", "derecho al olvido digital"], respuesta: "El derecho al olvido digital es importante para proteger nuestra privacidad en línea. ¿Cómo podemos garantizar el derecho al olvido digital en un mundo cada vez más digitalizado?" },
        { patron: ["tecnología", "ética en la inteligencia artificial en la toma de decisiones"], respuesta: "La ética en la inteligencia artificial en la toma de decisiones implica garantizar la equidad, la transparencia y la responsabilidad en los algoritmos de IA. ¿Qué medidas crees que deberían tomarse para promover la ética en este campo?" },
        { patron: ["tecnología", "ética en la biotecnología"], respuesta: "La ética en la biotecnología implica consideraciones sobre el uso ético de la ingeniería genética, la clonación y otras tecnologías biológicas. ¿Qué principios éticos crees que deberían guiar el desarrollo y uso de la biotecnología?" },
        { patron: ["tecnología", "ética en la realidad aumentada y virtual"], respuesta: "La ética en la realidad aumentada y virtual implica considerar el impacto psicológico, social y ambiental de estas tecnologías emergentes. ¿Qué preocupaciones éticas tienes sobre la realidad aumentada y virtual?" },
        { patron: ["tecnología", "ética en la inteligencia artificial en la toma de decisiones"], respuesta: "La ética en la inteligencia artificial en la toma de decisiones implica garantizar la equidad, la transparencia y la responsabilidad en los algoritmos de IA. ¿Qué principios éticos crees que deberían guiar el desarrollo y uso de la IA en este campo?" },
        { patron: ["tecnología", "ética en la biotecnología"], respuesta: "La ética en la biotecnología implica consideraciones sobre el uso ético de la ingeniería genética, la clonación y otras tecnologías biológicas. ¿Qué preocupaciones éticas tienes sobre la biotecnología?" },
        { patron: ["tecnología", "ética en la inteligencia artificial en la atención médica"], respuesta: "La ética en la inteligencia artificial en la atención médica implica garantizar la precisión, la equidad y la privacidad en el uso de IA en el cuidado de la salud. ¿Qué aspectos éticos crees que deberían tenerse en cuenta en el desarrollo y uso de la IA en la atención médica?" },
        { patron: ["tecnología", "ética en la inteligencia artificial en la atención médica"], respuesta: "La ética en la inteligencia artificial en la atención médica implica garantizar la precisión, la equidad y la privacidad en el uso de IA en el cuidado de la salud. ¿Qué aspectos éticos crees que deberían considerarse en el desarrollo y uso de la IA en la atención médica?" },
        { patron: ["tecnología", "privacidad en la Internet de las cosas"], respuesta: "La privacidad en la Internet de las cosas es importante para proteger nuestros datos en un mundo cada vez más conectado. ¿Qué medidas crees que deberían tomarse para proteger la privacidad en la IoT?" },
        { patron: ["tecnología", "privacidad en la Internet de las cosas"], respuesta: "La privacidad en la Internet de las cosas es crucial para proteger nuestros datos en un mundo cada vez más conectado. ¿Qué medidas crees que deberían tomarse para proteger la privacidad en la IoT?" },
        { patron: ["tecnología", "ética en la realidad aumentada y virtual"], respuesta: "La ética en la realidad aumentada y virtual implica considerar el impacto psicológico, social y ambiental de estas tecnologías emergentes. ¿Qué preocupaciones éticas tienes sobre la realidad aumentada y virtual?" },
        { patron: ["tecnología", "ética en la realidad aumentada y virtual"], respuesta: "La ética en la realidad aumentada y virtual implica considerar el impacto psicológico, social y ambiental de estas tecnologías emergentes. ¿Qué aspectos éticos crees que deberían tenerse en cuenta en el desarrollo y uso de la realidad aumentada y virtual?" },
        { patron: ["tecnología", "ética en la inteligencia artificial en la toma de decisiones"], respuesta: "La ética en la inteligencia artificial en la toma de decisiones implica garantizar la equidad, la transparencia y la responsabilidad en los algoritmos de IA. ¿Qué principios éticos crees que deberían guiar el desarrollo y uso de la IA en este campo?" },
        { patron: ["tecnología", "ética en la inteligencia artificial en la toma de decisiones"], respuesta: "La ética en la inteligencia artificial en la toma de decisiones implica garantizar la equidad, la transparencia y la responsabilidad en los algoritmos de IA. ¿Qué aspectos éticos crees que deberían tenerse en cuenta en el desarrollo y uso de la IA en este campo?" },
        { patron: ["tecnología", "ética en la biotecnología"], respuesta: "La ética en la biotecnología implica consideraciones sobre el uso ético de la ingeniería genética, la clonación y otras tecnologías biológicas. ¿Qué principios éticos crees que deberían guiar el desarrollo y uso de la biotecnología?" },
        { patron: ["tecnología", "ética en la biotecnología"], respuesta: "La ética en la biotecnología implica consideraciones sobre el uso ético de la ingeniería genética, la clonación y otras tecnologías biológicas. ¿Qué preocupaciones éticas tienes sobre la biotecnología?" },
        { patron: ["tecnología", "ética en la inteligencia artificial en la atención médica"], respuesta: "La ética en la inteligencia artificial en la atención médica implica garantizar la precisión, la equidad y la privacidad en el uso de IA en el cuidado de la salud. ¿Qué aspectos éticos crees que deberían considerarse en el desarrollo y uso de la IA en la atención médica?" },
        { patron: ["tecnología", "privacidad en la Internet de las cosas"], respuesta: "La privacidad en la Internet de las cosas es crucial para proteger nuestros datos en un mundo cada vez más conectado. ¿Qué medidas crees que deberían tomarse para proteger la privacidad en la IoT?" },
        { patron: ["tecnología", "ética en la realidad aumentada y virtual"], respuesta: "La ética en la realidad aumentada y virtual implica considerar el impacto psicológico, social y ambiental de estas tecnologías emergentes. ¿Qué preocupaciones éticas tienes sobre la realidad aumentada y virtual?" },
        { patron: ["tecnología", "ética en la realidad aumentada y virtual"], respuesta: "La ética en la realidad aumentada y virtual implica considerar el impacto psicológico, social y ambiental de estas tecnologías emergentes. ¿Qué aspectos éticos crees que deberían tenerse en cuenta en el desarrollo y uso de la realidad aumentada y virtual?" },
        { patron: ["tecnología", "ética en la inteligencia artificial en la toma de decisiones"], respuesta: "La ética en la inteligencia artificial en la toma de decisiones implica garantizar la equidad, la transparencia y la responsabilidad en los algoritmos de IA. ¿Qué principios éticos crees que deberían guiar el desarrollo y uso de la IA en este campo?" },
        { patron: ["tecnología", "ética en la inteligencia artificial en la toma de decisiones"], respuesta: "La ética en la inteligencia artificial en la toma de decisiones implica garantizar la equidad, la transparencia y la responsabilidad en los algoritmos de IA. ¿Qué aspectos éticos crees que deberían tenerse en cuenta en el desarrollo y uso de la IA en este campo?" },
        { patron: ["tecnología", "ética en la biotecnología"], respuesta: "La ética en la biotecnología implica consideraciones sobre el uso ético de la ingeniería genética, la clonación y otras tecnologías biológicas. ¿Qué principios éticos crees que deberían guiar el desarrollo y uso de la biotecnología?" },
        { patron: ["tecnología", "ética en la biotecnología"], respuesta: "La ética en la biotecnología implica consideraciones sobre el uso ético de la ingeniería genética, la clonación y otras tecnologías biológicas. ¿Qué preocupaciones éticas tienes sobre la biotecnología?" },
        { patron: ["tecnología", "ética en la inteligencia artificial en la atención médica"], respuesta: "La ética en la inteligencia artificial en la atención médica implica garantizar la precisión, la equidad y la privacidad en el uso de IA en el cuidado de la salud. ¿Qué aspectos éticos crees que deberían considerarse en el desarrollo y uso de la IA en la atención médica?" },
        { patron: ["tecnología", "privacidad en la Internet de las cosas"], respuesta: "La privacidad en la Internet de las cosas es crucial para proteger nuestros datos en un mundo cada vez más conectado. ¿Qué medidas crees que deberían tomarse para proteger la privacidad en la IoT?" },
        { patron: ["racismo", "discriminación racial"], respuesta: "El racismo y la discriminación racial son inaceptables. Todos merecen ser tratados con respeto y dignidad, independientemente de su raza u origen étnico." },
        { patron: ["sexismo", "discriminación de género"], respuesta: "El sexismo y la discriminación de género son contrarios a los principios de igualdad y justicia. Todas las personas merecen igualdad de oportunidades y trato justo, independientemente de su género." },
        { patron: ["homofobia", "discriminación por orientación sexual"], respuesta: "La homofobia y la discriminación por orientación sexual son injustas y perjudiciales. Todas las personas tienen derecho a amar y vivir su vida libremente, sin temor a la discriminación." },
        { patron: ["xenofobia", "discriminación contra extranjeros"], respuesta: "La xenofobia y la discriminación contra extranjeros son contrarias a los valores de la tolerancia y la diversidad. Debemos acoger a los extranjeros y tratarlos con respeto y compasión." },
        { patron: ["discapacidad", "discriminación por discapacidad"], respuesta: "La discriminación por discapacidad es injusta y limita las oportunidades de las personas con discapacidad. Todos merecen ser tratados con dignidad y tener igualdad de acceso." },
        { patron: ["edadismo", "discriminación por edad"], respuesta: "La discriminación por edad es perjudicial y socava la dignidad de las personas mayores. Todos merecen ser valorados independientemente de su edad." },
        { patron: ["inclusión", "equidad"], respuesta: "La inclusión y la equidad son fundamentales para una sociedad justa y solidaria. Debemos trabajar juntos para eliminar las barreras y promover la igualdad de oportunidades para todos." },
        { patron: ["justicia social", "equidad económica"], respuesta: "La justicia social y la equidad económica son esenciales para construir una sociedad más justa y equitativa. Debemos abordar las desigualdades y trabajar hacia un mundo donde todos puedan prosperar." },
        { patron: ["derechos humanos", "libertades civiles"], respuesta: "Los derechos humanos y las libertades civiles son fundamentales para la dignidad humana. Debemos defender y proteger los derechos de todas las personas en todo momento." },
        { patron: ["ética profesional", "responsabilidad profesional"], respuesta: "La ética profesional y la responsabilidad profesional son fundamentales para mantener la confianza y la integridad en todas las profesiones. Todos los profesionales deben adherirse a los más altos estándares éticos en su trabajo." },
        { patron: ["transparencia", "rendición de cuentas"], respuesta: "La transparencia y la rendición de cuentas son fundamentales para la buena gobernanza y la confianza pública. Los líderes y las instituciones deben ser transparentes en sus acciones y responsables ante el público." },
        { patron: ["sostenibilidad", "responsabilidad ambiental"], respuesta: "La sostenibilidad y la responsabilidad ambiental son esenciales para proteger nuestro planeta y asegurar un futuro sostenible para las generaciones futuras. Debemos tomar medidas para reducir nuestra huella ambiental y preservar los recursos naturales." },
        { patron: ["ética empresarial", "responsabilidad social corporativa"], respuesta: "La ética empresarial y la responsabilidad social corporativa son esenciales para construir empresas sostenibles y éticas. Las empresas deben considerar el impacto de sus acciones en la sociedad y el medio ambiente." },
        { patron: ["ética en la tecnología", "tecnología responsable"], respuesta: "La ética en la tecnología y la tecnología responsable son fundamentales para garantizar que la innovación tecnológica beneficie a la sociedad en su conjunto. Los desarrolladores y las empresas de tecnología deben considerar el impacto ético de sus productos y servicios." },
        { patron: ["ética en la inteligencia artificial", "inteligencia artificial ética"], respuesta: "La ética en la inteligencia artificial es fundamental para garantizar que los sistemas de IA sean justos, transparentes y responsables. Debemos desarrollar y utilizar la IA de manera ética y considerada." },
    
    
    ];
      
  
    var patronesNegativos = [
        "puta", "mierda", "idiota", "imbecil", "jodido", // Groserías comunes
        "nazi", "negro de mierda", "maricón", "retardado", // Insultos racistas u homofóbicos
        "odio", "negro", "marica", "puto", // Discursos de odio
        "hijueputa", "hijo de puta", "concha", "verga", "perra", // Groserías colombianas
        "malparido", "chimba", "gonorrea" // Groserías colombianas adicionales
        // Puedes agregar más patrones negativos aquí según sea necesario
    ];
      
  
    // Buscar patrones de groserías, racismo y discursos de odio
    for (var i = 0; i < patronesNegativos.length; i++) {
      if (texto.includes(patronesNegativos[i])) {
        // Si se encuentra un patrón negativo, devolver una respuesta indicando que no se puede generar texto
        messageContainer.innerHTML += `
        <div class="chat-message">
            <div class="flex items-end">
            <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div><span class="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                    Se Guardaron los Datos </br>
                    dispositivo_ID: ${device_id} </br>
                    Ip: ${ip} </br>
                    País: ${country} </br>
                    Fecha: ${new Date().toLocaleString()}
                </span></div>
            </div>
        </div>
        `
        return "Lo siento, no puedo generar texto debido a que tu mensaje contiene contenido inapropiado.";
      }
    }
  
    // Buscar un patrón que coincida con el texto del usuario
    for (var i = 0; i < patronesRespuestas.length; i++) {
      var patron = patronesRespuestas[i].patron;
      var respuesta = patronesRespuestas[i].respuesta;
  
      // Verificar si el texto del usuario contiene alguno de los patrones
      if (Array.isArray(patron)) {
        // Si el patrón es una lista de palabras, verifica si al menos una está presente en el texto
        for (var j = 0; j < patron.length; j++) {
          if (texto.includes(patron[j])) {
            return respuesta;
          }
        }
      } else {
        // Si el patrón es una sola palabra, verifica si está presente en el texto
        if (texto.includes(patron)) {
          return respuesta;
        }
      }
    }
  
    // Si no se encontró ningún patrón, devolver una respuesta predeterminada
    return "Lo siento, no entendí eso. ¿Puedes ser más específico?";
  }


