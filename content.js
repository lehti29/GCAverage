document.getElementById('calc').addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: calcAverage,
  });
});

function calcAverage() {
  var rows = document.querySelectorAll('#intervals-table .active');
  var total = new Array(10);
  var indexes = [1, 4];
  rows.forEach(row => {
    indexes.forEach(i => {
      if (!total[i]) total[i] = 0;
      var timeSplit = row.children[i].innerHTML.trim().split(':');
      total[i] += getSec(timeSplit);
    });
  });

  if (document.querySelectorAll('#intervals-table table tfoot').length <= 1) {
    var avgFooter = document.querySelector('#intervals-table table tfoot').cloneNode(true);
    document.querySelector('#intervals-table table').appendChild(avgFooter);
    var tr = avgFooter.firstChild;
    for (var i = 0; i < tr.children.length; i++) {
      tr.children[i].innerHTML = "";
    }
    indexes.forEach(i => {
      tr.children[i].innerHTML = "";
      tr.children[i].innerHTML = toTime(total[i], rows.length)
    });
    tr.children[0].innerHTML = `Average (of ${rows.length})`;
  }

  function getSec(t) {
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