document.getElementById('calc').addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: calcAverage,
  });
});


// function toSeconds(duration) {
//   var t = duration.split(':');
//   var sec;
//   if (t.length === 3) { //hh:mm:s
//     t = t.map(x => parseInt(x, 10));
//     sec = (t[0] * 60 * 60) + (t[1] * 60) + t2;
//   } else if (t.length === 2) { //mm:s
//     t = t.map(x => parseInt(x, 10));
//     sec = t[0] * 60 + t[1];
//   }
// }

// function toMinutes(avgSeconds) {
//   const seconds = avgSeconds % 60;
//   const minutes = Math.floor(avgSeconds / 60);
//   return minutes.toString() + ':' + seconds.toString();
// }

function calcAverage() {
  var rows = document.querySelectorAll('#intervals-table .active');
  var footer = document.querySelector('#intervals-table table tfoot');
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
    console.log(tutti);
  });
  avgSeconds = tutti / rows.length;

  const seconds = avgSeconds % 60;
  const minutes = Math.floor(avgSeconds / 60);
  var avgPace = minutes.toString() + ':' + seconds.toString();
  console.log('Average Pace is: ' + avgPace);
}