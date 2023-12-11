#!/usr/bin/node
const checkList = [];
const amenityData = { id: $(this).data('id'), name: $(this).data('name') };
$(document).ready(
  $('INPUT[type="checkbox"]').change(() => {
    if (this.checked) {
      checkList.push(amenityData);
    } else {
      checkList.filter((amenity) => amenity.id !== amenityData.id);
    }
    const updatedList = checkList.map(amen => amen.name).join(', ');
    $('.amenities H4').text(updatedList);
  })
);
