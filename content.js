document.getElementById('calc').addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  });
  
  function setPageBackgroundColor() {
      var rows = document.querySelectorAll('#intervals-table .active');
      var footer = document.querySelector('#intervals-table table tfoot');
      var f = footer.cloneNode(true);
    var total;
    console.log(f);
    console.log(rows);
    rows.forEach(row => {
        row.cells.forEach(cell => total[cell.cellIndex] += toSeconds(cell.innerText))
    });
    //   console.log(rows);
    //   console.log(rows.length);
  }

  function toSeconds(duration) {
    var t = duration.split(':');
    var sec;
    if (t.length === 3) { //hh:mm:s
        t = t.map(x => parseInt(x, 10));
        sec = (t[0] * 60*60) + (t[1]*60) + t2;
    } else if (t.length === 2) { //mm:s
        t = t.map(x => parseInt(x, 10));
        sec = t[0] * 60 + t[1]:
    }
  }