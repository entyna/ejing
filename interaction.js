// Define the yaoValues array
let yaoValues;

// Function to generate random yaoValues array
function generateRandomYaoValues() {
  yaoValues = [];
  for (let i = 0; i < 6; i++) {
    yaoValues.push(Math.floor(Math.random() * 2)); // Generate random 0 or 1
  }
}

// Call the function to generate initial yaoValues array
generateRandomYaoValues();

// Call updatePoints with initial yaoValues
updatePoints(yaoValues);

// Create the buttons container
let buttonContainer = document.createElement("div");
buttonContainer.id = "button-container";
document.body.appendChild(buttonContainer);

// Create the buttons
let buttons = [];
for (let i = 0; i < 6; i++) {
  let button = document.createElement("button");
  button.classList.add("button-" + yaoValues[i]); // Add initial class based on yaoValue
  button.addEventListener("click", function() {
    // Toggle the yaoValues value for this button
    yaoValues[i] = 1 - yaoValues[i];
    button.classList.toggle("button-0"); // Toggle class for yaoValue 0
    button.classList.toggle("button-1"); // Toggle class for yaoValue 1
    // Call the updatePoints function in sketch.js, passing in the updated yaoValues array
    updatePoints(yaoValues);
  });
  buttons.push(button);
  buttonContainer.appendChild(button);
}