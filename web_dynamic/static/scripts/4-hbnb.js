$(document).ready(() => {
    // Function to get places based on checked amenities
    const getPlacesAmenities = () => {
      // Create an array to store checked amenity IDs
      const checkedAmenities = $('INPUT[type="checkbox"]:checked').map(function () {
        return $(this).data('id');
      }).get();
      // Create the data object with checked amenity IDs
      const requestData = JSON.stringify({ amenities: checkedAmenities });
      // Make a new POST request to places_search
      $.ajax({
        url: api + ':5001/api/v1/places_search/',
        type: 'POST',
        data: requestData,
        contentType: 'application/json',
        dataType: 'json',
        success: function (data) {
          // Clear existing places before appending new ones
          $('SECTION.places').empty();
          if (data.length > 0) {
            // Append HTML elements for each place
            $('SECTION.places').append(data.map(place => {
              return `<ARTICLE>
                          <DIV class="title">
                            <H2>${place.name}</H2>
                            <DIV class="price_by_night">
                              ${place.price_by_night}
                            </DIV>
                          </DIV>
                          <DIV class="information">
                            <DIV class="max_guest">
                              <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                              </BR>
                              ${place.max_guest} Guests
                            </DIV>
                            <DIV class="number_rooms">
                              <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                              </BR>
                              ${place.number_rooms} Bedrooms
                            </DIV>
                            <DIV class="number_bathrooms">
                              <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                              </BR>
                              ${place.number_bathrooms} Bathrooms
                            </DIV>
                          </DIV>
                          <DIV class="description">
                            ${place.description}
                          </DIV>
                        </ARTICLE>`;
            }));
          } else {
            $('SECTION.places').append('<p>places empty</p>');
          }
        },
      });
    };
    // Add click event listener to the search button
    $('#searchButton').click(getPlacesAmenities);
  });
  