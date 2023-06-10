const apiKey = "4648d8f1dd1952103b5b11a07e047f65";
const API_URL = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1';
let page = 1

 function moviePage(pageNum) {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjQ4ZDhmMWRkMTk1MjEwM2I1YjExYTA3ZTA0N2Y2NSIsInN1YiI6IjY0ODJiMmM5OTkyNTljMDBmZjBkOTY0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BfUp6rMxx_FOzZqxIIUl23-1Ge9490BpCw4gkg-S5N0'
    }
  };
  
  fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=4648d8f1dd1952103b5b11a07e047f65&page=' + page, options)
    .then(response => response.json())
    // .then(response => response.results.forEach(generateCards(response.results)))
    .then(response => {
          console.log(response);
          for (let i = 0; i < response.results.length; i++){
            (generateCards(response.results[i]))
          }
        }) 
    .catch(err => console.error(err));

      // fetch(API_URL, options)
      //   .then(response => response.json())
      //   .then(response => {
      //     response.results.forEach(
      //      console.log(response.results),
      //       generateCard(response.results),
      //       console.log(response)
      //     )
          
      //   })
      //   .catch(err => console.error(err));
      //   console.log(response.results)
}
moviePage(page);


let searchBar = document.getElementById('search')

function getSearchPage(event){
  page = 0

  event.preventDefault();
  let searchVal = searchBar.value;

  let newMovieContainer = document.getElementById('containerMovie');
  newMovieContainer.innerHTML = "";

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjQ4ZDhmMWRkMTk1MjEwM2I1YjExYTA3ZTA0N2Y2NSIsInN1YiI6IjY0ODJiMmM5OTkyNTljMDBmZjBkOTY0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BfUp6rMxx_FOzZqxIIUl23-1Ge9490BpCw4gkg-S5N0'
    }
  };

  fetch(`https://api.themoviedb.org/3/search/movie?${apiKey}&query=` + searchVal + '&include_adult=false&language=en-US&page=' + page, options)
    .then(response => response.json())
    .then(response => {
      for (let i = 0; i < response.results.length; i++){
        (generateCards(response.results[i]))
      }
    })
    .catch(err => console.error(err));
}

// card generator function.
function generateCards(movieObject) {

    let targetDiv = document.querySelector("section.allMovies")

    // create star
    let star = document.createElement('span');
    let starContent = document.createTextNode("⭐️ ")
    star.appendChild(starContent)
    targetDiv.appendChild(star)

    // create rating
    let rating = document.createElement('span')
    let ratingContent = document.createTextNode("" + movieObject.vote_average)
    rating.appendChild(ratingContent);
    rating.classList.add('ratingFont')
    targetDiv.appendChild(rating);

    // create avg continaer 
    let averageContainer = document.createElement('div')
    averageContainer.classList.add('average')
    averageContainer.appendChild(star)
    averageContainer.appendChild(rating)
    targetDiv.appendChild(averageContainer)

    // image 
    let image = document.createElement('img')
    image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path
    targetDiv.insertBefore(image, averageContainer);


    // name 
    let name = document.createElement('div')
    name.classList.add('name')
    name.innerText = movieObject.original_title
    targetDiv.insertBefore(name, averageContainer.nextSibling)

    // create movie section 
    let movie = document.createElement('section');
    name.classList.add('name')
    movie.classList.add('movieCard')

    movie.appendChild(image)
    movie.appendChild(averageContainer)
    movie.appendChild(name)
    targetDiv.appendChild(movie)
}

window.onload = function() {

    let searchButt = document.getElementById('submitButton').addEventListener('click', getSearchPage)
    // moviePage(page)
}

function loadMore() {
  page++
// moviePage(page++)
   if (searchBar.value) {
    // getSearchPage()

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=` + searchBar.value + '&include_adult=false&language=en-US&page=' + page)
    .then(response => response.json())
    .then(response => {
      for (let i = 0; i < response.results.length; i++){
        (generateCards(response.results[i]))
      }
    })
    .catch(err => console.error(err));

   } else {
    moviePage(page) 
  }
   

}





