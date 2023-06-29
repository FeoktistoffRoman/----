function getValue(arr) {
  try {
    arr.sort(sortingName);
    function sortingName(a, b) {
      if (a.name === b.name) {
        return 0;
      } else {
        return a.name < b.name ? -1 : 1;
      }
    }
    console.log([...arr]);
    arr.sort(sortingPrice);
    function sortingPrice(a, b) {
      return a.price - b.price;
    }
    console.log(arr);
  } catch (err2) {
    alert("ошибка!");
  }
}
const krData = (brand_item, type_item) => {
  try {
    brand_item = document.getElementById("marka").value;
    type_item = document.getElementById("product").value;
    url = fetch(
      `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand_item}&product_type=${type_item}`
    );
    let promise = new Promise((resolve, reject) => {
      resolve(url), reject;
    });
    promise
      .then(
        (result) => {
          console.log(`Статус: ` + result.status);
          return result.json();
        },
        (error) => {
          console.log("Error!");
        }
      )
      .then((data) => {
        getValue(data);
        for (let i = 0; i < data.length; i++) {
          const doc = document.querySelector(".prod_inf");
          const brandName = `<p>Название бренда: ${brand_item} <br/> Название продукта: ${data[i].name}`;
          const price = `<p>Цена: ${data[i].price}`;
          if (data.length > 0) {
            const itemImage = `<img src = "${data[i].image_link}"> <br/> <p>Изображение продукта</p>`;
            doc.insertAdjacentHTML("beforeend", brandName);
            doc.insertAdjacentHTML("beforeend", price);
            doc.insertAdjacentHTML("beforeend", itemImage);
          } else {
            doc.insertAdjacentHTML("beforeend", `<p>Нет данных</p>`);
          }
        }
      });
  } catch (err) {
    console.error(`Возникла ошибка: ${err}. Напишите в техподдержку`);
  }
};
