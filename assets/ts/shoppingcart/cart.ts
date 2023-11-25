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
    // setup url hash change listener
    window.addEventListener("hashchange", this.handleHashChange);
    this.handleHashChange();
    // set modal listeners
    $('#cart_modal').on('hide.bs.modal', () => {
      window.location.hash = "";
    });
    $('#cart_modal').on('show.bs.modal', () => {
      this.display_products();
    });

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

  private handleHashChange() {
    const n_hash = window.location.hash;
    if (n_hash === "#cart") {
      $('#cart_modal').modal();
    }
  }

  private display_products() {
    const store = localStorage.getItem(this.local_storage_key);
    if (store) {
      let cartData: CartData = JSON.parse(store);
      cartData.products.forEach(element => {
        this.create_table_entry(element.id, element.image, element.price, element.title);
      });
    }
  }

  private create_table_entry(id: string, image: string, price: string, title: string) {
    // TODO: render elements from localStorage in modal
    console.log("display products");
    // Create a table row element
    const tableRow = document.createElement('tr');
    tableRow.setAttribute('id', id);

    // Create th element
    const tableHeader = document.createElement('th');
    tableHeader.setAttribute('scope', 'row');

    // Create div with class="d-flex align-items-center"
    const flexContainer = document.createElement('div');
    flexContainer.className = 'd-flex align-items-center';

    // Create img element
    const imgElement = document.createElement('img');
    imgElement.src = image;
    imgElement.className = 'img-fluid rounded-3';
    imgElement.style.width = '90px';
    imgElement.alt = 'Book';

    // Create div with class="flex-column ms-4"
    const divFlexColumn = document.createElement('div');
    divFlexColumn.className = 'flex-column ms-4';

    // Create paragraph elements
    const titleParagraph = document.createElement('p');
    titleParagraph.className = 'mb-2';
    titleParagraph.textContent = title;

    const authorParagraph = document.createElement('p');
    authorParagraph.className = 'mb-0';
    authorParagraph.textContent = 'Daniel Kahneman';

    // Append paragraphs to flex-column div
    divFlexColumn.appendChild(titleParagraph);
    divFlexColumn.appendChild(authorParagraph);

    // Append img and flex-column div to the d-flex align-items-center div
    flexContainer.appendChild(imgElement);
    flexContainer.appendChild(divFlexColumn);

    // Append the d-flex align-items-center div to the th element
    tableHeader.appendChild(flexContainer);

    // Create td elements
    const td1 = document.createElement('td');
    td1.className = 'align-middle';
    const td1Paragraph = document.createElement('p');
    td1Paragraph.className = 'text-center';
    td1Paragraph.textContent = '1';
    td1.appendChild(td1Paragraph);

    const td2 = document.createElement('td');
    td2.className = 'align-middle';
    const td2Paragraph = document.createElement('p');
    td2Paragraph.className = 'mb-0';
    td2Paragraph.style.fontWeight = '500';
    td2Paragraph.textContent = price;
    td2.appendChild(td2Paragraph);

    // Append th and tds to the table row
    tableRow.appendChild(tableHeader);
    tableRow.appendChild(td1);
    tableRow.appendChild(td2);

    // Append the table row to an existing table or container element
    // For example, assuming you have a table with id="myTable"
    const tableContainer = document.getElementById('cart_body');
    if (tableContainer) {
      tableContainer.appendChild(tableRow);
    }

  }

}
