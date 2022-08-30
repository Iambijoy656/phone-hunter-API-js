const loadPhones = async (searchText, dataLimit) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit)

}

const displayPhone = (phones, dataLimit) => {
    // console.log(phones)

    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    //display 10 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    };


    // display no found msg

    const noPhone = document.getElementById('no-found-msg');
    if (phones.length === 0) {
        toggleSpinner(false)
        noPhone.classList.remove('d-none');
    } else {
        noPhone.classList.add('d-none')
    };



    //Display all phone
    phones.forEach(phone => {
        // console.log(phone)
        const { image, brand, phone_name, slug } = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `

        <div class="card h-100 p-4  ">
                <img src="${image}" class="card-img-top " alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone_name}</h5>
                    <p class=""> Brand: ${brand}</p>
                    <p class="card-text">
                        this is a longer card  with supporting text below as a natural lead-in to additional content.content is a little bit longer.
                    </p>
                    <button onclick="loadPhoneDetails('${slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show-Details</button>
                </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);

    });

    //stop loader
    toggleSpinner(false)
}




const processSearch = (dataLimit) => {
    // start loader
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);

}






//handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(10);

});


// search input field enter key haldler
document.getElementById('search-field').addEventListener('keypress', function (e) {

    if (e.key == 'Enter') {
        processSearch(10);
    }
})





const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');

    } else {
        loaderSection.classList.add('d-none');
    }

}


// not the best way to load show All
document.getElementById('btn-show-all').addEventListener('click', function () {

    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;

    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)

}

const displayPhoneDetails = phone => {
    console.log(phone);
    const { image, brand, name, releaseDate, others, mainFeatures } = phone;

    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = name;

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p> Release Date: ${releaseDate ? releaseDate : 'No Release Date Found'} </p>
        <p> Storage: ${mainFeatures ? mainFeatures.storage : ' No storage infoemation Found'} </p>
        <p> Others: ${others ? others.Bluetooth : 'No BlueTooth'} </p>
    `


}




loadPhones('apple')






