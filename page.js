let current_page = 1;
let records_per_page = 3;




function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage();
    }
}

function nextPage() {
    if (current_page < numPages()) {
        current_page++;
        changePage();
    }
}

function changePage() {
    let btn_next = document.getElementById("btn_next");
    let btn_prev = document.getElementById("btn_prev");
    let listing_table = document.getElementById("listingTable");
    let objJson = get_todos();

    // Validate page
    if (current_page < 1) current_page = 1;
    if (current_page > numPages()) current_page = numPages();

    listing_table.innerHTML = "";

    let html = '<ul>';




    for (let i = (current_page - 1) * records_per_page; i < (current_page * records_per_page) && i < objJson.length; i++) {
        ///listing_table.innerHTML += objJson[i] + "<br>";
        html += '<li> ' + objJson[i] + `<button class="remove" id="${i}">&times;</button></li>`;
    }
    html += '</ul>';

    document.getElementById('todos').innerHTML = html;
    let buttons = document.getElementsByClassName('remove');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', e => {
            if (confirm('t sur ???'))
                window.dispatchEvent(new CustomEvent('remove-entry', { detail: { id: buttons[i].getAttribute('id') } }))
        });
    };

    renderNumber()

    if (current_page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (current_page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}
function renderNumber() {
    let page_span = document.getElementById("page");
    page_span.innerHTML = current_page + "/" + numPages();
}
function numPages() {
    return Math.ceil(get_todos().length / records_per_page);
}
window.addEventListener('page-refresh', e => {
    changePage()
})
window.onload = function () {
    changePage();
};
