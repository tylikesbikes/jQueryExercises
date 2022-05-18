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

// function sortMovieTable(field,direction='asc') {
//     const moviesToSort=[];
//     const moviesRearranged=[];
//     if(field==='sortABC') {
//         movies.forEach((x) => moviesToSort.push([x[1],x[0],x[2]]));

//     } else if (field==='sort123') {
//         movies.forEach((x) => moviesToSort.push([x[2],x[0],x[1]]));
//     }

//     if (direction==='asc') {
//         moviesToSort.sort();
//     } else if (direction==='desc') {
//         moviesToSort.sort().reverse();
//     }

//     if(field==='sortABC') {
//         moviesToSort.forEach((x) => moviesRearranged.push([x[1],x[0],x[2]]));
//         return moviesRearranged;
//     } else if(field==='sort123') {
//         moviesToSort.forEach((x) => moviesRearranged.push([x[1],x[2],x[0]]));
//         return moviesRearranged;
//     }
// }

//  const sampleMovies = [[0,'it','6.5'],[1,'point break','10'],[2,'Lion king','6'],[3,'amadeus','8'],[4,'parasite','8.5'],[5,'hunt for the wilderpeople','7.5']];

function sortMovieTable(field,direction='asc') {
    
    if(field==='sortABC') {
        const sortedMovies = movies.sort((a,b) => a[1].toLowerCase()>b[1].toLowerCase() ? 1 : -1);
        if (direction==='asc') {
            return sortedMovies;
        } else if (direction==='desc') {
            return sortedMovies.reverse();
        }
    }

    if(field==='sort123') {
        const sortedMovies = movies.sort((a,b) => +a[2]>+b[2] ? 1 : -1);
        if (direction==='asc') {
            return sortedMovies;
        } else if (direction==='desc') {
            return sortedMovies.reverse();
        }
    }

    return null; //error
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