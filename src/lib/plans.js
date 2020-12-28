import styles from '../css/plan.scss';

const template = document.createElement('template');
template.innerHTML = `
<style>${styles.toString()}</style>
<div class="col-md-4 col-xl-3 mt-10" style="margin-left: 0px; width: 250px;">
  <div class="mat-card mat-focus-indicator mat-elevation-z6 p-0 h-100 plan-extra-box">
    <div class="row dashboard-plan-box m-0">
      <div id="plan_status" class="col-sm-12 dashboard-text-1 fs-16"></div>
    </div>
    <div class="mat-divider mat-divider-horizontal"></div>
    <div class="p-10 bg-white">
      <div class="row margin-5">
        <div id="plan_planDisplayName" class="col-sm-12 dashboard-text-2 text-center"></div>
      </div>
      <div class="row margin-5">
        <div id="plan_price" class="col-sm-12 dashboard-text-3 font-weight-bold fs-12"></div>
      </div>
      <div class="row margin-5">
        <div id="plan_offerAllowanceMb" class="col-sm-12 dashboard-text-3 font-weight-bold fs-12"> 15 GB</div>
      </div>
      <div class="row clearfix"><br></div>
    </div>
    <div class="plan-extra-box pb-10">
      <div class="row m-0">
        <div class="col-sm-12">
          <div class="row margin-5">
            <div class="col-12 text-center"> Mobile Number</div>
            <div id="plan_msn" class="col-12 text-center"> </div>
          </div>
          <div class="row margin-5 text-center dashboard-text-2">
            <div id="plan_autoRecharge" class="col-12 text-center"> AutoRecharge: OFF</div>
          </div>
        </div>
      </div>
      <div class="row center-parent">
        <div class="col-sm-12 center-child">
          <button class="btn-solid btn">VIEW DASHBOARD</button>
        </div>
      </div>
      <div class="row center-parent mt-10">
        <div class="col-sm-12 center-child">
          <button class="btn-solid btn btn-secondary">RECHARGE NOW</button>
        </div>
      </div>
      <div class="row clearfix"><br></div>
    </div>
  </div>
</div>
`;

class Plans extends HTMLElement {
  constructor() {
    super();
    const email = this.getAttribute('email');
    const shadowDOM = this.attachShadow({ mode: 'open' });
    const cloneContent = template.content.cloneNode(true);
    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const res = JSON.parse(request.responseText);
        for (let planObj of res.customerServices) {
          cloneContent.querySelector('#plan_status').textContent = `${planObj.status}`;
          cloneContent.querySelector('#plan_planDisplayName').textContent = `${planObj.baseProduct.planDisplayName}`;
          cloneContent.querySelector('#plan_price').innerHTML = `$${planObj.baseProduct.price} <span id="plan_validityDays" class="font-weight-normal"> / ${planObj.baseProduct.optusPlan.validityDays} Days </span>`;
          cloneContent.querySelector('#plan_offerAllowanceMb').textContent = `${planObj.baseProduct.optusPlan.offerAllowanceMb * 0.0009765625} GB`;
          cloneContent.querySelector('#plan_msn').textContent = `${planObj.msn}`;
          cloneContent.querySelector('#plan_autoRecharge').textContent = `AutoRecharge: ${planObj.autoRecharge ? 'ON' : 'OFF'}`;
        }
        shadowDOM.appendChild(cloneContent);
      }
    };
    request.open("GET", "https://run.mocky.io/v3/0047d8f6-e81f-40cb-8f63-76f26fffab71");
    request.send();
  }

}

export default Plans;
