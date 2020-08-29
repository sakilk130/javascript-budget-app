var budgetController = (function () {
  //
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
  var DOM = UICont.getDOMstring();
  var controlAddItem = function () {
    var input = UICont.getInput();
    console.log(input);
  };

  document.querySelector(DOM.addBtn).addEventListener("click", controlAddItem);

  document.addEventListener("keypress", function (event) {
    if (event === 13 || event.which === 13) {
      controlAddItem();
    }
  });
})(budgetController, UIController);
