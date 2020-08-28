var budgetController = (function () {
  var x = 20;
  var add = function (a) {
    return x + a;
  };
  return {
    publicTest: function (b) {
      return add(b);
    },
  };
})();

var UIController = (function () {
  //
})();

var appController = (function (budgetCont, uiCont) {
  var z = budgetCont.publicTest(5);
  return {
    anotherPublic: function () {
      console.log(z);
    },
  };
})(budgetController, UIController);
