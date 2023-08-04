// Define global variables
const assets = [];
let totalAmountCashIn = 0;
let totalAmountCashOut = 0;
let searchQuery = "";

// Function to add a new asset
function addAsset(event) {
  event.preventDefault();

  const assetDateInput = document.getElementById("assetDate");
  const assetTypeInput = document.getElementById("assetType");
  const assetNameInput = document.getElementById("assetName");
  const assetAmountInput = document.getElementById("assetAmount");

  const date = assetDateInput.value;
  const type = assetTypeInput.value;
  const name = assetNameInput.value;
  const amount = parseFloat(assetAmountInput.value);

  if (!type || !name || !date || isNaN(amount)) {
    alert("Isi semua form dengan benar!");
    return;
  }

  assets.push({ date, type, name, amount });

  if (type === "Kas Masuk") {
    totalAmountCashIn += amount;
  } else if (type === "Kas Keluar") {
    totalAmountCashOut += amount;
  }

  assetDateInput.value = "";
  assetTypeInput.value = "Kas Masuk";
  assetNameInput.value = "";
  assetAmountInput.value = "";

  saveDataToLocalStorage();
  displayAssets();
  displayTotalAmount();
}

//Function to filter asset
function filterAssets() {
  const filterTypeSelect = document.getElementById("filterType");
  const filterType = filterTypeSelect.value;

  let filteredAssets = [...assets];
  if (filterType) {
    filteredAssets = filteredAssets.filter(
      (asset) => asset.type === filterType
    );
  }

  if (searchQuery) {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    filteredAssets = filteredAssets.filter((asset) =>
      asset.name.toLowerCase().includes(lowerCaseSearchQuery)
    );
  }

  return filteredAssets;
}

// Function to display assets in the table
function displayAssets() {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const assetTableBody = document.querySelector("#assetTable tbody");
  assetTableBody.innerHTML = "";

  const filteredAssets = filterAssets();

  for (let i = 0; i < filteredAssets.length; i++) {
    const asset = filteredAssets[i];

    const row = document.createElement("tr");

    const dateCell = document.createElement("td");
    dateCell.textContent = asset.date;

    const typeCell = document.createElement("td");
    typeCell.textContent = asset.type;

    const nameCell = document.createElement("td");
    nameCell.textContent = asset.name;

    const amountCell = document.createElement("td");
    amountCell.textContent = formatter.format(asset.amount);

    const actionCell = document.createElement("td");
    const updateButton = document.createElement("button");
    updateButton.textContent = "Update";
    updateButton.classList.add("btn", "btn-primary");
    updateButton.addEventListener("click", () => showUpdateDialog(i));
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.addEventListener("click", () => deleteAsset(i));

    actionCell.appendChild(updateButton);
    actionCell.appendChild(deleteButton);

    row.appendChild(dateCell);
    row.appendChild(typeCell);
    row.appendChild(nameCell);
    row.appendChild(amountCell);
    row.appendChild(actionCell);

    assetTableBody.appendChild(row);
  }
}

// Function to display total asset amounts
function displayTotalAmount() {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const cashInTotalElement = document.getElementById("totalCashIn");
  cashInTotalElement.textContent = formatter.format(totalAmountCashIn);

  const cashOutTotalElement = document.getElementById("totalCashOut");
  cashOutTotalElement.textContent = formatter.format(totalAmountCashOut);

  const balanceCashTotalElement = document.getElementById("balanceCash");
  const balanceCash = totalAmountCashIn - totalAmountCashOut;
  balanceCashTotalElement.textContent = formatter.format(balanceCash);
}

// Function to show the update dialog for an asset
function showUpdateDialog(index) {
  const asset = assets[index];
  const oldAmount = asset.amount;

  const newDate = prompt("Masukkan tanggal baru:", asset.date);
  const newName = prompt("Masukkan nama baru:", asset.name);
  const newAmount = parseFloat(prompt("Masukkan jumlah baru:", asset.amount));

  if (newName && newDate && !isNaN(newAmount)) {
    asset.date = newDate;
    asset.name = newName;
    asset.amount = newAmount;

    if (asset.type === "Kas Masuk") {
      totalAmountCashIn -= oldAmount;
      totalAmountCashIn += newAmount;
    } else if (asset.type === "Kas Keluar") {
      totalAmountCashOut -= oldAmount;
      totalAmountCashOut += newAmount;
    }

    saveDataToLocalStorage();
    displayAssets();
    displayTotalAmount();
  } else {
    alert("Invalid input. Update canceled.");
  }
}

// Function to delete an asset
function deleteAsset(index) {
  const asset = assets[index];
  const confirmDelete = confirm("Apakah kamu ingin menghapus bagian ini?");
  if (confirmDelete) {
    assets.splice(index, 1);

    if (asset.type === "Kas Masuk") {
      totalAmountCashIn -= asset.amount;
    } else if (asset.type === "Kas Keluar") {
      totalAmountCashOut -= asset.amount;
    }

    saveDataToLocalStorage();
    displayAssets();
    displayTotalAmount();
  }
}

// Function to save data to local storage
function saveDataToLocalStorage() {
  localStorage.setItem("assets", JSON.stringify(assets));
  localStorage.setItem("totalAmountCashIn", totalAmountCashIn);
  localStorage.setItem("totalAmountCashOut", totalAmountCashOut);
}

// Function to load data from local storage
function loadDataFromLocalStorage() {
  const dataAssets = localStorage.getItem("assets");
  if (dataAssets) {
    assets.push(...JSON.parse(dataAssets));
  }

  const dataTotalAmountCashIn = localStorage.getItem("totalAmountCashIn");
  if (dataTotalAmountCashIn) {
    totalAmountCashIn = parseFloat(dataTotalAmountCashIn);
  }

  const dataTotalAmountCashOut = localStorage.getItem("totalAmountCashOut");
  if (dataTotalAmountCashOut) {
    totalAmountCashOut = parseFloat(dataTotalAmountCashOut);
  }
}

// Function to clear all data
function clearData() {
  assets.length = 0;
  totalAmountCashIn = 0;
  totalAmountCashOut = 0;
  localStorage.clear();
  displayAssets();
  displayTotalAmount();
}

// Event listeners
const assetForm = document.getElementById("assetForm");
assetForm.addEventListener("submit", addAsset);

const clearDataButton = document.getElementById("clearDataButton");
clearDataButton.addEventListener("click", clearData);

const filterTypeSelect = document.getElementById("filterType");
filterTypeSelect.addEventListener("change", displayAssets);

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", (event) => {
  searchQuery = event.target.value;
  displayAssets(); // Update the displayed assets whenever the search query changes
});

// Load data from local storage when the app starts
loadDataFromLocalStorage();

// Display assets and total amounts
displayAssets();
displayTotalAmount();
