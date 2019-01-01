var apiKey = "hLNk1PuOmae1cEE4Qr0BCHgt1qK94jwe"
var limit = 10;
cartoons = ["scooby doo", "darkwing duck", "smurfette", "bart simpson", "bugs bunny", "daffy duck", "mickey mouse", "rainbow bright", "carebears", "tigger", "snorks", "belcher", "inspector gadget", "scrooge mcduck", "rescue rangers", "aladdin", "cinderella", "ariel", "dumbo", "pinocchio"];

function displayGifs() {
    // Make a call to the Giphy API to retrieve a certain number of gifs and display them for the user
    var searchTerm = $(this).data("name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=" + apiKey + "&limit=" + limit;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#gif-view").empty();
        for (var i = 0; i < response.data.length; i++) {
            var cartoonDiv = $("<div class='cartoon'>");
            var ratingP = $("<p>").text("rating: " + response.data[i].rating);
            var stillGif = response.data[i].images.fixed_height_still.url;
            var animGif = response.data[i].images.fixed_height.url;
            var gifImage = $("<img class='cartoon-gif img-fluid' src='" + stillGif + "' data-still='" + stillGif + "' data-animated='" + animGif + "'/>");
            cartoonDiv.append(gifImage);
            cartoonDiv.append(ratingP);
            $("#gif-view").append(cartoonDiv);
        };
    });
};

function renderButtons() {
    // Populate the buttons container with a button for each cartoon character in the array
    $("#buttons-view").empty();

    for (var i = 0; i < cartoons.length; i++) {
        var btn = $("<button type='button'class='cartoon-button btn btn-sm btn-success'>");
        btn.attr("data-name", cartoons[i]);
        btn.text(cartoons[i]);
        $("#buttons-view").append(btn);
    };
};

function animateGif() {
    // Toggle the gif animation on and off
    if ($(this).attr("src") === $(this).data("still")) {
        $(this).attr("src", $(this).data("animated"));
    } else {
        $(this).attr("src", $(this).data("still"));
    };
}

$("#add-cartoon").on("click", function(event) {
    event.preventDefault();
    // Add the cartoon character to the array if there is an entry and it doesn't already exist in the array
    if ($("#cartoon-input").val().trim() != "" &&
        cartoons.indexOf($("#cartoon-input").val()) === -1) {
        cartoons.push($("#cartoon-input").val());
        renderButtons();
    };
    // Clear the entry from the input box
    $("#cartoon-input").val("");
});

$(document).on("click", ".cartoon-gif", animateGif);

$(document).on("click", ".cartoon-button", displayGifs);

renderButtons();