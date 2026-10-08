

const songs = [
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        genre: "pop"
    },
    {
        title: "As It Was",
        artist: "Harry Styles",
        genre: "pop"
    },
    {
        title: "Lose Yourself",
        artist: "Eminem",
        genre: "rap"
    },
    {
        title: "Believer",
        artist: "Imagine Dragons",
        genre: "rock"
    },
    {
        title: "One Dance",
        artist: "Drake",
        genre: "rap"
    },
    {
        title: "Levels",
        artist: "Avicii",
        genre: "dance"
    },
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        genre: "pop"
    },
    {
        title: "Thunder",
        artist: "Imagine Dragons",
        genre: "rock"
    }
];




const songList = document.getElementById("songList");

const searchInput = document.getElementById("searchInput");

const genreFilter = document.getElementById("genreFilter");

const randomBtn = document.getElementById("randomBtn");

const darkmodeBtn = document.getElementById("darkmodeBtn");

const songCount = document.getElementById("songCount");

const favoriteCount = document.getElementById("favoriteCount");

const genreCount = document.getElementById("genreCount");




let favorites = [];



function showSongs(songArray) {

    songList.innerHTML = "";

    if (songArray.length === 0) {

        songList.innerHTML = `
            <p>😢 Geen nummers gevonden.</p>
        `;

        return;
    }


    songArray.forEach(function(song, index) {

        const isFavorite = favorites.includes(index);


        const songElement = document.createElement("div");

        songElement.classList.add("song");


        songElement.innerHTML = `

            <div class="song-icon">
                🎵
            </div>

            <div class="song-info">

                <h3>
                    ${song.title}
                </h3>

                <p>
                    ${song.artist}
                </p>

                <p class="song-genre">
                    ${song.genre}
                </p>

            </div>

            <button
                class="favorite-btn"
                onclick="toggleFavorite(${index})"
            >
                ${isFavorite ? "❤️" : "🤍"}
            </button>

        `;


        songList.appendChild(songElement);

    });

}




function toggleFavorite(index) {

    if (favorites.includes(index)) {

        favorites = favorites.filter(function(id) {
            return id !== index;
        });

    } else {

        favorites.push(index);

    }


    showSongs(getFilteredSongs());

    updateStats();

}




function getFilteredSongs() {

    const searchText = searchInput.value.toLowerCase();

    const selectedGenre = genreFilter.value;


    return songs.filter(function(song) {

        const matchesSearch =
            song.title.toLowerCase().includes(searchText) ||
            song.artist.toLowerCase().includes(searchText);


        const matchesGenre =
            selectedGenre === "all" ||
            song.genre === selectedGenre;


        return matchesSearch && matchesGenre;

    });

}




searchInput.addEventListener("input", function() {

    showSongs(getFilteredSongs());

});




genreFilter.addEventListener("change", function() {

    showSongs(getFilteredSongs());

});



randomBtn.addEventListener("click", function() {

    const randomIndex =
        Math.floor(Math.random() * songs.length);


    const randomSong = songs[randomIndex];


    alert(
        "🎵 Random nummer:\n\n" +
        randomSong.title +
        "\n" +
        randomSong.artist
    );

});




darkmodeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        darkmodeBtn.textContent = "☀️ Light Mode";

    } else {

        darkmodeBtn.textContent = "🌙 Dark Mode";

    }

});




function updateStats() {

    songCount.textContent = songs.length;

    favoriteCount.textContent = favorites.length;


    const genres = new Set();


    songs.forEach(function(song) {

        genres.add(song.genre);

    });


    genreCount.textContent = genres.size;

}




showSongs(songs);

updateStats();