#!/usr/bin/node
let checkList = [];
$(document).ready(() => {
    loadPlaces();
  // Setting Checkboxes and updating lists accordingly
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

  //Checking Status of API and applying class
  $.get('http://localhost:5001/api/v1/status/', (response) => {
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });

  //Sending POST request and dynamically loading places
  function loadPlaces() {
  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      $('section.places').empty();
      if (data.length > 0) {
        $('section.places').append(data.map(place => {
          return `<ARTICLE>
                    <DIV class="title_box">
                      <H2>${place.name}</H2>
                      <DIV class="price_by_night">$${place.price_by_night}</DIV>
                    </DIV>
                    <DIV class="information">
                      <DIV class="max_guest">${place.max_guest} Guests</DIV>
                      <DIV class="number_rooms">${place.number_rooms} Bedrooms</DIV>
                      <DIV class="number_bathrooms">${place.number_bathrooms} Bathrooms</DIV>
                    </DIV>
                    <DIV class="description">${place.description}</DIV>
                  </ARTICLE>`;
        }));
      } else {
        $('section.places').append('<p> empty places</p>');
      }
    }
  });
  }

    //button click response
    $('button').click(function() {
        const searchItems = $('input:checked').map(function() {
            return $(this).data('id');
        }).get();
        // .get converts variable from jQuery object, to standard array
        fullDict(searchItems);
    })
    //Function for clearing places and adding matching Amenities
    function fullDict(searchItems) {
        $.ajax({
            url: 'http://localhost:5001/api/v1/places_search/',
            type: 'POST',
            data: JSON.stringify({ 'amenities': searchItems }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                //Clears places
                $('.places').empty();

                $('section.places').append(data.map(place => {
                    return `
                    <ARTICLE>
                    <DIV class="title_box">
                      <H2>${place.name}</H2>
                      <DIV class="price_by_night">$${place.price_by_night}</DIV>
                    </DIV>
                    <DIV class="information">
                      <DIV class="max_guest">${place.max_guest} Guests</DIV>
                      <DIV class="number_rooms">${place.number_rooms} Bedrooms</DIV>
                      <DIV class="number_bathrooms">${place.number_bathrooms} Bathrooms</DIV>
                    </DIV>
                    <DIV class="description">${place.description}</DIV>
                  </ARTICLE>`;
                }))
    }})
}});
