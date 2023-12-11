#!/usr/bin/node
const checkList = [];
const amenityData = { id: $(this).data('id'), name: $(this).data('name') };
$(document).ready(
  $('li input:checkbox').click(() => {
    if (checkbox.check === true) {
      checkList.push(amenityData);
    } else {
      checkList.filter((amenity) => amenity.id !== amenityData.id);
    }
    const updatedList = checkList.map(amen => amen.name).join(', ');
    $('.amenities h4').text(updatedList);
  })
);
