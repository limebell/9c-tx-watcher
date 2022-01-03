/******************************************************************************
 *                          Fetch and display transactions
 ******************************************************************************/

var TransactionStatus = [
  '<span style="color:orange">Pending1</span>',
  '<span style="color:blue">Staged</span>',
  '<span style="color:purple">Pending2</span>',
  '<span style="color:green">Included</span>',
  '<span style="color:red">Discarded</span>',
];

displayAddresses();
displayNextNonce();
displayTransactions();

function displayAddresses() {
  httpGet("/api/transactions/addresses")
    .then((response) => response.json())
    .then((response) => {
      var sourceAddress = response?.sourceAddress;
      var targetAddress = response?.targetAddress;
      var addressesAnchor = document.getElementById("addresses-anchor");
      addressesAnchor.innerHTML = `<div class="addresses-view">
                                    <div>Source: ${sourceAddress}</div>
                                    <div>Target: ${targetAddress}</div>
                                  </div>`;
    });
}

function displayNextNonce() {
  httpGet("/api/transactions/nonce")
    .then((response) => response.json())
    .then((response) => {
      var nextNonceAnchor = document.getElementById("next-nonce-anchor");
      nextNonceAnchor.innerHTML = `<div class="next-nonce-view">
                                    <div>${response?.nextTxNonce}</div>
                                  </div>`;
    });
}

function displayTransactions() {
  httpGet("/api/transactions/all")
    .then((response) => response.json())
    .then((response) => {
      var stagedTransactions = response.stagedTransactions;
      var allTransactions = response.transactions;
      var stagedTransactionsAnchor = document.getElementById(
        "staged-transactions-anchor"
      );
      var innerHTML = `<table><thead><tr class="table-header">
        <th>Transaction Id</th>
        <th>Nonce</th>
        <th>Actions</th>
        <th>Created At</th>
        <th>Status</th>
      </tr></thead><tbody>`;
      stagedTransactions.forEach((transaction) => {
        innerHTML += getTransactionAsTableRow(transaction);
      });
      innerHTML += "</tbody></table>";
      stagedTransactionsAnchor.innerHTML = innerHTML;

      var allTransactionsAnchor = document.getElementById(
        "all-transactions-anchor"
      );
      innerHTML = `<table><thead><tr>
        <th>Transaction Id</th>
        <th>Nonce</th>
        <th>Actions</th>
        <th>Created At</th>
        <th>Status</th>
      </tr></thead><tbody>`;
      allTransactions.forEach((transaction) => {
        innerHTML += getTransactionAsTableRow(transaction);
      });
      innerHTML += "</tbody></table>";
      allTransactionsAnchor.innerHTML = innerHTML;
    });
}

function getTransactionAsTableRow(transaction) {
  let status = TransactionStatus[transaction.status];
  if (transaction.status == 0) {
    const elapsed = new Date() - new Date(transaction.createdAt);
    status =
      status +
      '<br><span style="font-weight:lighter;font-size:smaller">(for ' +
      elapsed / 1000 +
      " seconds)</span>";
  }
  return `<tr>
    <td class="txId">${transaction.txId}</td>
    <td>${transaction.nonce}</td>
    <td>${transaction.actions}</td>
    <td>${transaction.createdAt}</td>
    <td class="status">${status}</td>
  </tr>`;
}

function httpGet(path) {
  return fetch(path, getOptions("GET"));
}

function httpPost(path, data) {
  return fetch(path, getOptions("POST", data));
}

function httpPut(path, data) {
  return fetch(path, getOptions("PUT", data));
}

function httpDelete(path) {
  return fetch(path, getOptions("DELETE"));
}

function getOptions(verb, data) {
  var options = {
    dataType: "json",
    method: verb,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  if (data) {
    options.body = JSON.stringify(data);
  }
  return options;
}
