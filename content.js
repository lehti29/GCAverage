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
  rows.forEach(row => {
    for (let i = 0; i < row.children.length; i++) {
      var p = row.children[i].innerHTML.trim();
      total[4] += helpers.toSeconds(p);
    }
  });
  var avgSeconds = total[4] / rows.length;
  var avgPace = helpers.toMinutes(avgSeconds);
  console.log('Average Pace is: ' + avgPace);
}