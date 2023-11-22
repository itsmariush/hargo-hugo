interface ProductData {
  id: string,
  title: string,
  image: string,
  price: string,
}

interface CartData {
  products: ProductData[],
}

export class Cart {
  private local_storage_key: string;

  constructor(local_storage_key: string = "cart") {
    console.log('loading up cart');
    // get local stored cart data
    this.local_storage_key = local_storage_key;
    const store = localStorage.getItem(local_storage_key);
    if (store) {
      let cartData: CartData = JSON.parse(store);
      this.set_badge(cartData.products.length.toString());
    }

    // add event listener to every "Add To Cart" button
    for (let btn of Array.from(document.querySelectorAll('.add_to_cart'))) {
      btn.addEventListener("click", (e: Event) => {
        const data: ProductData = {
          id: btn.getAttribute("data-item-id") || "",
          title: btn.getAttribute("data-item-name") || "",
          image: btn.getAttribute("data-item-image") || "",
          price: btn.getAttribute("data-item-price") || ""
        }
        this.add_to_cart(data);
      });
    }
  }

  public add_to_cart(product: ProductData) {
    // button click handler
    console.log("add to cart " + product.title)
    const store = localStorage.getItem(this.local_storage_key);
    let cartData: CartData;
    if (store) {
      cartData = JSON.parse(store);
    } else {
      cartData = {
        products: [],
      }
    }
    let num = cartData.products.push(product);
    this.set_badge(num.toString());
    localStorage.setItem(this.local_storage_key, JSON.stringify(cartData));
  }

  private set_badge(num: string) {
    $('#open_cart').find('.badge').text(num);
  }
}
