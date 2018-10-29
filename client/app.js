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
              <button class="btn card-btn btn-sm btn-outline-light" onclick="editChirp(${chirp.id})" data-toggle="modal" data-target="#exampleModal">Edit</button>
              <button class="delete btn card-btn btn-sm btn-outline-light" onclick="deleteChirp(${chirp.id})">Delete</button>
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
    
    let deleteChirp = (id) => {
        console.log('clickedd');
        $.ajax({
            url: `/api/chirps/${id}`,
            type: 'DELETE',
            success: function(result) {
                console.log('chirp removed');
            }
        }).then(() => {
            $('#chirps').empty();
            getChirps();
        });
    };
    
    let editChirp = (id) => {
        
            $('#modalChirpId').text(`Chirp ID: ${id}`);
        
            $.get(`/api/chirps/${id}`)
                .then(data => {
        
                    $('#edit-author').val(data.author);
                    $('#edit-chirp').val(data.chirp);
                        //user edits
                    $('#save-button').click(() => {
        
                        let editedChirp = {
                            author: $('#edit-author').val(),
                            chirp: $('#edit-chirp').val()
                        };
        
                        $.ajax({
                            url: `/api/chirps/${id}`,
                            type: 'PUT',
                            data: editedChirp
                        })
                            .then(() => {
                                $('#chirps').empty();
                                getChirps();
                            })
                            .catch(e => console.log(e));
                    })
        
                })
            };


