// Implementación de paquetes
const express = require('express');
const app = express();
const cors = require('cors');
const request = require('request');
const async = require('async');

// Puerto variable para que pueda usar el que ofrezca el servidor de almacenamiento o por defecto 3000
app.set('port', process.env.PORT || 3000);
// Levantamiento de servidor
app.listen(app.get('port'), () => {
  console.log('Server on port ', app.get('port'));
});

// Permite connexión entre dos servidores
app.use(cors({ origin: 'http://localhost:4200' }));

// Se definen claves para acceso a api rest publica
const apikey = '4e14ecb1fbb3b47726768e430a56b074';
const url = 'https://api.themoviedb.org/3';

// Endpoints para solicitud de peliculas
app.get('/popularity', (req, res) => {
  const popularity = `${url}/discover/movie?sort_by=popularity.desc&api_key=${apikey}&language=es`;
  async.times(1, (i, callback) => {
    request(popularity, (error, response, body) => {
      var result = JSON.parse(body);
      var data = result.results;
      callback(null, data);
    });
  }, (error, results) => {
    res.json(results);
  });
});

app.get('/billboard', (req, res) => {
  const billboard = `${url}/discover/movie?primary_release_date.gte=2019-03-01&primary_release_date.lte=2019-03-12&api_key=${apikey}&language=es`;
  async.times(1, (i, callback) => {
    request(billboard, (error, response, body) => {
      var result = JSON.parse(body);
      var data = result.results;
      callback(null, data);
    });
  }, (error, results) => {
    res.json(results);
  });
});

app.get('/bestrated', (req, res) => {
  const bestrated = `${url}/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=${apikey}&language=es`;
  async.times(1, (i, callback) => {
    request(bestrated, (error, response, body) => {
      var result = JSON.parse(body);
      var data = result.results;
      callback(null, data);
    });
  }, (error, results) => {
    res.json(results);
  });
});

app.get('/popularitychildren', (req, res) => {
  const popularitychildren = `${url}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${apikey}&language=es`;
  async.times(1, (i, callback) => {
    request(popularitychildren, (error, response, body) => {
      var result = JSON.parse(body);
      var data = result.results;
      callback(null, data);
    });
  }, (error, results) => {
    res.json(results);
  });
});

app.get('/bestyear', (req, res) => {
  const bestyear = `${url}/discover/movie?primary_release_year=2018&sort_by=vote_average.desc&api_key=${apikey}&language=es`;
  async.times(1, (i, callback) => {
    request(bestyear, (error, response, body) => {
      var result = JSON.parse(body);
      var data = result.results;
      callback(null, data);
    });
  }, (error, results) => {
    res.json(results);
  });
});

app.get('/drama', (req, res) => {
  const drama = `${url}/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=${apikey}&language=es`;
  async.times(1, (i, callback) => {
    request(drama, (error, response, body) => {
      var result = JSON.parse(body);
      var data = result.results;
      callback(null, data);
    });
  }, (error, results) => {
    res.json(results);
  });
});

app.get('/search/:id', (req, res) => {
  const movie = req.params.id;
  const searchMovie = `${url}/search/movie?query=${movie}&sort_by=popularity.desc&api_key=${apikey}&language=es`;
  async.times(1, (i, callback) => {
    request(searchMovie, (error, response, body) => {
      var result = JSON.parse(body);
      var data = result.results;
      callback(null, data);
    });
  }, (error, results) => {
    res.json(results);
  });
});
