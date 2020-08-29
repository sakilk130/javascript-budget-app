var budgetController = (function () {
  //
})();

var UIController = (function () {
  //
})();

var appController = (function (budgetCont, uiCont) {
  var controlAddItem = function () {
    console.log("It works");
  };

  document.querySelector(".add__btn").addEventListener("click", controlAddItem);

  document.addEventListener("keypress", function (event) {
    if (event === 13 || event.which === 13) {
      controlAddItem();
    }
  });
})(budgetController, UIController);
