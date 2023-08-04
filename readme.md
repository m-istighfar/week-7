# Financial Tracker Application

## Introduction

The Financial Tracker Application is a web-based tool developed using JavaScript, HTML, and CSS technologies that provide a simple and efficient way to keep track of your financial transactions. This application is aimed at helping individuals manage their finances by allowing them to record, update, and monitor their income and expenditures.

**Key Aspects of the Application:**

1. The application provides a user-friendly interface that requires minimal technical knowledge for operation.
2. It uses the local storage of your web browser to store the transaction data. Therefore, your transaction history is preserved between browser sessions.
3. It's important to note that while local storage is convenient for storing data, it should not be used for highly sensitive information as the data can be cleared if the browser cache is cleared.

This application includes a specific sequence of operations that are represented in the form of a flowchart. This sequence starts from the initialization of the application and ends with the user successfully performing various operations like adding, updating, deleting, or filtering transactions.

![flowchart](/.flow.png)

## Features

### 1. Add Transactions

The main function of this application is to enable users to add their financial transactions. For each transaction, you must provide the following details:

- Date of the transaction.
- Type of the transaction, which can be either 'Kas Masuk' (Income) or 'Kas Keluar' (Expense).
- The name or description of the transaction.
- The amount involved in the transaction.

### 2. Display Transactions

The application will display all your transactions in a tabular format. This table provides a comprehensive view of your income and expenses, allowing you to monitor your transactions easily.

### 3. Display Total Amounts

The application automatically calculates and displays the total amounts of your income and expenses. It also shows the balance, which is the difference between your total income and total expenses.

### 4. Filter and Search Transactions

Filtering and search functionalities allow you to easily find specific transactions. You can filter the transactions based on their type ('Kas Masuk' or 'Kas Keluar'). In addition, the search feature allows you to find transactions by their names.

### 5. Update Transactions

If you have entered incorrect information for a transaction, you can update the details using the 'Update' function. The application will prompt you to enter the updated details, and the changes will be reflected immediately in your transaction list.

### 6. Delete Transactions

If you wish to remove a particular transaction from your list, you can do so using the 'Delete' function.

### 7. Clear All Data

If you wish to clear all transaction data, you can use the 'Clear All' function. This will remove all transaction data from the application as well as from the local storage of your browser.

## Setup and Installation

Setting up and installing the Financial Tracker Application is straightforward. Here are the steps:

1. **Get the source code:** Clone the GitHub repository or download the source code of the application to your computer.
2. **Run the application:** Find the HTML file in the downloaded source code and open it in your preferred web browser.

There are no additional dependencies or databases to set up for this application.

## How to Use the Application

Here are the detailed instructions for using the application:

### 1. Adding a Transaction

- Fill out all the fields in the form, including the date of the transaction, type (income or expenses), name, and amount.
- Click on the 'Submit' button to add the transaction to the list.

### 2. Updating a Transaction

- Find the transaction you want to update in the list.
- Click on the 'Update' button next to the transaction.
- In the pop-up dialog, enter the updated date, name, and amount.

### 3. Deleting a Transaction

- Find the transaction you want to delete in the list.
- Click on the 'Delete' button next to the transaction.
- A confirmation dialog will appear. Click on 'OK' to delete the transaction.

### 4. Searching for Transactions

- Enter your search query into the search bar at the top of the transaction list.
- The application will filter the list and display only those transactions whose names contain the search query.

### 5. Filtering Transactions

- Select a type ('Kas Masuk' or 'Kas Keluar') from the drop-down menu at the top of the transaction list.
- The application will filter the list and display only transactions of the selected type.

### 6. Clearing All Transactions

- Click on the 'Clear All' button to remove all transactions from the list and clear all data from the local storage.

## Contributing to the Project

If you are interested in improving this application, you are welcome to contribute. You can contribute by adding new features, fixing bugs, improving the user interface, or any other improvements you can think of. Here is the basic workflow for contributing:

1. Fork the GitHub repository to your own account.
2. Clone your fork to your local machine.
3. Make your changes in a separate branch.
4. Test your changes to ensure they work correctly and don't introduce new bugs.
5. Push your changes to your fork.
6. Submit a pull request to the original repository.

## License

The Financial Tracker Application is open-source software, released under the MIT License. This means you are free to use, modify, and distribute the application under the terms of this license.

## Contact

If you have any questions, issues, or suggestions regarding the application, please feel free to contact us. We are always open to feedback and eager to help users get the most out of our application.

## Disclaimer

While this application uses the browser's local storage for data persistence, it is not intended to be a secure or permanent data storage solution. Please do not use this application to store sensitive or critical financial information. The developers will not be responsible for any data loss or security issues.
