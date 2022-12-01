if('serviceWorker' in navigator){
    console.log('Puedes usar el SW');
    navigator.serviceWorker.register('./sw.js')
            .then(res => console.log('Service worker ok', res))
            .catch(err => console.log('No hay Service worker',
            err));

}else{
    console.log('No puedes usar los Service worker')
}