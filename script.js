
// Constants for the site logic
const iframe = document.querySelector("#embed-frame");
const figmaOrigin = "https://www.figma.com";
const nodeIdString = new Map();

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

function getMapValue(map, key) {
  return map.get(key) || key;
}

// Logic to handle events from the prototype
window.addEventListener("message", (event) => {
  if (event.origin === figmaOrigin) {
    if (event.data.type === "INITIAL_LOAD") {
      const timestamp = Date.now();
    }

    if (event.data.type === "PRESENTED_NODE_CHANGED") {
      const nodeId = event.data.data.presentedNodeId;
      const nodeString = getMapValue(nodeIdString, String(nodeId));
      console.log("Changed node to : ", nodeString);
      console.log("Time recorded was : ", timestamp);
      const now = Date.now();
      const time_diff = now - timestamp;
      console.log("Difference : ", time_diff);
    }
  } else {
    console.warn(
      "Received message from an unexpected origin:",
      event.origin
    );
  }
});