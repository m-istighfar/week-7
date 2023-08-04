var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var assets = [];
var totalAmountCashIn = 0;
var totalAmountCashOut = 0;
var searchQuery = "";
function addAsset(event) {
    event.preventDefault();
    var assetDateInput = document.getElementById("assetDate");
    var assetTypeInput = document.getElementById("assetType");
    var assetNameInput = document.getElementById("assetName");
    var assetAmountInput = document.getElementById("assetAmount");
    var date = assetDateInput.value;
    var type = assetTypeInput.value;
    var name = assetNameInput.value;
    var amount = parseFloat(assetAmountInput.value);
    if (!type || !name || !date || isNaN(amount)) {
        alert("Isi semua form dengan benar!");
        return;
    }
    assets.push({ date: date, type: type, name: name, amount: amount });
    if (type === "Kas Masuk") {
        totalAmountCashIn += amount;
    }
    else if (type === "Kas Keluar") {
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
function filterAssets() {
    var filterTypeSelect = document.getElementById("filterType");
    var filterType = filterTypeSelect.value;
    var filteredAssets = __spreadArray([], assets, true);
    if (filterType) {
        filteredAssets = filteredAssets.filter(function (asset) { return asset.type === filterType; });
    }
    if (searchQuery) {
        var lowerCaseSearchQuery_1 = searchQuery.toLowerCase();
        filteredAssets = filteredAssets.filter(function (asset) { return asset.name.toLowerCase().includes(lowerCaseSearchQuery_1); });
    }
    return filteredAssets;
}
function displayAssets() {
    var formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    var assetTableBody = document.querySelector("#assetTable tbody");
    assetTableBody.innerHTML = "";
    var filteredAssets = filterAssets();
    filteredAssets.forEach(function (asset, i) {
        var row = document.createElement("tr");
        var dateCell = document.createElement("td");
        dateCell.textContent = asset.date;
        var typeCell = document.createElement("td");
        typeCell.textContent = asset.type;
        var nameCell = document.createElement("td");
        nameCell.textContent = asset.name;
        var amountCell = document.createElement("td");
        amountCell.textContent = formatter.format(asset.amount);
        var actionCell = document.createElement("td");
        var updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.classList.add("btn", "btn-primary");
        updateButton.addEventListener("click", function () { return showUpdateDialog(i); });
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.addEventListener("click", function () { return deleteAsset(i); });
        actionCell.appendChild(updateButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(dateCell);
        row.appendChild(typeCell);
        row.appendChild(nameCell);
        row.appendChild(amountCell);
        row.appendChild(actionCell);
        assetTableBody.appendChild(row);
    });
}
function displayTotalAmount() {
    var formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
    var cashInTotalElement = document.getElementById("totalCashIn");
    cashInTotalElement.textContent = formatter.format(totalAmountCashIn);
    var cashOutTotalElement = document.getElementById("totalCashOut");
    cashOutTotalElement.textContent = formatter.format(totalAmountCashOut);
    var balanceCashTotalElement = document.getElementById("balanceCash");
    var balanceCash = totalAmountCashIn - totalAmountCashOut;
    balanceCashTotalElement.textContent = formatter.format(balanceCash);
}
function showUpdateDialog(index) {
    var asset = assets[index];
    var oldAmount = asset.amount;
    var newDate = prompt("Masukkan tanggal baru:", asset.date);
    var newName = prompt("Masukkan nama baru:", asset.name);
    var newAmountStr = prompt("Masukkan jumlah baru:", asset.amount.toString());
    var newAmount = newAmountStr !== null ? parseFloat(newAmountStr) : asset.amount;
    if (newName && newDate && !isNaN(newAmount)) {
        asset.date = newDate;
        asset.name = newName;
        asset.amount = newAmount;
        if (asset.type === "Kas Masuk") {
            totalAmountCashIn -= oldAmount;
            totalAmountCashIn += newAmount;
        }
        else if (asset.type === "Kas Keluar") {
            totalAmountCashOut -= oldAmount;
            totalAmountCashOut += newAmount;
        }
        saveDataToLocalStorage();
        displayAssets();
        displayTotalAmount();
    }
    else {
        alert("Invalid input. Update canceled.");
    }
}
function deleteAsset(index) {
    var asset = assets[index];
    var confirmDelete = confirm("Apakah kamu ingin menghapus bagian ini?");
    if (confirmDelete) {
        assets.splice(index, 1);
        if (asset.type === "Kas Masuk") {
            totalAmountCashIn -= asset.amount;
        }
        else if (asset.type === "Kas Keluar") {
            totalAmountCashOut -= asset.amount;
        }
        saveDataToLocalStorage();
        displayAssets();
        displayTotalAmount();
    }
}
function saveDataToLocalStorage() {
    localStorage.setItem("assets", JSON.stringify(assets));
    localStorage.setItem("totalAmountCashIn", totalAmountCashIn.toString());
    localStorage.setItem("totalAmountCashOut", totalAmountCashOut.toString());
}
function loadDataFromLocalStorage() {
    var assetsData = localStorage.getItem("assets");
    if (assetsData) {
        assets = JSON.parse(assetsData);
    }
    var totalAmountCashInData = localStorage.getItem("totalAmountCashIn");
    if (totalAmountCashInData) {
        totalAmountCashIn = parseFloat(totalAmountCashInData);
    }
    var totalAmountCashOutData = localStorage.getItem("totalAmountCashOut");
    if (totalAmountCashOutData) {
        totalAmountCashOut = parseFloat(totalAmountCashOutData);
    }
}
function clearData() {
    var confirmClear = confirm("Apakah kamu ingin menghapus semua data?");
    if (confirmClear) {
        assets.length = 0;
        totalAmountCashIn = 0;
        totalAmountCashOut = 0;
        saveDataToLocalStorage();
        displayAssets();
        displayTotalAmount();
    }
}
var assetForm = document.getElementById("assetForm");
assetForm.addEventListener("submit", addAsset);
var clearDataButton = document.getElementById("clearDataButton");
clearDataButton.addEventListener("click", clearData);
var filterTypeSelect = document.getElementById("filterType");
filterTypeSelect.addEventListener("change", displayAssets);
var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function (event) {
    var target = event.target;
    searchQuery = target.value;
    displayAssets();
});
loadDataFromLocalStorage();
displayAssets();
displayTotalAmount();
