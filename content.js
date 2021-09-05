document.getElementById('calc').addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: calcAverage,
  });
});

function calcAverage() {
  calc();
  document.getElementById('intervals-table').addEventListener('click', () => {
    setTimeout(() => {
      calc();
    }, 100); // Small delay to allow .active class to be added
  })

  function calc() {
    var rows = document.querySelectorAll('#intervals-table .active');
    var total = new Array(16);
    var timeIndexes = [1, 4, 12, 14, 15];
    var numberIndexes = [3, 5, 6, 7, 8, 9, 10, 11, 13];
    rows.forEach(row => {
      for (var i = 0; i < 16; i++) {
        if (!total[i]) total[i] = 0;
        let cellValue = row.children[i].innerHTML.trim();
        if (cellValue.indexOf(':') > -1) { // Time with colon
          var timeSplit = cellValue.split(':');
          total[i] += getSec(timeSplit);
        } else {
          total[i] += parseFloat(cellValue, 10);
        }
      }
    });
    
    var avgFooter = document.getElementById('avgFooter');

    if (!avgFooter) {
      avgFooter = document.querySelector('#intervals-table table tfoot').cloneNode(true);
      avgFooter.setAttribute('id', 'avgFooter');
      avgFooter.style.backgroundColor = '#d6ff32';
      document.querySelector('#intervals-table table').appendChild(avgFooter);
    }

    var tr = avgFooter.firstChild;

    timeIndexes.forEach(i => {
      tr.children[i].innerHTML = '';
      if (i == 4) {
        var factor, normTime;
        factor = 1 / total[3];
        normTime = factor * total[1];
        tr.children[4].innerHTML = toTime(normTime, 1);
      } else {
        tr.children[i].innerHTML = toTime(total[i], 1) || '';
      }
    })

    numberIndexes.forEach(i => {
      tr.children[i].innerHTML = '';
      // Since toString() removes trailing zeros
      var val = parseFloat((total[i] / rows.length).toFixed(2)).toString();
      tr.children[i].innerHTML = isNaN(val) ? '' : val;
    })

    tr.children[0].innerHTML = `Average (of ${rows.length})`;
    tr.children[2].innerHTML = '';
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
    if (isNaN(seconds) || isNaN(minutes)) {
      return '';
    }
    return minutes.toString() + ':' + seconds.toFixed(1).padStart(4, '0');
  }
}