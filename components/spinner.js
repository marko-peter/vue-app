Vue.component('spinner', {
    template: `
    <div class="card float-lg-left spinner text-center">
        <div class="card-body">
            <div class="center-spinner">
                <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
            <p>Data Loading, please wait...</p>
        </div>
    </div>`,
    name: "Spinner"
})