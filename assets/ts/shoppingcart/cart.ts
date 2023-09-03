export class Cart {
  constructor() {
    console.log('start up cart');
    for (let btn of Array.from(document.querySelectorAll('.add_to_cart'))) {
      btn.addEventListener("click", (e: Event) => { this.add_to_cart(btn.getAttribute("data-item-id") || "") });
    }
  }
  add_to_cart(n: string) {
    // button click handler
    console.log("add to cart " + n)
    let val = parseInt($('#cart').find('.badge').text()) || 0;
    $('#cart').find('.badge').text(val + 1);
  }
}
