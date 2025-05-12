
// Constants for the site logic
const iframe = document.querySelector("#embed-frame");
const figmaOrigin = "https://www.figma.com";
const nodeIdString = new Map();
const logs = [];

// Map set
nodeIdString.set("352:3477", "Log-In");

nodeIdString.set("351:2283", "Homepage");
nodeIdString.set("593:1895", "Homepage (after changes)");

nodeIdString.set("654:2140", "My books");

nodeIdString.set("534:775", "Before Alchemy");
nodeIdString.set("421:2577", "Alchemy");

nodeIdString.set("360:2980", "Book - The Library at Mount Char");
nodeIdString.set("360:2599", "Book - Harry Potter");
nodeIdString.set("411:1468", "Book - Nevernight");

nodeIdString.set("411:1579", "Book - The strange case of Dr. Jekyll and Mr. Hyde");
nodeIdString.set("600:1900", "Question - The Library at Mount Char");
nodeIdString.set("604:2069", "Question - Harry Potter");
nodeIdString.set("605:2142", "Question - Nevernight");
nodeIdString.set("605:2218", "Book - The strange case of Dr. Jekyll and Mr. Hyde");

nodeIdString.set("605:2291", "Right answer");
nodeIdString.set("606:2452", "Wrong answer");

nodeIdString.set("427:1796", "Chat (unlocked)");
nodeIdString.set("596:1999", "Chat (locked)");

// Variables
var timestamp = 0;
var finishedLoading = false;

// Messages to control the prototype
// Example function
function nextPage() {
  iframe.contentWindow.postMessage(
    {
      type: "NAVIGATE_FORWARD"
    },
    figmaOrigin
  );
}

function resetDate() {
  timestamp = Date.now();
  
}

function getMapValue(map, key) {
  return map.get(key) || key;
}

// Logic to handle events from the prototype
window.addEventListener("message", (event) => {
  if (event.origin === figmaOrigin) {
    if (event.data.type === "INITIAL_LOAD") {
      console.log("Finished loading ...");
      resetDate();
      finishedLoading = true;
    }

    if (event.data.type === "PRESENTED_NODE_CHANGED" && finishedLoading) {
      const nodeId = event.data.data.presentedNodeId;
      const nodeString = getMapValue(nodeIdString, String(nodeId));

      var now = Date.now();
      var time_diff = now - timestamp;
      var toSeconds = time_diff / 1000;
      var minutes = Math.floor(toSeconds / 60);
      var seconds = Math.floor(toSeconds % 60);

      const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      const logLine = formattedTime + " - User changed to " + nodeString
      logs.push(logLine);
      console.log(logLine);
    }
  } else {
    console.warn(
      "Received message from an unexpected origin:",
      event.origin
    );
  }
});

document.getElementById('downloadBtn').addEventListener('click', () => {
  console.log("Download request ...");
  const content = logs.join('\n');
  console.log(content);
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'logs.txt';
  //a.download = 'lines.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}, false);