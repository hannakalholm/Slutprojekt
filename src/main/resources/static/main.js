/*
$( document ).ready(function() {
   console.log( "ready!" );
});
*/

var wordaudio = new Audio();
var phraseaudio = new Audio();
var phonemeaudio = new Audio();
var soundtrack = new Audio();
var listOfFiveRandomWords = [];
var listOfCorrectAnswer = [];
var listOfIncorrectAnswer = [];
var listOfGameFeedback = [];
var randomPhraseWhenIncorrect = Math.floor((Math.random() * (listOfIncorrectAnswer.length - 1)) + 1);
soundtrack.src = "Audio/Soundtrack.wav";
soundtrack.play();
soundtrack.loop = true;

$(".button").on("click", function (e) {
    var phoneme = $(this).attr('id');
    console.log(phoneme);
    console.log("Button clicked");

    $(".gamesidephoneme").removeClass("nonedisplay");
    $(".gameside").removeClass("nonedisplay");
    $(".frontsideupper").addClass("nonedisplay");
    $(".frontsidelower").addClass("nonedisplay");

    $("#choosephoneme").addClass("nonedisplay");
    $("#placewordintrain").removeClass("nonedisplay");

    $(".soundtrackspeaker").addClass("nonedisplay");

    $("input.buttonpic").addClass("nonedisplay");
    $("#header").removeClass("visible");
    $("#header").addClass("hidden");
    soundtrack.pause();
    //put fade-out on soundtrack

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
        revert: function (droppable) {
            if (!droppable) {
                var randomPhraseWhenIncorrect = Math.floor((Math.random() * listOfIncorrectAnswer.length));
                phraseaudio.src = "Audio/" + listOfIncorrectAnswer[randomPhraseWhenIncorrect].audio;
                phraseaudio.play();
            }
            else {
                var randomPhraseWhenCorrect = Math.floor((Math.random() * listOfCorrectAnswer.length));
                phraseaudio.src = "Audio/" + listOfCorrectAnswer[randomPhraseWhenCorrect].audio;
                phraseaudio.play();
            }
            return true;
        }
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
        drop: function (event, ui) {
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

//ajax-anrop för att få phrases när man svarat rätt
$.ajax({
    type: "GET",
    error: function () {
        console.log("error retrieving the data");
    },

    url: "/getcorrectphrases", //which is mapped to its partner function on our controller class
    success: function (data) {
        console.log(data);

        for (var x = 0; x < data.length; x++) {
            listOfCorrectAnswer.push(data[x]);
        }
    }
});

//ajax-anrop för att få phrases när man svarat fel
$.ajax({
    type: "GET",
    error: function () {
        console.log("error retrieving the data");
    },

    url: "/getincorrectphrases", //which is mapped to its partner function on our controller class
    success: function (data) {
        console.log(data);

        for (var x = 0; x < data.length; x++) {
            listOfIncorrectAnswer.push(data[x]);
        }
    }
});

function render(listOfFiveRandomWords) {
    $(document).ready(function () {
        setTimeout(function () {
            $("img.currentimage").removeClass("hidden");
        }, 2000);
    });
    var index = listOfFiveRandomWords.index;

    $("img.currentimage").attr("src", "Images/" + listOfFiveRandomWords[index].image);
    $("img.currentphoneme").attr("src", "Images/" + listOfFiveRandomWords[index].phoneme + ".png");

    wordaudio.src = "/Audio/" + listOfFiveRandomWords[index].audio;
    phonemeaudio.src = "Audio/" + listOfFiveRandomWords[index].phoneme + ".wav";

    $("img#playsound").attr("onclick", "wordaudio.play()");
    setTimeout(function () {
        $("img#playsound").click();
    }, 2000);

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


        $(".choicebutton").removeClass("nonedisplay");
        $(".gamesidephoneme").addClass("nonedisplay");
        $(".gameside").addClass("nonedisplay");
        $("#placewordintrain").addClass("nonedisplay");


    }
}

$("#playmore").click(function () {

    // alert("Game is over, play aglain.");
    $("input.buttonpic").removeClass("nonedisplay");
    $(".frontsideupper").removeClass("nonedisplay");
    $(".frontsidelower").removeClass("nonedisplay");


    $(".choicebutton").addClass("nonedisplay");
    $("#choosephoneme").removeClass("nonedisplay");


    $("#header").removeClass("hidden");
    $("#header").addClass("visible");

    $(".soundtrackspeaker").removeClass("nonedisplay");

    soundtrack.play();
    soundtrack.loop = true;
    //put fade-in on soundtrack
});
//When ending the game
$("#donefortoday").click(function () {


    $(".choicebutton").addClass("nonedisplay");
    $("input.buttonpic").removeClass("nonedisplay");
    $(".frontsideupper").removeClass("nonedisplay");
    $(".frontsidelower").removeClass("nonedisplay");
    $("input.buttonpic").addClass("hidden");
    $(".frontsideupper").addClass("hidden");
    $(".frontsidelower").addClass("hidden");
    $("#goodbye").removeClass("nonedisplay");

    var goodbyeaudio = new Audio();
    goodbyeaudio.src = "Audio/Tackföridaghoppasvisessnartigen.wav";
    goodbyeaudio.play();

});


//Open the sidenav
function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    setTimeout(function () {
        $("#header").addClass("visible");
    }, 200);

}

//Close/hide the sidenav
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    $("#header").removeClass("visible");
}

$("#mutesound").on("click",function (e) {
    soundtrack.pause();
    $("#unmutesound").removeClass("nonedisplay");
    $("#mutesound").addClass("nonedisplay");
})

$("#unmutesound").on("click",function (e) {
    soundtrack.play();
    $("#unmutesound").addClass("nonedisplay");
    $("#mutesound").removeClass("nonedisplay");
})