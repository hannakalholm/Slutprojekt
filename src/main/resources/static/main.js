/*
$( document ).ready(function() {
    console.log( "ready!" );
});
*/

$( function() {
    $( ".draggable" ).draggable({
        revert: true,

    });
} );

$( function() {
    $( "#lok" ).droppable({
        accept: ".Initial",
        drop: function( event, ui ) {
            $( this )
            $( "img.test" ).attr( "id", "hidden");


        }
    });
} );

$( function() {
    $( "#rödvagn" ).droppable({
        accept: ".Medial",
        drop: function( event, ui ) {
            $( this )
            $( "img.test" ).attr( "id", "hidden");


        }
    });
} );

$( function() {
    $( "#grönvagn" ).droppable({
        accept: ".Final",
        drop: function( event, ui ) {
            $( this )
            $( "img.test" ).attr( "id", "hidden");


        }
    });
} );

var ljud = new Audio();

function getImageAudioAndPosition() {

    $.ajax({
        type: "GET",
        error: function () {
            console.log("error retrieving the data");
        },
        url: "/test", //which is mapped to its partner function on our controller class
        success: function (data) {
            console.log(data);
            console.log("successfully fetched " + data[0].image);
            var counter = data.length-1;
            while (counter>=0) {
                $("img.test").attr("src", "Images/" + data[counter].image);
                ljud.src = "/Audio/" + data[counter].audio;
                $("img.audioimage").attr("onclick", "ljud.play()");
                $("img.test").addClass(data[counter].position);
                counter--;
            }
        }
    });
}
getImageAudioAndPosition();

