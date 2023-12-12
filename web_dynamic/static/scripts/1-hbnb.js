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
}
);
