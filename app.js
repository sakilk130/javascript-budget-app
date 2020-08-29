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
  var data = {
    allItem: {
      exp: [],
      inc: [],
    },
    total: {
      exp: 0,
      inc: 0,
    },
  };
  return {
    addItem: function (type, des, val) {
      var newItem, ID;
      if (data.allItem[type] > 0) {
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
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstring.inputType).value,
        description: document.querySelector(DOMstring.addDescription).value,
        value: document.querySelector(DOMstring.addValue).value,
      };
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

  var controlAddItem = function () {
    var input, newItem;
    input = UICont.getInput();
    newItem = budgetCont.addItem(input.type, input.description, input.value);
  };

  return {
    init: function () {
      console.log("App Start");
      setupEventListener();
    },
  };
})(budgetController, UIController);

appController.init();
