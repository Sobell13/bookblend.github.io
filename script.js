
// Constants for the site logic
const iframe = document.querySelector("#embed-frame");
const figmaOrigin = "https://www.figma.com";

// Messages to control the prototype
function nextPage() {
  iframe.contentWindow.postMessage(
    {
      type: "NAVIGATE_FORWARD"
    },
    figmaOrigin
  );
}

function previousPage() {
  iframe.contentWindow.postMessage(
    {
      type: "NAVIGATE_BACKWARD"
    },
    figmaOrigin
  );
}

function restartPrototype() {
  iframe.contentWindow.postMessage(
    {
      type: "RESTART"
    },
    figmaOrigin
  );
}

const restartButton = document.querySelector("#restart");
const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");


// Logic to handle events from the prototype
window.addEventListener("message", (event) => {
  if (event.origin === figmaOrigin) {
    if (event.data.type === "INITIAL_LOAD") {
    }

    if (event.data.type === "PRESENTED_NODE_CHANGED") {
      const nodeId = event.data.data.presentedNodeId;
      console.log("Changed node to : ", nodeId)
    }
  } else {
    console.warn(
      "Received message from an unexpected origin:",
      event.origin
    );
  }
});