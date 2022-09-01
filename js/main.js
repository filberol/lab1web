import {
  loadMode, changeMode, switchMode,
  loadRecords, appendRecord, saveRecord,
  clearStorage
} from "./cookies.js";

$(function () {
  loadMode();
  loadRecords();
});

$("button.menu-button").click(function () {
  $("#description").toggleClass("active");
  $("li.header-block").toggleClass("active");
});

$("#night-mode").click(function () {
  changeMode();
  switchMode();
});

$("th").click(function () {
  clearStorage();
});

$("#y-textinput").on("input", function () {
  let val = parseInt(this.value);
  if (checkTextY(val)) {
    this.style.background = "rgba(0, 200, 0, 0.7)";
  } else {
    if (isNaN(val)) {
      this.style.background = "aliceblue";
    } else {
      this.style.background = "rgba(200, 0, 0, 0.7)";
    }
  }
});

$("#submit").click(function () {
  //checkboxes
  const checks = $(".x-check:checked").map(function () {
    return parseInt(this.value);
  }).get();
  //text
  const text = $("#y-textinput").val();
  //radio
  const radio = parseInt($(".r-radio:checked").val());

  ajax: {
    if (checks.length == 0) break ajax;
    if (isNaN(text) || !checkTextY(text)) break ajax;
    if (isNaN(radio)) break ajax;

    checks.forEach(box => {
      $.ajax({
        url: './php/main.php',
        method: 'post',
        dataType: 'json',
        data: {
          x: box,
          y: text,
          r: radio,
          timezone: new Date().getTimezoneOffset()
        },
        success: function (record) {
          saveRecord(record);
          appendRecord(record);
        }
      });
    });
  }
});

function checkTextY(val) {
  return (val >= -3 && val <= 3);
}
