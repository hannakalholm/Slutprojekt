/*
$( document ).ready(function() {
   console.log( "ready!" );
});
*/

$(".button").on("click", function (e) {
    var phoneme = $(".button").attr('id');
    console.log(phoneme);
    console.log("Button clicked");

    $.ajax({
        type: "POST",
        error: function () {
            console.log("error retrieving the data");
        },
        data: {
            phoneme: phoneme
        },

        url: "/test", //which is mapped to its partner function on our controller class
        success: function (data) {
            console.log(data);
            //     console.log("successfully fetched " + data[0].image);

            if (listOfFiveRandomWords.length != 0) {
                listOfFiveRandomWords = [];
                listOfFiveRandomWords.index = 0;
            }
            for (var x = 0; x < data.length; x++) {
                listOfFiveRandomWords.push(data[x]);
                listOfFiveRandomWords.index = 0;
            }
            //       console.log(listOfFiveRandomWords);
            render(listOfFiveRandomWords);
        }
    });
});

$(function () {
    $(".draggable").draggable({
        revert: true,

    });
});

$(function () {
    $("#locomotive").droppable({
        accept: ".Initial",
        drop: function (event, ui) {
            $(this)
            $("img.test").addClass("hidden");
            update(listOfFiveRandomWords);

        }
    });
});

$(function () {
    $("#middlewagon").droppable({
        accept: ".Medial",
        drop: function (event, draggable) {
            $(this)
            $("img.test").addClass("hidden");
            update(listOfFiveRandomWords);
        }
    });
});

$(function () {
    $("#finalwagon").droppable({
        accept: ".Final",
        drop: function (event, ui) {
            $(this)
            $("img.test").addClass("hidden");
            update(listOfFiveRandomWords);
        }
    });
});

var ljud = new Audio();
var listOfFiveRandomWords = [];

function render(listOfFiveRandomWords) {
    $("img.test").removeClass("hidden");
    var index = listOfFiveRandomWords.index;

    $("img.test").attr("src", "Images/" + listOfFiveRandomWords[index].image);

    ljud.src = "/Audio/" + listOfFiveRandomWords[index].audio;

    $("img.audioimage").attr("onclick", "ljud.play()");
    $("img.audioimage").click();

    if (listOfFiveRandomWords.index === 0) {
        $("img.test").addClass(listOfFiveRandomWords[index].position);
    } else {
        $("img.test").removeClass(listOfFiveRandomWords[index - 1].position);
        $("img.test").addClass(listOfFiveRandomWords[index].position);
    }

    console.log(listOfFiveRandomWords);

}

function update(listOfFiveRandomWords) {
    listOfFiveRandomWords.index++;

    if (listOfFiveRandomWords.index < listOfFiveRandomWords.length) {
        render(listOfFiveRandomWords);

    } else {
        alert("Game is over, play aglain.");

    }
}
