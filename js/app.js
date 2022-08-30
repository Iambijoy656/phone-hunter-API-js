const loadPhones = async (searchText) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data)

}

const displayPhone = phones => {
    // console.log(phones)

    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';

    //display 20 phones only
    phones = phones.slice(0, 20);

    //display no found msg
    const noPhone = document.getElementById('no-found-msg');
    if (phones.length === 0) {
        toggleSpinner(false)
        noPhone.classList.remove('d-none');
    } else {
        noPhone.classList.add('d-none')
    }



    //Display all phone
    phones.forEach(phone => {
        console.log(phone)
        const { image, brand, phone_name, slug } = phone;
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            
        <div class="card h-100 p-4  ">
                <img src="${image}" class="card-img-top " alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone_name}</h5>
                    <p class="card-text">
                        this is a longer card  with supporting text below as a natural lead-in to additional content.content is a little bit longer.
                    </p>
                </div>
        </div>
        `;

        phonesContainer.appendChild(phoneDiv);

        //stop loader
        toggleSpinner(false)

    });


}


//handle search button click
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    toggleSpinner(true)


    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText);
    searchField.value = '';

})


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');

    } else {
        loaderSection.classList.add('d-none')
    }

}


loadPhones('a')