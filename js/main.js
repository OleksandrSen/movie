'use strict';

const API_KEY = '29bb47b7552ec502eb87cebfbc77f766';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

$(document).ready(function () {

    // events
    $('.search__btn').click(() => {
        getMovie()
    })

    $('.search__field').keypress((e) => {
        if (e.keyCode === 13)
            getMovie()
    })

    $('.reviews__close').click(() => {
        $('.window').addClass('hide')
        $('.review').remove()
    })

    // functions
    async function getMovie() {
        let query = $('.search__field').val()

        $('body').addClass('loading')

        if (query !== '') {
            $('.movie').remove()

            let url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`
            try {
                let response = await fetch(url)
                let res = await response.json()

                if (res.results.length === 0) {
                    alert('No movie')
                } else {
                    res.results.forEach((movie) => {
                        if (movie.poster_path !== null)
                            $('.movies').append(drawMovie(movie))
                        $('.movie').click(() => {
                            getReviews(movie.id)
                        })
                    })
                }
                $('body').removeClass('loading')
            } catch (e) {
                alert('error')
            }


            // $.ajax({
            //     url: `${API_URL}/search/movie`,
            //     type: 'GET',
            //     dataType: 'json',
            //     data: {
            //         api_key: API_KEY,
            //         query: query
            //     }
            // }).then((res) => {
            //     if (res.results.length === 0) {
            //         alert('No movie')
            //     } else {
            //         res.results.forEach((movie) => {
            //             if (movie.poster_path !== null)
            //                 $('.movies').append(drawMovie(movie))
            //         })
            //         // showreview
            //         $('.movie').click(() => {
            //             alert('111')
            //         })
            //     }
            //     $('body').removeClass('loading')
            // })
        }
    }

    function drawMovie(movie) {
        let movieDOM = `<div class="movie col-2">
                            <img class="movie__header" src="images/roll.png" alt="">
                            <div class="movie__block">
                            <img class="movie__poster" src="${IMG_URL + movie.poster_path}" alt="">
                            </div>
                            <div class="movie__info">
                            <h2 class="movie__title">${movie.title}</h2>
                                <h3><b>Release date: </b>${movie.release_date}</h3>
                                <h3><b>Rating: </b>${movie.vote_average}</h3>
                                <p>${movie.overview}</p>
                            </div>
                        </div>`
        return movieDOM
    }

    /*async*/ function getReviews(id) {

        // let url2 = `${API_URL}/movie/${id}/reviews?api_key=${API_KEY}`
        // try {
        //     let response = await fetch(url2)
        //     let res = await response.json()
        //     res.results.forEach((review) => {
        //         let reviewsDOM = `
        //                     <h2 class="review__author">${review.author}</h2>
        //                     <p class="review__content">${review.content}</p>`
        //         $('.reviews').append(reviewsDOM);
        //     });
        //     $('.window').removeClass('hide')
        // } catch (e) {
        //     // alert('error')
        // }

        $.ajax({
            url: `${API_URL}/movie/${id}/reviews`,
            type: 'GET',
            dataType: 'json',
            data: {
                api_key: API_KEY
            }
        }).then((res) => {
            res.results.forEach((review) => {
                let reviewsDOM = `<div class="review">
                    <h2 class="review__author">${review.author}</h2>
                    <p class="review__content">${review.content}</p></div>`;

                $('.reviews').append(reviewsDOM);
            });
            $('.window').removeClass('hide')
        })
    }
})