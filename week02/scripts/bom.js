// 1. Declare variables holding references to the input, button, and list elements.
const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

// 2. Create a click event listener for the Add Chapter button using addEventListener
button.addEventListener('click', function () {
  
  // 3. Check to make sure the input is not blank using .trim() to ignore blank space bars
  if (input.value.trim() !== '') {
    
    // 4. Create the li element that will hold the text and the delete button
    const li = document.createElement('li');
    
    // 5. Create the delete button
    const deleteButton = document.createElement('button');
    
    // 6. Populate the li element's textContent with the input value
    li.textContent = input.value;
    
    // 7. Set the delete button's textContent to ❌
    deleteButton.textContent = '❌';
    
    // Accessibility Feature: Ensure screen readers understand the button purpose
    deleteButton.setAttribute('aria-label', `Remove ${input.value}`);
    
    // 8. Add an event listener to the delete button that removes the li element when clicked
    deleteButton.addEventListener('click', function () {
      list.removeChild(li);
      input.focus(); // Keep user experience smooth by focusing back on the input
    });
    
    // 9. Append the delete button to the li element
    li.append(deleteButton);
    
    // 10. Append the li element variable to the unordered list in the HTML
    list.append(li);
    
    // 11. Change the input value to an empty string to clean up the text field interface
    input.value = '';
  }
  
  // 12. Regardless of whether the input was valid or empty, return focus back to the input field
  input.focus();
});