export function loadRecords() {
  const storage = localStorage.getItem("storage");
  if (storage == null) {
    localStorage.setItem("storage", '{"object": []}');
  } else {
    JSON.parse(storage).object.forEach(element => {
      appendRecord(element);
    });;
  }
}

export function appendRecord(record) {
  let table = $(".table-container div table tbody");
  table.append(`
              <tr class="logged">
              <td>${record.cords}</td>
              <td>${record.time}</td>
              <td>${record.exec}</td>
              <td>${record.result}</td>
            </tr>
  `);
}

export function saveRecord(record) {
  const storage = localStorage.getItem("storage");
  const objStor = JSON.parse(storage);
  objStor.object.push(record);
  console.log(objStor);
  localStorage.setItem("storage", JSON.stringify(objStor));
}

export function clearStorage() {
  localStorage.setItem("storage", '{"object": []}');
  $("tbody .logged").html("");
}

export function changeMode() {
  const mode = localStorage.getItem("mode");
  if (mode == "day") {
    localStorage.setItem("mode", "night");
  } else {
    localStorage.setItem("mode", "day");
  }
}

export function loadMode() {
  const mode = localStorage.getItem("mode");
  if (mode == null) {
    localStorage.setItem("mode", "day");
  }
  if (mode == "night") {
    switchMode();
  }
}

export function switchMode() {
  $("#dragger, #night-mode").toggleClass("active");
  $(".header, .header-block, .glass").toggleClass("night");
  $("body, th, td, input").toggleClass("night");
}