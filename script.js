
// Constants for the site logic
const iframe = document.querySelector("#embed-frame");
const figmaOrigin = "https://www.figma.com";

const nodeIdString = new Map();
nodeIdString.set("352:3477", "Log-In");
nodeIdString.set("351:2283", "Homepage");
nodeIdString.set("593:1895", "Homepage (after changes)");
nodeIdString.set("534:775", "Before Alchemy");
nodeIdString.set("421:2577", "Alchemy");

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
    }

    if (event.data.type === "PRESENTED_NODE_CHANGED") {
      const nodeId = event.data.data.presentedNodeId;
      const nodeString = getMapValue(nodeIdString, String(nodeId));
      console.log("Changed node to : ", nodeString);
    }
  } else {
    console.warn(
      "Received message from an unexpected origin:",
      event.origin
    );
  }
});