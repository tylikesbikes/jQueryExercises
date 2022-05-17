let movies=[];
let movieID=0;

$('#movieRatingInput').on('input',function() {
    $('.ratingSliderValue').text($(this).val());
});

$('form').on('submit',function(event) {
    event.preventDefault();
    if (addFilmToTable()) {
        
        movies.push([movieID,$('#movieTitleInput').val(),$('#movieRatingInput').val()]);
        movieID++;
    };
    $('#movieTitleInput').val('');
});

function addFilmToTable() {
    const title = $('#movieTitleInput').val();
    const rating = $('#movieRatingInput').val();

    if(title.length < 2) return false;

    $('tbody').append(`<tr data-movieID="${movieID}"><td class="movieTitle" >${title}</td><td class="movieRating">${rating}</td><td class="deleteEntry">&#10006;</td></tr>`);

    $('.deleteEntry').eq(-1).on('click', function() {
        const movieID = $(this).parent().attr('data-movieID');
        movies = movies.filter((x)=>x[0]!=movieID);
        $(this).parent().remove();
        
    });
    return true;
}

$('.sortBtn').on('click', function(event) {
    makeSortedMovieTable(sortMovieTable(event.target.id,$('#sortDir').val()));
});

function sortMovieTable(field,direction='desc') {
    const moviesToSort=[];
    const moviesRearranged=[];
    if(field==='sortABC') {
        movies.forEach((x) => moviesToSort.push([x[1],x[0],x[2]]));

    } else if (field==='sort123') {
        movies.forEach((x) => moviesToSort.push([x[2],x[0],x[1]]));
    }

    if (direction==='asc') {
        moviesToSort.sort();
    } else if (direction==='desc') {
        moviesToSort.sort().reverse();
    }

    if(field==='sortABC') {
        moviesToSort.forEach((x) => moviesRearranged.push([x[1],x[0],x[2]]));
        return moviesRearranged;
    } else if(field==='sort123') {
        moviesToSort.forEach((x) => moviesRearranged.push([x[1],x[2],x[0]]));
        return moviesRearranged;
    }

}


function makeSortedMovieTable(movieArray) {
    $('#movieTableBody').html('');
    movieArray.forEach(function(mov) {
    $('#movieTableBody').append(`
        <tr data-movieID="${mov[0]}">
            <td class="movieTitle" >${mov[1]}</td>
            <td class="movieRating">${mov[2]}</td>
            <td class="deleteEntry">&#10006;</td>
        </tr>`);
    $('.deleteEntry').eq(-1).on('click', function() {
        const movieID = $(this).parent().attr('data-movieID');
        movies = movies.filter((x)=>x[0]!=movieID);
        $(this).parent().remove();
    });
    });

}