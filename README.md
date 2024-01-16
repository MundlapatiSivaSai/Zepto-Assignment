
## Introduction

This repository contains a custom chip component implemented in React. The chip component allows users to select items from a list, turning them into chips at the top of the input field. Additionally, each chip has a removal option, and there is a bonus functionality to handle backspace when the input is blank.

## Demo

Check out the [video example](https://drive.google.com/file/d/1sy-YAhX1FYFImjLj1uXNilb7DHlbuveh/view?usp=sharing) for a demonstration of the chip component in action.

## Specifications

- **Input Field Interaction**: Clicking on the input field triggers the appearance of a list of items.
- **Dynamic Filtering**: As the user types, the list dynamically updates to show only items matching the input.
- **Chip Creation**: Clicking on an item in the list turns it into a chip at the top of the input field.
- **Automatic Adjustment**: The input field adjusts automatically when an item becomes a chip.
- **Exclusion from List**: Once an item becomes a chip, it is removed from the list.
- **Chip Removal**: Each chip has an "X" icon that, when clicked, removes the chip and adds the item back to the list.

### Bonus Task

- **Clean Code**: Codebase adheres to clean coding practices.
- **TypeScript**: The solution is implemented using TypeScript.
- **Backspace Handling**: When the input is blank, pressing backspace highlights the last chip, and another press removes the chip.

## Implementation

The solution is implemented in React, without relying on any component-based library such as MUI or Chakra UI. CSS solutions, specifically Tailwind CSS, were utilized for styling.

## Usage

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/chip-component.git
   ```

2. Install dependencies:

   ```bash
   cd chip-component
   npm install
   ```

3. Run the development server:

   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the chip component in action.

## Live Demo

Access the live demo hosted at [https://zeptobysivasai.netlify.app/](https://zeptobysivasai.netlify.app/).

## Deadline

The chip component was completed within the specified deadline, and the live demo is available for review.

Feel free to explore the codebase and provide any feedback or suggestions for improvement.
