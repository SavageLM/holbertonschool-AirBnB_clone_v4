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

  const getPlaces = {
    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/places_search/",
        type: "POST",
        data: "{}",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            $(".places").empty();
            for (let elem of data) {
                //appends elem for each place
                $(".places").append('<article><div class="title"><h2>' + elem['name'] + '</h2> <div clas="price_by_night">' + elem['price_by_night'] + '</div></div> <div class="information"><div class="max_guest">')
            }
        }
    })
  }
});
