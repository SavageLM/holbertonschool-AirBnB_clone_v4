#!/usr/bin/node
let checkList = [];
$(document).ready(() => {
  $('INPUT[type="checkbox"]').change(function () {
    const amenityData = { id: $(this).data('id'), name: $(this).data('name') };
    if (this.checked) {
      checkList.push(amenityData);
    } else {
      checkList = checkList.filter((amenity) => amenity.id !== amenityData.id);
    }
    const updatedList = checkList.map(amen => amen.name).join(', ');
    $('.amenities H4').text(updatedList);
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', (response) => {
    if (response.status === 'OK') {
        $('DIV#api_status').addClass('available');
    } else {
        $('DIV#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/places_search/",
        type: "POST",
        data: "{}",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
        $('section.places').empty();
        if  (data.length > 0) {
          $('section.places').append(data.map(place => {
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
          $('section.places').append('<p> cant locate places</p>');
        }
      },
      error: function (err) {
        console.error("An error has occurred");
      }
    });
  }
});
