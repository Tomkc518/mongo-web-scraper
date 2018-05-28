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
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#" + thisId).val("");
  });

  // Whenever someone clicks a viewNote button
$(document).on("click", ".viewNote", function() {
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
          $("#noteBody").empty()
          // Place the body of the note in the body input
          for (i = 0; i < data.note.length; i++){
            $("#noteBody").append("<p class='note'>" + data.note[i].body + " <button class='delete' data-id='" + data.note[i]._id + "'>x");
          }
          $("#notes").modal('toggle');
        }
      });
  });

  // When user clicks the delete button for a note
  $(document).on("click", ".delete", function() {
    // Save the p tag that encloses the button
    var selected = $(this).attr("data-id");
    $(this).parent().remove();
    // Make an AJAX GET request to delete the specific note
   $.ajax({
      type: "GET",
      url: "/delete/" + selected,
    });
  });
  