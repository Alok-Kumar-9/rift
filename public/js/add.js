let addBtn = document.getElementById("addItem");
let list = document.getElementById("listt");
let alertt = document.getElementById("alertPlace");

let arr = [];

function alert() {
  var wrapper = document.createElement("div");
  wrapper.innerHTML =
    '<div class="alert alert-' +
    "success" +
    ' alert-dismissible" role="alert">' +
    "Order Placed Successfully" +
    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

  alertt.append(wrapper);
}

addBtn.onclick = function () {
  let tty = {
    item: document.getElementById("item").value,
    quantity: document.getElementById("quantity").value,
  };
  document.getElementById("item").value = "";
  document.getElementById("quantity").value = "";
  arr.push(tty);
  list.querySelectorAll("*").forEach((n) => n.remove());
  arr.map(function (uuy, index) {
    let rrr = document.createElement("li");
    rrr.innerText = `${uuy.item}----------${uuy.quantity}`;
    rrr.setAttribute("id", index);
    //rrr.addClass("litemm");
    //console.log(rrr.id);
    list.appendChild(rrr);
  });
};

$("ul[id*=listt] li").click(function () {
  alert($(this).attr("id"));
  console.log(this.id);
});

$("#sendData").click(() => {
  $.ajax({
    url: "/addArr",
    method: "POST",
    dataType: "json",
    data: {
      mobile: mobilee,
      array: arr,
    },
    success: function (response) {
      arr = [];
      list.querySelectorAll("*").forEach((n) => n.remove());
      alert();
      //console.log(response.rre);
    },
    error: function (response) {
      arr = [];
      list.querySelectorAll("*").forEach((n) => n.remove());
      let qqq = document.createElement("div");
      qqq.innerText = `ERROR!!`;
      body.appendChild(qqq);
    },
  });
});
