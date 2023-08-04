type Asset = {
  date: string;
  type: string;
  name: string;
  amount: number;
};

let assets: Asset[] = [];
let totalAmountCashIn : number = 0;
let totalAmountCashOut : number = 0;
let searchQuery : string = "";

function addAsset(event: Event) : void {
  event.preventDefault();

  const assetDateInput = document.getElementById("assetDate") as HTMLInputElement;
  const assetTypeInput = document.getElementById("assetType") as HTMLInputElement;
  const assetNameInput = document.getElementById("assetName") as HTMLInputElement;
  const assetAmountInput = document.getElementById("assetAmount") as HTMLInputElement;

  const date : string = assetDateInput.value;
  const type : string = assetTypeInput.value;
  const name : string = assetNameInput.value;
  const amount : number = parseFloat(assetAmountInput.value);

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

function filterAssets(): Asset[] {
  const filterTypeSelect = document.getElementById("filterType") as HTMLInputElement;
  const filterType : string = filterTypeSelect.value;

  let filteredAssets = [...assets];
  if (filterType) {
    filteredAssets = filteredAssets.filter((asset) => asset.type === filterType);
  }

  if (searchQuery) {
    const lowerCaseSearchQuery : string = searchQuery.toLowerCase();
    filteredAssets = filteredAssets.filter((asset) => asset.name.toLowerCase().includes(lowerCaseSearchQuery));
  }

  return filteredAssets;
}

function displayAssets() : void {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const assetTableBody = document.querySelector("#assetTable tbody") as HTMLTableSectionElement;
  assetTableBody.innerHTML = "";

  const filteredAssets : Asset[]= filterAssets();

  filteredAssets.forEach((asset, i) => {
    const row = document.createElement("tr") as HTMLTableRowElement;

    const dateCell = document.createElement("td") as HTMLTableCellElement;
    dateCell.textContent = asset.date;

    const typeCell = document.createElement("td") as HTMLTableCellElement;
    typeCell.textContent = asset.type;

    const nameCell = document.createElement("td")  as HTMLTableCellElement;
    nameCell.textContent = asset.name;

    const amountCell = document.createElement("td")  as HTMLTableCellElement;
    amountCell.textContent = formatter.format(asset.amount);

    const actionCell = document.createElement("td")  as HTMLTableCellElement;
    const updateButton = document.createElement("button") as HTMLButtonElement;
    updateButton.textContent = "Update";
    updateButton.classList.add("btn", "btn-primary");
    updateButton.addEventListener("click", () => showUpdateDialog(i));
    const deleteButton = document.createElement("button") as HTMLButtonElement;
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
  });
}

function displayTotalAmount() : void {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const cashInTotalElement = document.getElementById("totalCashIn") as HTMLElement;
  cashInTotalElement.textContent = formatter.format(totalAmountCashIn);

  const cashOutTotalElement = document.getElementById("totalCashOut") as HTMLElement;
  cashOutTotalElement.textContent = formatter.format(totalAmountCashOut);

  const balanceCashTotalElement = document.getElementById("balanceCash") as HTMLElement;
  const balanceCash = totalAmountCashIn - totalAmountCashOut;
  balanceCashTotalElement.textContent = formatter.format(balanceCash);
}

function showUpdateDialog(index: number) : void {
  const asset = assets[index];
  const oldAmount : number = asset.amount;

  const newDate : string | null = prompt("Masukkan tanggal baru:", asset.date);
  const newName : string | null= prompt("Masukkan nama baru:", asset.name);
  const newAmountStr : string | null  = prompt("Masukkan jumlah baru:", asset.amount.toString());
  const newAmount : number = newAmountStr !== null ? parseFloat(newAmountStr) : asset.amount;

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

function deleteAsset(index: number) : void {
  const asset = assets[index];
  const confirmDelete : boolean = confirm("Apakah kamu ingin menghapus bagian ini?");
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

function saveDataToLocalStorage() : void {
  localStorage.setItem("assets", JSON.stringify(assets));
  localStorage.setItem("totalAmountCashIn", totalAmountCashIn.toString());
  localStorage.setItem("totalAmountCashOut", totalAmountCashOut.toString());
}

function loadDataFromLocalStorage() : void {
  const assetsData : string | null = localStorage.getItem("assets");
  if (assetsData) {
    assets = JSON.parse(assetsData);
  }

  const totalAmountCashInData : string | null= localStorage.getItem("totalAmountCashIn");
  if (totalAmountCashInData) {
    totalAmountCashIn = parseFloat(totalAmountCashInData);
  }

  const totalAmountCashOutData : string | null = localStorage.getItem("totalAmountCashOut");
  if (totalAmountCashOutData) {
    totalAmountCashOut = parseFloat(totalAmountCashOutData);
  }
}

function clearData() : void{
  const confirmClear : boolean = confirm("Apakah kamu ingin menghapus semua data?");
  if (confirmClear) {
    assets.length = 0;
    totalAmountCashIn = 0;
    totalAmountCashOut = 0;

    saveDataToLocalStorage();
    displayAssets();
    displayTotalAmount();
  }
}

const assetForm = document.getElementById("assetForm") as HTMLElement;
assetForm.addEventListener("submit", addAsset);

const clearDataButton = document.getElementById("clearDataButton") as HTMLElement;
clearDataButton.addEventListener("click", clearData);

const filterTypeSelect = document.getElementById("filterType") as HTMLElement;
filterTypeSelect.addEventListener("change", displayAssets);

const searchInput = document.getElementById("searchInput") as HTMLElement;
searchInput.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  searchQuery = target.value;
  displayAssets();
});

loadDataFromLocalStorage();
displayAssets();
displayTotalAmount();
