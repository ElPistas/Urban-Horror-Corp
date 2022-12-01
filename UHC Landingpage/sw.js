//Asignar un noombre y version a cache

const CACHE_NAME = 'v1_cache_UHC';


//Archivos a guardar
var urlsToCache=[

    './', //Todo el directorio actual
    './Estilos/Estilos.css',
    './Estilos/Estilo2.css',
    './jquery.js',
    './main.js',
    './sw.js',
    './img/Daniela.jpeg',
    './img/Dario.jpeg',
    './img/Luis.png',
    './img/Roberto.png',
    './img/facebook.svg',
    './img/twitter.svg',
    './img/Fantasma.png',
    './img/favicon-32x32.png',
    './img/LOGO.png',
    './img/Sangre.png',
    './img/maskable_icon_x128.png',
    './img/maskable_icon_x384.png',
    './img/maskable_icon_x512.png',
    './img/Menu.PNG',
    './img/p.PNG',
    './img/p1.PNG',
    './img/p3.PNG',
    './img/p4.PNG',
    './img/p5.PNG',
    './Maps.js'

];

//Evento install

self.addEventListener('install', e=>{
    e.waitUntil(//espera a que abra el cache
    caches.open(CACHE_NAME)//abrimos el cache, regresa una promesa
        .then(cache => {
                cache.addAll(urlsToCache)//Regresamos los elementos del arreglo
                .then(()=>{
                    self.skipWaiting();//Espera a que se llene el cache
                })

            })
            .catch(err =>{
                console.log('No se ha registrado el cache', err);
        })

        
    )
});

//Evento activate
//Este activa el SW y una vez que se active trabaje offline

self.addEventListener('activate', e =>{
    const cacheWhitelist = [CACHE_NAME] //Vamos a guardar todos los elementos que vienen del cache original
    //primero limpiamos el cache para quitar elementos que no se necesiten o sean redundantes

    e.waitUntil(
        caches.keys()//El keys lo que hace es recoger todos los elementos que hay del cache
        .then(cacheNames =>{
            return Promise.all(
                //Map() nos permite recorrer un array
                cacheNames.map(cacheName =>{
                    //indexOF es para buscar dentro del cache
                    //lo siguiente es buscar un elemento y si no se encuentra borrarlo de la cache o si es redundante

                    if(cacheWhitelist.indexOf(cacheName) === -1){
                        //Borrar elementos que no se necesitan
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        //Activar cache
        .then(() =>{
            self.clients.claim();// Activa la cache actual WitheList
        })
    )
});

//Evento fetch

self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)//Busca la informacion en el cache
        .then(res =>{
            if(res){
                //Si se encuentra en el cache
                //devuelvo los datos desde cache
                return res;
            }
            //En caso de que no se encuentre en el cache la recupero desde el servidor
            return fetch(e.request);
        })
    )
})

