// When you click the savenote button
$(document).on("click", ".saveNote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from note textarea
        body: $("#" + thisId).val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        //$("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#" + thisId).val("");
  });

  // Whenever someone clicks a viewNote button
$(document).on("click", ".viewNote", function() {
    // Empty the notes from the note section
    //$("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        // If there's a note in the article
        
        if (data.note) {
          //console.log(data)
          $("#noteBody").empty()
          // Place the body of the note in the body input
          for (i = 0; i < data.note.length; i++){
            $("#noteBody").append("<p>" + data.note[i].body);
          }
          $("#notes").modal('toggle');
        }
      });
  });
  