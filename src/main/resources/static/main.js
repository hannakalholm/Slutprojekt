/*
$( document ).ready(function() {
   console.log( "ready!" );
});
*/
var wordaudio = new Audio();
var phonemeaudio = new Audio();
var listOfFiveRandomWords = [];

$(".button").on("click", function (e) {
    var phoneme = $(this).attr('id');
    console.log(phoneme);
    console.log("Button clicked");
    $("img.currentimage").removeClass("hidden");
    $("img.speaker").removeClass("hidden");
    $("img.currentphoneme").removeClass("hidden");
    $("input.buttonpic").addClass("hidden");
    $("#header").remove();


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

            if (listOfFiveRandomWords.length != 0) {
                listOfFiveRandomWords = [];
                listOfFiveRandomWords.index = 0;
            }
            for (var x = 0; x < data.length; x++) {
                listOfFiveRandomWords.push(data[x]);
                listOfFiveRandomWords.index = 0;
            }
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
            $("img.currentimage").addClass("hidden");
            update(listOfFiveRandomWords);
        }
    });
});

$(function () {
    $("#middlewagon").droppable({
        accept: ".Medial",
        drop: function (event, draggable) {
            $(this)
            $("img.currentimage").addClass("hidden");
            update(listOfFiveRandomWords);
        }
    });
});

$(function () {
    $("#finalwagon").droppable({
        accept: ".Final",
        drop: function (event, ui) {
            $(this)
            $("img.currentimage").addClass("hidden");
            update(listOfFiveRandomWords);
        }
    });
});

function render(listOfFiveRandomWords) {
    $(document).ready(function(){
        setTimeout(function () {
            $("img.currentimage").removeClass("hidden");}, 500);
        });
    var index = listOfFiveRandomWords.index;

    $("img.currentimage").attr("src", "Images/" + listOfFiveRandomWords[index].image);
    $("img.currentphoneme").attr("src", "Images/" + listOfFiveRandomWords[index].phoneme + ".png");

    wordaudio.src = "/Audio/" + listOfFiveRandomWords[index].audio;
    phonemeaudio.src = "Audio/" + listOfFiveRandomWords[index].phoneme + ".wav";

    $("img#playsound").attr("onclick", "wordaudio.play()");
    setTimeout(function () {
        $("img#playsound").click();}, 500);

    $("img#playphoneme").attr("onclick", "phonemeaudio.play()");

    if (listOfFiveRandomWords.index === 0) {
        $("img.currentimage").addClass(listOfFiveRandomWords[index].position);
    } else {
        $("img.currentimage").removeClass(listOfFiveRandomWords[index - 1].position);
        $("img.currentimage").addClass(listOfFiveRandomWords[index].position);
    }
    console.log(listOfFiveRandomWords);
}

function update(listOfFiveRandomWords) {
    listOfFiveRandomWords.index++;

    if (listOfFiveRandomWords.index < listOfFiveRandomWords.length) {
        render(listOfFiveRandomWords);

    } else {
        alert("Game is over, play aglain.");
        $("input.buttonpic").removeClass("hidden");
        $("img.speaker").addClass("hidden");
        $("img.currentphoneme").addClass("hidden");
    }
}
/* Open the sidenav */
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

//Close/hide the sidenav
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
