const products = [
  {
    id: 1,
    description: "Shampo",
    completed: false,
  },
  {
    id: 2,
    description: "Aceite",
    completed: false,
  },
  {
    id: 3,
    description: "Yogurt",
    completed: false,
  },
  {
    id: 4,
    description: "Confort",
    completed: false,
  },
  {
    id: 5,
    description: "Queso",
    completed: false,
  },
];

let lastProductId = 1;

const inputProducts = document.querySelector("#inputProducts");
const inputButton = document.querySelector("#inputButton");
const displayTotalProducts = document.querySelector("#displayTotalProducts");
const displayCompletedProducts = document.querySelector("#displayCompletedProducts");
const productList = document.querySelector("#productList");

const productsHtml = ({ id, description, completed }) => {
  const htmlDOM = `
        <tr data-id="${id}" class="${completed ? "product-completed" : ""}">
          <td class="product-id">${id}</td>
          <td>${description}</td>
          <td>
            <div class="checkbox-input">
              <input class="input-check-completed" type="checkbox" ${
                completed ? "checked" : ""
              }/>
            </div>
          </td>
          <td>
            <button class="btn-delete">Archivar</button>
          </td>
        </tr>
      `;
  return htmlDOM;
};

const updateProductInfo = () => {
  displayTotalProducts.textContent = products.length;
  displayCompletedProducts.textContent = products.filter((products) => {
    return products.completed;
  }).length;
};

const newTable = () => {
  const productsElements = products.reduce((prev, products) => {
    const htmlDOM = productsHtml(products);
    return (prev += htmlDOM);
  }, "");

  const finalProduct = `
      <table class="products-table">
        <tr>
          <th>ID|</th>
          <th class="product" colspan="3">|Tarea</th>
        </tr>
        ${productsElements}
      </table>
    `;
  productList.innerHTML = finalProduct;
  applyChanges();
  updateProductInfo();
};

const deleteProducts = (index) => {
  products.splice(index, 1);
};

const changeProductState = (id, value) => {
  const objState = findProduct(id);
  if (objState) {
    objState.completed = value;
  } else {
    alert(`No se encontro tarea de id: ${id} en el arreglo de tareas`);
  }
  const productInDOM = findProductRowById(id);
  if (productInDOM) {
    productInDOM.classList.toggle("product-completed", value);
  } else {
    alert(`No se encontro id: ${id} en el DOM`);
  }
  updateProductInfo();
};

const taskDeleteHandler = (ev) => {
  const btn = ev.target;
  const idToRemove = Number(btn.parentElement.parentElement.dataset.id);
  const productsToRemove = products.findIndex((products) => {
    return products.id === idToRemove;
  });
  if (productsToRemove === -1) {
    alert("No se encuentra el producto correspondiente");
    return;
  }
  deleteProducts(productsToRemove);
  newTable();
};

const inputCompletedHandler = (ev) => {
  const inputCheck = ev.target;
  const idToChange = Number(
    inputCheck.parentElement.parentElement.parentElement.dataset.id
  );
  changeProductState(idToChange, inputCheck.checked);
};

const applyChanges = () => {
  const deleteButtons = document.querySelectorAll(".btn-delete");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", taskDeleteHandler);
  });
  const inputChecks = document.querySelectorAll(".input-check-completed");
  inputChecks.forEach((check) => {
    check.addEventListener("click", inputCompletedHandler);
  });
};

const findProduct = (id) => {
  for (let i = 0; i < products.length; ++i) {
    const duct = products[i];
    if (duct.id === id) {
      return duct;
    }
  }
  return null;
};

const findProductRowById = (id) => {
  const allList = document.querySelectorAll(".products-table tr");
  for (let i = 0; i < allList.length; ++i) {
    const duct = allList[i];
    if (Number(duct.dataset.id) === id) {
      return duct;
    }
  }
  return null;
};

const addProductUser = (dsct) => {
  products.push({
    id: lastProductId++,
    description: dsct,
    completed: false,
  });
  newTable();
};

const addProductsconfi = () => {
  const length = products.length;
  lastProductId = length + 1;
  newTable();
};

const stdSetup = () => {
  addProductsconfi();
  inputButton.addEventListener("click", (ev) => {
    const dsct = inputProducts.value.trim();
    if (!dsct.length) {
      alert("Nueva tarea necesita minimo 1 palabra.");
      return;
    }
    addProductUser(dsct);
  });
};
stdSetup();
