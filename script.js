const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');
populateUI();
let ticketPrice = +movieSelect.value;

// save selected movie index and price
function setMovieData(movieIndex,moviePrice) {
    localStorage.setItem('selectedMovieIndex',JSON.stringify(movieIndex));
    localStorage.setItem('selectedMoviePrice',JSON.stringify(moviePrice));
}

// update count and total
const updateSelectedCount = () =>{
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map((seat)=>{
        return [...seats].indexOf(seat); // Return an array of indexes of selected seats
    })
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex))
    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;
}

// get data from localStorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat,index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        });
    }
    const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'))
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// movie select event
movieSelect.addEventListener('change', (e)=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex,e.target.value)
    updateSelectedCount();
})

// seat select event
container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// initial count and total set
updateSelectedCount();