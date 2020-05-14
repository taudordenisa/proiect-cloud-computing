# Documentație Aplicație Muzică

## Introducere
Conform unui articol al National Institute of Standards and Technology, Cloud Computing este un concept modern bazat pe virtualizare care furnizează servicii IaaS (Infrastructure as a Service), PaaS (Platform as a Service), SaaS (Software as a Service) prin Internet. Principalul său rol este de a permite accesul la rețeaua de comunicații omniprezente, convenabile și la cerere, la resurse de calcul configurabile (de exemplu: rețele, servere, stocare date, aplicații și servicii). Acestea pot fi rapid furnizate și lansate cu efort minim de management sau interacțiune cu furnizorii de servicii.

## Descriere problemă
Odată cu dezvoltarea Cloud Computing-ului, aplicațiile pentru gestiunea datelor au devenit din ce în ce mai populare. Scopul acestei aplicații este de a gestiona date din domeniul muzicii, astfel utilizatorul va putea înregistra informații despre melodii, le va putea modifica sau șterge. De asemenea, utilizatorul va avea posibilitatea căuta informații despre melodiile existente pe iTunes, de a le previzualiza și de a căuta versuri pentru diferite melodii, existente pe site-ul Lyrics.ovh.

## Descriere API
Un API REST este un Application Program Interface (API) care utilizează metode HTTP de request pentru a gestiona date: GET, POST, PUT, DELETE. API-ul pentru un website este reprezentat de un cod care permite comunicarea a două programe software. API precizează modul corect pentru un dezvoltator de a scrie un program care solicită servicii de la un sistem de operare sau o altă aplicație. Un RESTful API are la bază un REST (Representational State Transfer), care reprezintă o abordarea arhitecturală a comunicațiilor utilizate deseori în dezvoltarea serviciilor web.

#### iTunes Search API
API-ul iTunes Search permite căutarea de content în aplicațiile iTunes Store și Apple Books Store. Printre multiplele categorii de media ce pot fi aduse din iTunes, se numără și categoria muzică, utilizată în această aplicație.

Pentru interogarea aplicației iTunes Store, am pasat un URL request cu ajutorul librăriei axios, construind URL-ul sub forma "https://itunes.apple.com/search?parameterkeyvalue". În cazul acestei aplicații, *primarykeyvalue* este format din mai mulți parametri, și anume: *term*, *limit* și *media*.

Parametrul __*term*__ primește o valoare dintr-un câmp de *input text*, pe baza căreia va căuta melodii, verificând atât numele artistului, cât și denumirea melodiei. Parametrul __*limit*__ primește o valoarea dintr-un câmp *input* de tip *number*, care are limite între 1 și 100, acestea reprezentând numărul de rezultate întoarse de request. Având în vedere că aplicația își propune gestiunea melodiilor, parametrul __*media*__ este transmis cu valoarea *music*.

Răspunsul primit în urma interogării, are structura unui JSON (JavaScript Object Notation), datele dorite fiind găsite în lista *response.data.results*. Lista este parcursă, iar datele sunt puse într-un tag HTML de *table* pentru a fi afișate în pagină. În cazul în care nu se găsesc date pentru afișare, va fi întors mesajul "No items available! Please search for another song."

Funcția care preia informațiile din iTunes se numește __*dataPullITunes()*__ și este apelată în urma apăsării unui buton de Search. Funcția se găsește în fișierul *index.html*, din folder-ul *frontend*, sub tag-ul de *script*. Mai jos se observă codul acestei funcții.

```javascript
function dataPullITunes() {
    let searchValue = $('#searchValue').val()
    let resultsNumber = $('#resultsNumber').val()
    let urlEncoded = encodeURI("https://itunes.apple.com/search?term='" + searchValue + "'&limit=" + resultsNumber + "&media=music")
    axios.get(urlEncoded)
    .then(function(response) { 
        let htmlITunes = ` <table >
                <tr>
                    <th>Artist</th>
                    <th>Song Name</th>
                    <th>Collection</th>
                    <th>Country</th>
                    <th>Preview Song</th>
                </tr>`
                
        response.data.results.forEach(function(song) {
            htmlITunes += `<tr>
                        <td>${song.artistName}</td>
                        <td>${song.trackName}</td>
                        <td>${song.collectionName}</td>
                        <td>${song.country}</td>
                        <td>
                            <audio controls>
                                <source src="${song.previewUrl}" type="audio/mpeg">
                                Your browser does not support the audio element.
                            </audio>
                        </td>
                    </tr>`
        })
        
        htmlITunes += `</table>`
        
        $('#tableITunes').html(htmlITunes)
    })
    .catch(function(error) {
        console.log(error)
        $('#tableITunes').html(`<p>No items available! Please search for another song.</p>`)
    })
}
```

