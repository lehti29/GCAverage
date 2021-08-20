document.getElementById('calc').addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: calcAverage,
  });
});

function calcAverage() {
  var rows = document.querySelectorAll('#intervals-table .active');
  var table = document.querySelector('#intervals-table table');
  var total = new Array(10);
  total[1] = total[3] = total[4] = 0;
  rows.forEach(row => {
    for (let i = 0; i < row.children.length; i++) {
      if (i == 4) {
        var p = row.children[i].innerHTML.trim();
        var timeSplit = p.split(':');
        var sec = getSec(timeSplit);
        total[i] += sec;
      } else if (i == 1) {
        var p = row.children[i].innerHTML.trim();
        var timeSplit = p.split(':');
        var sec = getSec(timeSplit);
        total[i] += sec;
      }
    }
  });
  var avg1 = toTime(total[1], rows.length);
  var avg4 = toTime(total[4], rows.length);
  
  if (document.querySelectorAll('#intervals-table table tfoot').length <= 1) {
    var avgFooter = document.querySelector('#intervals-table table tfoot').cloneNode(true);
    table.appendChild(avgFooter);
    var tr = avgFooter.firstChild;
    for (var i = 0; i < tr.children.length; i++) {
      tr.children[i].innerHTML = "";
    }
    tr.children[0].innerHTML = "Average";
    tr.children[1].innerHTML = avg1;
    tr.children[4].innerHTML = avg4;
  }

  function getSec(t){
    if (t.length === 3) { //hh:mm:s
      t = t.map(x => parseFloat(x, 10));
      sec = (t[0] * 60 * 60) + (t[1] * 60) + t2;
    } else if (t.length === 2) { //mm:s
      t = t.map(x => parseFloat(x, 10));
      sec = t[0] * 60 + t[1];
    }
    return sec;
  }

  function toTime(tutti, amount) {
    avgSeconds = tutti / amount;
    const seconds = avgSeconds % 60;
    const minutes = Math.floor(avgSeconds / 60);
    return minutes.toString() + ':' + seconds.toFixed(1);
  }
}