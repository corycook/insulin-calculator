function debounce(fn, ms) {
  var id;
  return function() {
    var context = this;
    var args = arguments;
    var handler = function() {
      fn.apply(context, args);
    };
    clearTimeout(id);
    id = setTimeout(handler, ms);
  };
}

function $(id) {
  return document.getElementById(id);
}

function getValues(level) {
  // before 8pm
  if (new Date().getHours() < 20) {
    if (level >= 200) {
      return { ounces: 0, tablets: 0, message: "Go for a walk. Ask mom." };
    } else if (level >= 120) {
      return { ounces: 0, tablets: 0, message: "Go for a walk." };
    } else if (level >= 80) {
      return { ounces: 0, tablets: 0, message: "Good. No action." };
    } else if (level >= 70) {
      return { ounces: 2, tablets: 1 };
    } else if (level >= 60) {
      return { ounces: 4, tablets: 4 };
    }
    return { ounces: 8, tablets: 8 };
  }
  if (level >= 140) {
    return { ounces: 0, tablets: 0, message: "Ask mom." };
  } else if (level >= 100) {
    return { ounces: 0, tablets: 0, message: "Good. No action." };
  } else if (level >= 90) {
    return { ounces: 1, tablets: 1 };
  } else if (level >= 70) {
    return { ounces: 2, tablets: 1 };
  } else if (level >= 60) {
    return { ounces: 4, tablets: 4 };
  }
  return { ounces: 8, tablets: 8 };
}

function changeGlucose(event) {
  const val = event.target.value;
  var values = getValues(val);
  if (val > 999) {
    values = { units: 0, message: "Number too high. Try again." };
    val = "";
  }
  $("glucoseLevel").innerHTML = val || 0;
  $("ounces").innerHTML = values.ounces;
  $("tablets").innerHTML = values.tablets;
  $("message").innerHTML = values.message || "";
  $("ouncesMessage").classList.toggle("hide", values.ounces === 0);
}

var onChangeGlucose = debounce(changeGlucose, 500);
