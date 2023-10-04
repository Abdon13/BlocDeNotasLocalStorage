//Varibales
const formulario = document.querySelector("#formulario");
const listaTewwts = document.querySelector("#lista-tweets");
let tweets = [];

//Even listeners
eventListeners()

function eventListeners(){
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener("submit",agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener("DOMContentLoaded",()=>{
        tweets= JSON.parse(localStorage.getItem("tweets") || [] );

        console.log(tweets);

        crearHTML();


    });
}



//funciones

function agregarTweet(e){
    e.preventDefault();
    
    //textarea donde el usuario escribe
    const tweet = document.querySelector("#tweet").value;

    //validacion
    if(tweet === ""){
        mostrarError("Un mensaje no puede ir vacio");

        return;//Evita que se sigan ejecutando lineas de codigo 
    }
    
    const tweetObj = {
        id: Date.now(),
        tweet
    }
    //Añadir al arreglo de tweets

    tweets = [... tweets, tweetObj];

    //Una vez agregado vamos a crear el html
    crearHTML();

    //reiniciar el formulario

    formulario.reset();
}

//mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement("p");
    mensajeError.textContent = error;
    mensajeError.classList.add("error");

    //Insertarlo en el contenido
    const contenido = document.querySelector("#contenido");
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos
    setTimeout(() =>{
        mensajeError.remove();
    },3000 );
}

function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach(tweet =>{
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement("a");
            btnEliminar.classList.add("borrar-tweet");
            btnEliminar.innerText = "X";

            //Añadir la funcion de elimar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            //Crear html
            const li = document.createElement("li");

            //añadir el texto
            li.innerText = tweet.tweet;

            //asiganar el boton
            li.appendChild(btnEliminar);

            //insertarlo en el html 
            listaTewwts.appendChild(li);

            
        })
    }

    sincronizarStorage();
}

//Agrega los tweets actuales a LocalStorage
function sincronizarStorage(){
    localStorage.setItem("tweets",JSON.stringify(tweets));
}

//Elima un tweet
function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}

//Limpiar el HTML
function limpiarHTML(){
    while(listaTewwts.firstChild){
        listaTewwts.removeChild(listaTewwts.firstChild);
    }
}