// Assuming you're working in a frontend JavaScript file
async function fetchRenderValue() {
  try {
    const response = await fetch("/items/insert");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    const renderValue = data.render;

    // Now you can use the 'renderValue' in your frontend code
    console.log("Render value:", renderValue);
    // You might want to render it in your HTML or perform other actions here
  } catch (error) {
    console.error("Error fetching data:", error.message);
    // Handle the error appropriately (e.g., show an error message to the user)
  }
}

// Call the function to fetch the value
fetchRenderValue();
