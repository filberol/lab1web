export function loadRecords() {
  const storage = localStorage.getItem("storage");
  if (storage == null) {
    localStorage.setItem("storage", '{"object": []}');
  } else {
    JSON.parse(storage).object.forEach(element => {
      appendRecord(element);
    });
  }
}

export function appendRecord(record) {
  let table = $(".table-container div table tbody");
  let nightMode = localStorage.getItem("mode") == "night" ? "night" : "";
  table.append(`
              <tr class="logged">
              <td class="${nightMode}" >${record.cords}</td>
              <td class="${nightMode}" >${record.time}</td>
              <td class="${nightMode}" >${record.exec}</td>
              <td class="${nightMode}" >${record.result}</td>
            </tr>
  `);
}

export function saveRecord(record) {
  const storage = localStorage.getItem("storage");
  const objStor = JSON.parse(storage);
  objStor.object.push(record);
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