require('es6-promise').polyfill();
require('isomorphic-fetch');
require('dotenv').config()

// var http = require("https");
const express = require('express')
const app = express()
const port = 5000

const baseUrl = 'https://api.themoviedb.org/3'

const API_KEY = process.env.MDB_API_KEY

const jsonFetchHandler = (path) => async (params) => {
    let qs = ''
    if (params) {
        Object.keys(params).forEach(key => {
            qs = `${qs}&${key}=${params[key]}`
        })
    }
    const resp = await fetch(`${baseUrl}${path}?api_key=${API_KEY}${qs}`)
    if (!resp.ok) {
        console.log(resp)
        console.log('something went wrong')
    } else {
        console.log('it\'s working!')
        return await resp.json()
    }

}
const getPopular = jsonFetchHandler('/movie/popular')
const getByTitle = jsonFetchHandler('/search/movie')

app.get('/popular', async (req, res) => {
    const json = await getPopular()
    if (json) {
        res.status(200).json(json)
    } else {
        res.status(500).send('Oops')
        // we should do something to handle our error here
    }   
})

app.get('/search', async (req, res) => {
    const {query} = req
    const json = await getByTitle(query)
    if (json) {
        res.status(200).json(json)
    } else {
        res.status(500).send('Oops')
        // we should do something to handle our error here
    }
})

app.get('/movie/:id', async (req, res) => {
    const url = `/movie/${req.params.id}`
    const getDetails = jsonFetchHandler(url)
    const json = await getDetails()
    if (json) {
        res.status(200).json(json)
    } else {
        res.status(500).send('Oops')
        // we should do something to handle our error here
    }
})

// app.get('/movie/:id/images/', async (req, res) => {
//     var options = {
//         "method": "GET",
//         "hostname": "api.themoviedb.org",
//         "port": null,
//         "path": `/3/movie/${req.params.id}/images?language=en-US&api_key=${API_KEY}`,
//         "headers": {}
//     };

//     var req = http.request(options, function (res) {
//         var chunks = [];

//         res.on("data", function (chunk) {
//             chunks.push(chunk);
//         });

//         res.on("end", function () {
//             var body = Buffer.concat(chunks);
//             console.log(body.toString());
//         });
//     });

//     req.write("{}");
//     req.end();
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))