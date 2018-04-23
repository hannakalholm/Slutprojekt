$( function() {
    $( ".draggable" ).draggable({
        revert: true,
    });
} );

$( function() {
    $( "#rödvagn" ).droppable({
        accept: ".medialposition",
        drop: function( event, ui ) {
            $( this )
            alert("Dropped medial!")

        }
    });
} );

$( function() {
    $( "#grönvagn" ).droppable({
        accept: ".finalposition",
        drop: function( event, ui ) {
            $( this )
            alert("Dropped final!")

        }
    });
} );

$( function() {
    $( "#lok" ).droppable({
        accept: ".initialposition",
        drop: function( event, ui ) {
            $( this )
            alert("Dropped lok!")

        }
    });
} );


var ananas = new Audio();
ananas.src = "Ananas.wav";

var pussel = new Audio();
pussel.src = "Pussel.wav";

var säl = new Audio();
säl.src = "Säl.wav";
