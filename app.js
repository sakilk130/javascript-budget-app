var budgetController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var calculateTotal = function (type) {
    var sum = 0;
    data.allItem[type].forEach(function (cur) {
      sum += cur.value;
    });
    data.total[type] = sum;
  };
  var data = {
    allItem: {
      exp: [],
      inc: [],
    },
    total: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };
  return {
    addItem: function (type, des, val) {
      var newItem, ID;
      if (data.allItem[type].length > 0) {
        ID = data.allItem[type][data.allItem[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      data.allItem[type].push(newItem);
      return newItem;
    },
    calculateBudget: function () {
      calculateTotal("exp");
      calculateTotal("inc");
      data.budget = data.total.inc - data.total.exp;
      if (data.total.inc > 0) {
        data.percentage = Math.round(data.total.exp / data.total.inc) * 100;
      } else {
        data.percentage = -1;
      }
    },
    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.total.inc,
        totalExp: data.total.exp,
        percentage: data.percentage,
      };
    },
    testing: function () {
      console.log(data);
    },
  };
})();

var UIController = (function () {
  var DOMstring = {
    inputType: ".add__type",
    addDescription: ".add__description",
    addValue: ".add__value",
    addBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstring.inputType).value,
        description: document.querySelector(DOMstring.addDescription).value,
        value: parseFloat(document.querySelector(DOMstring.addValue).value),
      };
    },
    addListItem: function (obj, type) {
      var html, newHtml, element;
      if (type === "inc") {
        element = DOMstring.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        element = DOMstring.expensesContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      newHtml = html.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    clearFields: function () {
      var fields, arrayFields;
      fields = document.querySelectorAll(
        DOMstring.addDescription + "," + DOMstring.addValue
      );
      arrayFields = Array.prototype.slice.call(fields);
      arrayFields.forEach(function (current, index, array) {
        current.value = "";
      });
      arrayFields[0].focus();
    },
    getDOMstring: function () {
      return DOMstring;
    },
  };
})();

var appController = (function (budgetCont, UICont) {
  var setupEventListener = function () {
    var DOM = UICont.getDOMstring();

    document
      .querySelector(DOM.addBtn)
      .addEventListener("click", controlAddItem);
    document.addEventListener("keypress", function (event) {
      if (event === 13 || event.which === 13) {
        controlAddItem();
      }
    });
  };
  var updateBudget = function () {
    budgetCont.calculateBudget();
    var budget = budgetCont.getBudget();
    console.log(budget);
  };

  var controlAddItem = function () {
    var input, newItem;
    input = UICont.getInput();
    if (input.description !== "" && !isNaN(input.value)) {
      newItem = budgetCont.addItem(input.type, input.description, input.value);
      UICont.addListItem(newItem, input.type);
      UICont.clearFields();
      updateBudget();
    }
  };

  return {
    init: function () {
      console.log("App Start");
      setupEventListener();
    },
  };
})(budgetController, UIController);

appController.init();
