let fullData = [];
let showingTop = true;
function table(cell) {
  const tables = document.createElement("table");
  tables.className = "table table-bordered text-center container";
  const tHead = document.createElement("thead");
  tHead.className = "table-info";
  const tableRowThead = document.createElement("tr");
  const tableDataThead = document.createElement("th");
  tableDataThead.textContent = "Name";
  tableDataThead.scope = "col";
  const tableDataThead2 = document.createElement("th");
  tableDataThead2.textContent = "Score";
  tableDataThead2.scope = "col";
  tableRowThead.append(tableDataThead, tableDataThead2);
  tHead.append(tableRowThead);
  const tBody = document.createElement("tbody");
  for (const info of cell) {
    const tableRow = document.createElement("tr");
    const tableData = document.createElement("td");
    tableData.textContent = info.name;
    const tableData2 = document.createElement("td");
    tableData2.textContent = info.score;
    tableRow.append(tableData, tableData2);
    tBody.append(tableRow);
  }

  tables.append(tHead, tBody);
  document.querySelector("#parent").innerHTML = "";
  document.querySelector("#parent").append(tables);
}

function highestScore(arr) {
  let id = arr[0].id;
  let biggest = arr[0].score;
  for (const i of arr) {
    if (i.score > biggest) {
      biggest = i.score;
      id = i.id;
    }
  }
  return id;
}
function lowesScore(arr) {
  let id = arr[0].id;
  let lowest = arr[0].score;
  for (const i of arr) {
    if (i.score < lowest) {
      lowest = i.score;
      id = i.id;
    }
  }
  return id;
}
function topTen(data) {
  const array = [];
  for (let i = 0; i < 10; i++) {
    if (data.length === 0) {
      break;
    }
    let temp = highestScore(data);
    let index = data.findIndex((item) => item.id === temp);
    let removedItem = data.splice(index, 1);
    array.push(removedItem[0]);
  }
  return array;
}
function lessTen(data) {
  const array = [];
  for (let i = 0; i < 10; i++) {
    if (data.length === 0) {
      break;
    }
    let temp = lowesScore(data);
    let index = data.findIndex((item) => item.id === temp);
    let removedItem = data.splice(index, 1);
    array.push(removedItem[0]);
  }
  return array.sort((a, b) => b.score - a.score);
}
async function userData() {
  try {
    if (fullData.length === 0) {
      const getData = await axios.get(
        "https://68738976c75558e273547c3d.mockapi.io/users_info"
      );
      const { data } = await getData;
      fullData = [...data];
    }
    if (showingTop) {
      const betsPlayer = topTen([...fullData]);
      table(betsPlayer);
      btn.textContent = "Show Lowest Scores";
    } else {
      const lowestPlayer = lessTen([...fullData]);
      table(lowestPlayer);
      btn.textContent = "Show Highest Scores";
    }
    showingTop = !showingTop;
  } catch (error) {
    console.error(error);
  }
}

const btn = document.querySelector("#renderTable");
btn.addEventListener("click", userData);
document.querySelector("#home-btn").addEventListener("click", () => {
  location.href = "../Home-page/Home.html";
});
