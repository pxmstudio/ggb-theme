document.addEventListener("DOMContentLoaded",async()=>{if(console.log("Script loaded"),!supabase){console.error("Supabase has not been initialized");return}const e=supabase.createClient("https://jafmuleopzozznyqaqyc.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphZm11bGVvcHpvenpueXFhcXljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwMzI2MjksImV4cCI6MjA0MDYwODYyOX0.QXnxsND4JDqfDWzJ5tdXOehsSpShm7P7NgjjjV4RERE"),i=document.getElementById("add-to-wishlist-btn");if(i){const t=i.firstElementChild,l=i.lastElementChild,a=i.dataset.productHandle,d=i.dataset.customerId;let c=await v(e,Number(d)),s=!1;c&&c.length>0&&(s=!0,c[0].product_handles.find(m=>m===a)&&(t.setAttribute("fill","#FF0000"),l.textContent="În lista de favorite")),i.addEventListener("click",async()=>{if(s)console.log(`Added product ${a} to wishlist ${c[0].id} for customer ${d}`),t.setAttribute("fill","#FF0000"),l.textContent="În lista de favorite",await _(e,Number(d),c[0].id,a);else{const u=await C(e,Number(d),"New wishlist");console.log(u),u&&u.length>0&&(console.log(`Added product ${a} to a new wishlist ${u[0].id} for customer ${d}`),t.setAttribute("fill","#FF0000"),l.textContent="În lista de favorite",s=!0,await _(e,Number(d),u[0].id,a))}});return}const n=document.getElementById("container");if(!n){console.log("Wishlists container is missing");return}const p=Number(n.dataset.customerId),h=new URLSearchParams(window.location.search).get("id");if(h){const t=await I(e,h,p);console.log(t);const l=`
        <div pxm-wishlist="detail">
          <input type="hidden" id="wishlist-product-ids" value="">
          <div class="flex items-center gap-2 mb-6">
            <a
              href="/pages/wishlist"
              class="font-medium text-text-secondary global-transition hover:text-text-primary"
              pxm-wishlist-detail="back"
            >
              Favorite
            </a>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="text-text-primary"
            >
              <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h3 class="font-medium text-text-primary" pxm-wishlist-detail="title">${t[0].name}</h3>
          </div>
          <div class="flex items-center justify-between gap-4 mb-12">
            <h2 class="heading-h4 text-text-primary" pxm-wishlist-detail="title">${t[0].name}</h2>
            <div class="flex items-center gap-3">
              <button
                type="button"
                class="border border-border-primary bg-bg-primary inline-flex items-center gap-4 py-3 px-4 rounded-[3rem] font-semibold text-lg leading-none text-text-primary global-transition hover:bg-bg-secondary"
                pxm-wishlist-detail="btn-edit"
              >
                Editează
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class=""
                >
                  <path d="M11 4.49998H6.8C5.11984 4.49998 4.27976 4.49998 3.63803 4.82696C3.07354 5.11458 2.6146 5.57353 2.32698 6.13801C2 6.77975 2 7.61983 2 9.29998V17.7C2 19.3801 2 20.2202 2.32698 20.862C2.6146 21.4264 3.07354 21.8854 3.63803 22.173C4.27976 22.5 5.11984 22.5 6.8 22.5H15.2C16.8802 22.5 17.7202 22.5 18.362 22.173C18.9265 21.8854 19.3854 21.4264 19.673 20.862C20 20.2202 20 19.3801 20 17.7V13.5M7.99997 16.5H9.67452C10.1637 16.5 10.4083 16.5 10.6385 16.4447C10.8425 16.3957 11.0376 16.3149 11.2166 16.2053C11.4184 16.0816 11.5914 15.9086 11.9373 15.5627L21.5 5.99998C22.3284 5.17156 22.3284 3.82841 21.5 2.99998C20.6716 2.17156 19.3284 2.17155 18.5 2.99998L8.93723 12.5627C8.59133 12.9086 8.41838 13.0816 8.29469 13.2834C8.18504 13.4624 8.10423 13.6574 8.05523 13.8615C7.99997 14.0917 7.99997 14.3363 7.99997 14.8255V16.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

              </button>
              <button
                type="button"
                class="border border-border-primary bg-bg-primary inline-flex items-center gap-4 py-3 px-4 rounded-[3rem] font-semibold text-lg leading-none text-text-primary global-transition hover:bg-bg-secondary"
                pxm-wishlist-detail="btn-delete"
                id="delete-btn-${h}"
              >
                Șterge lista
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class=""
                >
                  <path d="M9.5 3.5H15.5M3.5 6.5H21.5M19.5 6.5L18.7987 17.0193C18.6935 18.5975 18.6409 19.3867 18.3 19.985C17.9999 20.5118 17.5472 20.9353 17.0017 21.1997C16.382 21.5 15.5911 21.5 14.0093 21.5H10.9907C9.40891 21.5 8.61803 21.5 7.99834 21.1997C7.45276 20.9353 7.00009 20.5118 6.69998 19.985C6.35911 19.3867 6.3065 18.5975 6.20129 17.0193L5.5 6.5M10.5 11V16M14.5 11V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-5" pxm-wishlist-detail="products">
            
          </div>
        </div>
      `;n.innerHTML=l;const a=await M();window.shopCurrency=a,t&&t[0]&&t[0].product_handles&&t[0].product_handles.length>0&&t[0].product_handles.forEach(async c=>{const s=await y(c);if(s){const u=`
                        <a href="${s.url}" class="w-full h-full group" pxm-product="item">
                          <div class="w-full aspect-square relative rounded-2xl overflow-hidden border border-border-primary">
                            <img
                              src="${s.featured_image}"
                              width="auto"
                              height="300"
                              class="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full group-hover:scale-110 global-transition"
                              pxm-product="image"
                            >
                            ${s.compare_at_price>s.price?`
                              <span
                                class="absolute top-0 left-0 bg-error-red text-white px-2 py-1 rounded-br-2xl text-sm font-medium"
                                pxm-product="discount"
                              >
                                Reducere ${Math.round((s.compare_at_price-s.price)*100/s.compare_at_price)}%
                              </span>
                              `:""}
                          </div>
                          <div class="pt-4">
                            <h3 class="text-text-primary lg:text-lg font-semibold leading-normal mb-2" pxm-product="title">
                              ${s.title}
                            </h3>
                            <div class="flex items-center gap-4">
                              <p class="text-text-secondary lg:text-lg font-semibold line-through" pxm-product="compare-price">
                                 ${k(s.compare_at_price)} ${a}
                              </p>
                              <p
                                class="${s.compare_at_price>s.price?"text-error-red":"text-text-primary"} font-semibold lg:text-lg"
                                pxm-product="price"
                              >
                                ${k(s.price)} ${a}
                              </p>
                            </div>
                          </div>
                        </a>
                    `,m=n.querySelector('[pxm-wishlist-detail="products"]');m&&(m.innerHTML+=u)}});const d=n.querySelector(`#delete-btn-${h}`);d&&d.addEventListener("click",async()=>{await x(Number(h)),window.location.replace("/pages/wishlist")});return}const g=await v(e,p),$=`
    <div class="wishlist-index">
      <div class="flex lg:justify-end lg:items-end">
        <button
          type="button"
          class="border border-border-primary bg-bg-primary inline-flex items-center gap-4 py-3 px-4 rounded-[3rem] font-semibold text-lg leading-none text-text-primary global-transition hover:bg-bg-secondary mb-8"
          pxm-wishlist-index="btn-add"
          id="add-new-wishlist-btn"
        >
          Adauga o listă nouă
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class=""
          >
            <path d="M12 5.5V19.5M5 12.5H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

        </button>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5" id="grid-wishlists">

      </div>
    </div>
    `;n.innerHTML=$;const f=n.querySelector("#add-new-wishlist-btn");f&&f.addEventListener("click",async()=>{await C(e,p,"New wishlist"),window.location.reload()}),g&&g.length>0&&g.forEach(async t=>{const l=t.product_handles?t.product_handles.length:0;let a="",d=0;for(let w=0;w<l&&d!==4;w++){const b=await y(t.product_handles[w]);b&&(a+=`<img
                      src="${b.featured_image}"
                      alt="${b.title}"
                      width="200"
                      height="200"
                      class="w-[200px] h-[200px] object-cover"
                    >`,d+=1)}const c=document.getElementById("grid-wishlists");if(!c){console.error("Grid wishlists is missing");return}const s=`
        <div class="bg-bg-secondary rounded-lg p-3 relative" pxm-wishlist="item-${t.id}">
          <a href="/pages/wishlist?id=${t.id}">
              <div
                class="hover:cursor-pointer aspect-square rounded-[0.25rem] overflow-hidden border border-border-primary relative"
                pxm-wishlist="image-wrapper"
              >
                <div class="grid grid-cols-2 gap-2">
                  ${a}
                </div>
                
                ${l-d>0?`
                  <div
                    class="z-10 absolute top-0 bottom-0 left-0 right-0 bg-[rgba(31,35,91,0.2)] flex items-center justify-center"
                    pxm-wishlist="image-overlay"
                  >
                    <div
                        class="bg-bg-primary border border-border-primary py-1 px-3 rounded-3xl text-text-primary font-medium"
                        pxm-wishlist="image-overlay-btn"
                      >
                    +${l-d} produse
                  </div>
                  </div>
                    `:""}
                
              </div>
            <div class="flex items-center justify-between">
                <p class="py-5 font-semibold lg:text-xl text-text-primary" pxm-wishlist="title">${t.name}</p>
            </div>
          </a>
          <button
              type="button"
              class="w-12 h-12 rounded-full bg-bg-primary border border-border-primary flex items-center justify-center z-10 absolute right-0 bottom-0"
              pxm-wishlist="btn-delete-${t.id}"
              data-wishlist-id="${t.id}"
              id="delete-btn-${t.id}"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class=""
              >
                <path d="M9.5 3.5H15.5M3.5 6.5H21.5M19.5 6.5L18.7987 17.0193C18.6935 18.5975 18.6409 19.3867 18.3 19.985C17.9999 20.5118 17.5472 20.9353 17.0017 21.1997C16.382 21.5 15.5911 21.5 14.0093 21.5H10.9907C9.40891 21.5 8.61803 21.5 7.99834 21.1997C7.45276 20.9353 7.00009 20.5118 6.69998 19.985C6.35911 19.3867 6.3065 18.5975 6.20129 17.0193L5.5 6.5M10.5 11V16M14.5 11V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
        </div>
      `,u=document.createElement("div");u.innerHTML=s,c.appendChild(u.firstElementChild);const m=c.querySelector(`#delete-btn-${t.id}`);m&&m.addEventListener("click",async()=>{await x(t.id),window.location.reload()})});async function x(t){try{const{data:l,error:a}=await e.rpc("delete_wishlist",{customer_id:p.toString(),wishlist_id:Number(t)});if(console.log(l),a)throw a;return l}catch(l){return console.error(l.message),null}}});async function y(o){try{const r=await fetch(`/products/${o}.js`),e=await r.json();if(!r.ok)throw new Error("Network response was not ok");return e}catch(r){return console.error(r.message),null}}async function I(o,r,e){try{const{data:i,error:n}=await o.rpc("fetch_wishlist",{customer_id:e.toString(),wishlist_id:Number(r)});if(n)throw n;return i}catch(i){return console.error(i.message),null}}async function v(o,r){try{const{data:e,error:i}=await o.rpc("fetch_wishlists",{customer_id:r.toString()});if(i)throw i;return e}catch(e){return console.error(e.message),null}}async function M(){try{const o=await fetch("/cart.js"),r=await o.json();if(!o.ok)throw new Error("Network response was not ok");return r.currency}catch(o){return console.error(o.message),null}}async function C(o,r,e){try{const{data:i,error:n}=await o.rpc("create_wishlist",{customer_id:r.toString(),wishlist_name:e});if(n)throw n;return i}catch(i){return console.error(i.message),null}}async function _(o,r,e,i){try{const{data:n,error:p}=await o.rpc("add_product_to_wishlist",{customer_id:r.toString(),wishlist_id:e,product_handle:i});if(p)throw p;return n}catch(n){return console.error(n.message),null}}function k(o){const r=(o/100).toFixed(2);return r.endsWith(".00")?r.slice(0,-3):r}
