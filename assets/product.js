class p{constructor(t){Object.defineProperty(this,"config",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"currentValue",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.config=t,this.currentValue=parseInt(this.config.input.value)||0,this.init()}init(){this.config.decrementButton.addEventListener("click",()=>this.decrement()),this.config.incrementButton.addEventListener("click",()=>this.increment()),this.config.input.addEventListener("input",()=>this.handleInputChange()),this.config.input.addEventListener("blur",()=>this.validateInput())}handleInputChange(){const t=parseInt(this.config.input.value)||0;this.updateValue(t)}validateInput(){const t=this.config.min??1,e=this.config.max;let i=parseInt(this.config.input.value)||t;i=Math.max(t,i),e!==void 0&&(i=Math.min(e,i)),this.updateValue(i)}decrement(){const t=this.config.min??1;this.updateValue(Math.max(t,this.currentValue-1))}increment(){const t=this.config.max,e=this.currentValue+1;this.updateValue(t!==void 0?Math.min(t,e):e)}updateValue(t){var e,i;this.currentValue=t,this.config.input.value=t.toString(),(i=(e=this.config).onChange)==null||i.call(e,t),this.config.decrementButton.disabled=t<=(this.config.min??1),this.config.max!==void 0&&(this.config.incrementButton.disabled=t>=this.config.max)}}class g{constructor(t){Object.defineProperty(this,"triggers",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"content",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"activeValue",{enumerable:!0,configurable:!0,writable:!0,value:null}),this.triggers=t.triggers,this.content=t.content,this.init()}init(){const t=this.triggers.querySelector('[data-active="true"]');t&&(this.activeValue=t.dataset.value??null,this.updateContentVisibility()),this.triggers.addEventListener("click",e=>this.handleClick(e)),this.triggers.addEventListener("keydown",e=>this.handleKeyboardNavigation(e))}handleKeyboardNavigation(t){var r;if(!(t.target instanceof HTMLElement)||!["ArrowLeft","ArrowRight","Home","End"].includes(t.key))return;const e=Array.from(this.triggers.querySelectorAll("button")),i=e.indexOf(t.target);let o=i;switch(t.key){case"ArrowLeft":o=i>0?i-1:e.length-1;break;case"ArrowRight":o=i<e.length-1?i+1:0;break;case"Home":o=0;break;case"End":o=e.length-1;break}(r=e[o])==null||r.focus(),t.preventDefault()}handleClick(t){const e=t.target;if(e.tagName!=="BUTTON"||!e.dataset.value)return;e.dataset.active==="true"?this.deactivateTab(e):this.activateTab(e),this.triggers.dispatchEvent(new CustomEvent("tab-change",{detail:{value:this.activeValue},bubbles:!0}))}deactivateTab(t){t.setAttribute("data-active","false"),t.setAttribute("aria-selected","false"),this.activeValue=null,this.updateContentVisibility()}activateTab(t){this.setAllTriggersFalse(),t.setAttribute("data-active","true"),t.setAttribute("aria-selected","true"),this.activeValue=t.dataset.value??null,this.updateContentVisibility()}updateContentVisibility(){this.content.querySelectorAll("[data-value]").forEach(e=>{const i=e.getAttribute("data-value")===this.activeValue;e.classList.toggle("hidden",!i),e instanceof HTMLElement&&e.setAttribute("aria-hidden",(!i).toString())})}setAllTriggersFalse(){this.triggers.querySelectorAll('[data-active="true"]').forEach(t=>{t.setAttribute("data-active","false"),t.setAttribute("aria-selected","false")})}}document.addEventListener("DOMContentLoaded",async()=>{document.querySelectorAll('[pxm-input="number"]').forEach(r=>{const n=r.querySelector("input"),[s,u]=Array.from(r.querySelectorAll("button"));n&&s&&u&&new p({container:r,input:n,decrementButton:s,incrementButton:u,max:n.getAttribute("max")?parseInt(n.getAttribute("max")):void 0,min:n.getAttribute("min")?parseInt(n.getAttribute("min")):1,onChange:h=>{r.dispatchEvent(new CustomEvent("quantity-change",{detail:{value:h},bubbles:!0}))}})}),document.querySelectorAll('[pxm-tabs="triggers"]').forEach(r=>{var s;console.log("triggersElement",r);const n=(s=r.parentElement)==null?void 0:s.querySelector('[pxm-tabs="content"]');n&&new g({triggers:r,content:n})});const a=document.getElementById("recently-viewed-products");if(!a){console.warn(a);return}let t=l("recentlyViewedProducts");t||(d("recentlyViewedProducts","",7),t=l("recentlyViewedProducts"));const e=a.dataset.productHandle;if(!e){console.warn("Product ID was not found.");return}const i=f(e,t);d("recentlyViewedProducts",i,7);const o=t.split(",");for(const r of o){const n=await c.getProduct(r);if(n){const s=`
        <a href="${n.url}" class="w-full h-full group" pxm-product="item">
          <div class="w-full aspect-square relative rounded-2xl overflow-hidden border border-border-primary">
            <img
              src="${n.featured_image}"
              width="auto"
              height="300"
              class="absolute top-0 bottom-0 left-0 right-0 object-cover object-center w-full h-full group-hover:scale-110 global-transition"
              pxm-product="image"
            >
            ${n.compare_at_price>n.price?`
              <span
                class="absolute top-0 left-0 bg-error-red text-white px-2 py-1 rounded-br-2xl text-sm font-medium"
                pxm-product="discount"
              >
                Reducere ${Math.round((n.compare_at_price-n.price)*100/n.compare_at_price)}%
              </span>
              `:""}
          </div>
          <div class="pt-4">
            <h3 class="text-text-primary lg:text-lg font-semibold leading-normal mb-2" pxm-product="title">
              ${n.title}
            </h3>
            <div class="flex items-center gap-4">
              <p class="text-text-secondary lg:text-lg font-semibold line-through" pxm-product="compare-price">
                 ${c.formatMoneyWithoutTrailingZeros(n.compare_at_price)} ${window.shopCurrency}
              </p>
              <p
                class="${n.compare_at_price>n.price?"text-error-red":"text-text-primary"} font-semibold lg:text-lg"
                pxm-product="price"
              >
                ${c.formatMoneyWithoutTrailingZeros(n.price)} ${window.shopCurrency}
              </p>
            </div>
          </div>
        </a>
      `;a.innerHTML+=s}}});function f(a,t){const i=t.split(",").filter(o=>o!=="");return i.includes(a)&&i.splice(i.indexOf(a),1),i.unshift(a),i.length>6&&i.pop(),i.join(",")}const c={getProduct:async a=>{try{const t=await fetch(`/products/${a}.js`),e=await t.json();if(!t.ok)throw new Error("Network response was not ok");return e}catch(t){return console.error(t.message),null}},formatMoneyWithoutTrailingZeros:a=>{const t=(a/100).toFixed(2);return t.endsWith(".00")?t.slice(0,-3):t}};function l(a){let t=a+"=",i=decodeURIComponent(document.cookie).split(";");for(let o=0;o<i.length;o++){let r=i[o];for(;r.charAt(0)==" ";)r=r.substring(1);if(r.indexOf(t)==0)return r.substring(t.length,r.length)}return""}function d(a,t,e){let i="";{const o=new Date;o.setTime(o.getTime()+e*24*60*60*1e3),i=`; expires=${o.toUTCString()}`}document.cookie=`${a}=${t??""}; ${i}; path=/`}
