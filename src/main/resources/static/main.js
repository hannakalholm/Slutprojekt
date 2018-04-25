/*
$( document ).ready(function() {
   console.log( "ready!" );
});
*/
$(function () {
    $(".draggable").draggable({
        revert: true,

    });
});

$(function () {
    $("#lok").droppable({
        accept: ".Initial",
        drop: function (event, ui) {
            $(this)
            $("img.test").addClass("hidden");
            update(listOfFiveRandomWords);

        }
    });
});

$(function () {
    $("#rödvagn").droppable({
        accept: ".Medial",
        drop: function (event, draggable) {
            $(this)
            $("img.test").addClass("hidden");
            update(listOfFiveRandomWords);
        }
    });
});

$(function () {
    $("#grönvagn").droppable({
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


function sendChoosenPhonemeToServer() {

    $(".button").on("click"), function (e) {
        var phoneme = $(this).prev().val();

        $.ajax({
            type: "POST",
            error: function () {
                console.log("error sending the data");
                render([]);
            },
            data: {
                phoneme: phoneme
            },
            url: "/test",
            success: function (phoneme){
            }
        });
        fetchObjects();
    }
}

/*function sendPhoneme() {

    $.ajax({
        type: "POST"
        error: function () {
            console.log("error sending the data");
        }
        url: "/test",
        data: $('').serialize()
    }).done(function (data) {

    });
}*/


function fetchObjects() {

    $.ajax({
        type: "GET",
        error: function () {
            console.log("error retrieving the data");
        },
        url: "/test?phoneme=F", //which is mapped to its partner function on our controller class
        success: function (data) {
            //       console.log(data);
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
}

function render(listOfFiveRandomWords) {
    $("img.test").removeClass("hidden");
    var index = listOfFiveRandomWords.index;

    $("img.test").attr("src", "Images/" + listOfFiveRandomWords[index].image);

    //$("img.test").addClass("visible");

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

fetchObjects();