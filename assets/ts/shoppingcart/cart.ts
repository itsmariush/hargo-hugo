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
  private key: string;

  constructor(key: string = "cart") {
    console.log('loading up cart');
    this.key = key;
    const store = localStorage.getItem(key);
    if (store) {
      let cartData: CartData = JSON.parse(store);
      this.set_badge(cartData.products.length.toString());
    }
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
    const store = localStorage.getItem(this.key);
    let cartData: CartData;
    if(store) {
      cartData = JSON.parse(store);
    } else {
      cartData = {
        products: [],
      }
    }
    let num = cartData.products.push(product);
    this.set_badge(num.toString());
    localStorage.setItem(this.key, JSON.stringify(cartData));
  }

  private set_badge(num: string) {
    $('#cart').find('.badge').text(num);
  }
}