#### Lyrics.ovh API
API-ul Lyrics.ovh permite căutarea rapidă a versurilor unei melodii de pe website-ul [Lyrics.ovh](https://lyrics.ovh). Request-ul făcut prin intermediul API-ului este de tipul GET, iar URL-ul prin care se pot obține date din website este "https://api.lyrics.ovh/v1/artist/title". Valorile pentru __*artist*__ și __*title*__ sunt preluate din două câmpuri *input text*.

Rezultatul interogării este un JSON, datele fiind preluate din *response.request.responseText*. Acesta este un câmp de tip text care are, de asemenea, structura unui JSON. Prin utilizarea funcției *JSON.parse()*, textul este transformat în JSON, putând astfel accesa versurile melodiei, care ulterior sunt puse într-un tag de paragraf și afișate în pagină. În cazul în care nu se găsesc versuri pentru căutarea dorită, s va afișa în pagină un mesaj de eroare "No lyrics available! Please search for another song."

Funcția care preia informațiile din iTunes se numește __*dataPullLyrics()*__ și este apelată în urma apăsării unui buton de Search. Funcția se găsește în fișierul *index.html*, din folder-ul *frontend*, sub tag-ul de *script*. Mai jos se regăsește codul acestei funcții.

```javascript
function dataPullLyrics() {
    let artist = $('#artistLyrics').val()
    let title = $('#songLyrics').val()
    axios.get("https://api.lyrics.ovh/v1/" + artist + "/" + title)
    .then(function(response) { 
        let lyricsText = response.request.responseText
        let lyricsTextHtml = lyricsText.replace(/\\n/g, "<br/>")
        let lyricsJSON = JSON.parse(lyricsTextHtml)
        $('#showLyrics').html(`<p>${lyricsJSON.lyrics}</p>`)
    })
    .catch(function(error) {
        console.log(error)
        $('#showLyrics').html(`<p>No lyrics available! Please search for another song.</p>`)
    })
}
```

## Flux de date
Fluxul de date este realizat cu ajutorul metodelor de tip *request / response* și a metodelor de tip *HTTP request*.

#### Exemple de request / response
În aplicație s-au folosit metode de __request / response__ pentru a interoga și actualiza Baza de Date. Metodele primesc ca parametru un *request.body* și actualizează datele și returnează un rezultat prin intermediul parametrului *response*.

Exemplu de interogare date din Baza de Date:
```javascript
(request, response) => {
    Songs.findAll().then((results) => {
        response.status(200).json(results)
    })
}
```

Exemplu de inserare date în Baza de Date:
```javascript
(request, response) => {
    Songs.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
}
```

Exemplu de actualizare date din Baza de Date:
```javascript
(request, response) => {
    Songs.findByPk(request.params.id).then((name) => {
        if(name) {
            name.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
}
```

Exemplu de ștergere date din Baza de Date:
```javascript
(request, response) => {
    Songs.findByPk(request.params.id).then((name) => {
        if(name) {
            name.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
}
```

#### Metode HTTP
HTTP definește un set de metode request pentru a indica acțiunea dorită care trebuie efectuată pentru o anumită resursă. În aplicație au fost folosite metode __HTTP request__ de tipul __*GE*T__, __*POST*__, __*PUT*__ și __*DELETE*__, folosind librăria *axios*, pentru gestionarea datelor din Baza de Date și pentru colectarea datelor cu ajutorul API REST.

Exemplu de metodă HTTP request GET:
```javascript
axios.get('/songs').then(function(results) {
    let html = ` <table style="width:500px;">
            <tr>
                <th>ID</th>
                <th>Artist Name</th>
                <th>Album</th> 
                <th>Song Name</th>
                <th>Actions</th>
            </tr>`
    
    results.data.forEach(function(element) {
        html += `<tr>
                    <td>${element.id}</td>
                    <td>${element.singer}</td>
                    <td>${element.album}</td>
                    <td>${element.name}</td>
                    <td>
                        <button onClick="editSong(${element.id})">Edit</button>
                        <button onClick="deleteSong(${element.id})">Delete</button>
                    </td>
                </tr>`
    })

    html += `</table>`
    
    $('#table').html(html)
}).catch(function(error) {
    console.log(error)
})
```

Exemplu de metodă HTTP request POST:
```javascript
axios.post('/songs', {
    singer: singer,
    album: album,
    name: name
}).then(function(result) {
    showSongs()
    $(event.target).trigger("reset")
}).catch(function(err) {
    alert('Resource could not be saved')
})
```

Exemplu de metodă HTTP request PUT:
```javascript
axios.put('/songs/'+id, {
    singer: singer,
    album: album,
    name: name
}).then(function(result) {
    showSongs()
    $(event.target).trigger("reset")
}).catch(function(err) {
    alert('Resource could not be saved')
})
```

Exemplu de metodă HTTP request DELETE:
```javascript
axios.delete('/songs/'+id).then(function(result) {
    showSongs()
}).catch(function(error) {
    console.log(error)
    alert('Resource could not delete resource')
})
```

#### Autentificare servicii utilizate
Pentru accesarea Bazei de Date se folosește biblioteca __Sequelize__, orientată obiect de tip ORM (Object-Relational Mapping), care permite operațiile standard pe Baza de Date, anume Create, Read, Update și Delete. În fișierul *server.js* s-a instanțiat obiectul sequelize, parametrii din constructorii clasei reprezentând numele bazei de date, numele utilizatorului, parola și un obiect care conține date despre tipul bazei de date și adresa serverului, folosite pentru *autentificare* la baza de date.

```javascript
const sequelize = new Sequelize('music', 'taudordenisa', 'tdenisa5', {
    dialect: "mysql",
    host: "localhost"
})

sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Unable to connect to database")
})
```

## Capturi ecran aplicație
![Data Base](Data Base.PNG)
![iTunes](https://user-images.githubusercontent.com/65232551/81948104-0a9b2300-960a-11ea-97e3-2710e9bfc19d.PNG)

## Referințe
* [Cloud Computing - National Institute of Standards and Technology](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf)
* [iTunes Search API](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/)
* [Lyrics.ovh API](https://github.com/public-apis/public-apis)