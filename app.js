$(document).ready(function(){
    $('#searchForm').on('submit',(event)=>{
        //console.log($('#searchText').val());

        let serachText = $('#searchText').val();

        getMovies(serachText);
        event.preventDefault();
    });
});

// const axios = require('axios');

function getMovies(serachText){
    console.log(serachText);
    axios.get('http://www.omdbapi.com/?s='+serachText+'&apikey=d556b324')
    .then((response)=>{
        console.log(response);

        let movies = response.data.Search;
        let output = '';

if(movies.length==0){
    output+=`
    <h1>Opps! Movie Not found!!</h1>
    ` ;  
}

        $.each(movies,(index,movie)=>{
            output+=`
            <div class = "col-md-3">
                <div class="well text-center">
                    <img src = "${movie.Poster}">
                   <h5>${movie.Title}</h5> 
                   <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                </div>
            </div>
            ` ;    
        });

        $('#movies').html(output);
    })
    .catch((err)=>{
        console.log(err);
        

        $('#movies').html(output);
    });
}



function movieSelected(id){

    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    return false;
}


function getMovie(){
    let movieId = sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com/?i='+movieId+'&apikey=d556b324')
    .then((response)=>{
        console.log(response);

        let movie = response.data;

        let output = `
        <div class="row">
            <div class="col-md-6">
                <img src = "${movie.Poster}" class="thumbnail">
            </div>
            <hr>
            <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre: </strong>${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released: </strong>${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated: </strong>${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Ratings: </strong>${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer: </strong>${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors: </strong>${movie.Actors}</li>
                </ul>
            </div>
        </div>
            <div class="well">
            <hr>
                <h3>Plot</h3>
                ${movie.Plot}
                <hr>
                <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-default">Go Back To Homepage</a>
            </div>
        `

        $('#movies').html(output);
    })
    .catch((err)=>{
        console.log(err);
    });
}
//http://www.omdbapi.com/?i=tt3896198&apikey=d556b324