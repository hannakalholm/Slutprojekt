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
            alert("Dropped initial!")

        }
    });
} );

$( function() {
    $( "#rödvagn" ).droppable({
        accept: ".Medial",
        drop: function( event, ui ) {
            $( this )
            alert("Dropped medial!")

        }
    });
} );

$( function() {
    $( "#grönvagn" ).droppable({
        accept: ".Final",
        drop: function( event, ui ) {
            $( this )
            alert("Dropped final!")

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

            $( "img.test" ).attr( "src", "Images/" + data[0].image);

            ljud.src = "/Audio/" + data[0].audio;
            $( "img.audioimage" ).attr( "onclick", "ljud.play()");
            for(var x=0; x<data.length; x++){
                console.log(content = data[x].name);
            }

            $("img.test").addClass(data[0].position);
        }
    });
}
getImageAudioAndPosition();

