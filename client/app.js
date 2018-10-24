let getChirps = () => {
    return jQuery.get('api/chirps/', data => {
        let chirpArray = Object.keys(data).map(chirpID =>{
            let chirp  = data[chirpID];
            chirp.id = chirpID;
            return chirp;
        });

        chirpArray.pop();
        chirpArray.reverse();
        chirpArray.forEach(chirp => {
            let newChirpDiv = $(`
            <div class="card bg-secondary" style="width: 18rem; margin-bottom: 10px;">
            <div class="card-body">
              <h5 class="card-title text-light">${chirp.author} chirped:</h5>
              <p class="card-text text-light">"${chirp.chirp}"</p>
              <p class="card-text text-light">${chirp.id}</p>
              <button class="edit btn card-btn btn-sm btn-outline-light">Edit</button>
              <button class="delete btn card-btn btn-sm btn-outline-light data-id="${chirp.id}" onclick="deleteChirp()">Delete</button>
            </div>
          </div>
            `);
            $('#chirps').append(newChirpDiv);
        });
    });
};

getChirps();

    $('#chirpButton').click(e => {
        e.preventDefault();
       let data = {
           author:$('#chirpAuthor').val(),
           chirp: $('#chirpSpace').val()
       }
       console.log(data);
       jQuery.post("api/chirps", data).then(() => {
            $('#chirps').empty();
            getChirps();
       });
    });
    
    let deleteChirp = () => {
        console.log('clickedd');
        $.ajax({
            url: `/api/chirps/${event.target.dataset.id}`,
            type: 'DELETE',
            success: function(result) {
                console.log('chirp removed');
            }
        }).then(() => {
            $('#chirps').empty();
            getChirps();
        });
    };
 


