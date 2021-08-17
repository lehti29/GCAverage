document.getElementById('calc').addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: calcAverage,
  });
});

function calcAverage() {
  var rows = document.querySelectorAll('#intervals-table .active');
  var footer = document.querySelector('#intervals-table table tfoot');
  var table = document.querySelector('#intervals-table table');
  var f = footer.cloneNode(true);
  var total = [];
  var tutti = 0;
  rows.forEach(row => {
    for (let i = 0; i < row.children.length; i++) {
      if (i != 4) continue;
      var p = row.children[i].innerHTML.trim();
      var t = p.split(':');
      var sec;
      if (t.length === 3) { //hh:mm:s
        t = t.map(x => parseInt(x, 10));
        sec = (t[0] * 60 * 60) + (t[1] * 60) + t2;
      } else if (t.length === 2) { //mm:s
        t = t.map(x => parseInt(x, 10));
        sec = t[0] * 60 + t[1];
      }
      total[4] += sec;
      tutti = tutti + sec;
    }
  });
  avgSeconds = tutti / rows.length;

  const seconds = avgSeconds % 60;
  const minutes = Math.floor(avgSeconds / 60);
  var avgPace = minutes.toString() + ':' + seconds.toFixed(1);
  
  if (document.querySelectorAll('#intervals-table table tfoot').length <= 1) {
    table.appendChild(f);
    var tr = f.firstChild;
    for (var i = 0; i < tr.children.length; i++) {
      tr.children[i].innerHTML = "";
    }
    tr.children[0].innerHTML = "Average";
    tr.children[4].innerHTML = avgPace;
  }
}