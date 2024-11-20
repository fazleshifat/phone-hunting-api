const loadPhone = async (searchText='a', isShowAll) => {
    const res = await fetch (`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phone[0].brand);
    displayPhones(phones, isShowAll);
}



const displayPhones = (phones, isShowAll)  => {
    // console.log(phones);

     
        // step:1 - get element
        const phoneContainer = document.getElementById('phone-container');
        // clear phone container cards before adding new cards
        phoneContainer.textContent ='';

        // display show all button if there are more than 12 phones
        const showAllContainer = document.getElementById('show-all-container');
        if(phones.length > 12 && !isShowAll){
            showAllContainer.classList.remove('hidden');
        }
        else{
            showAllContainer.classList.add('hidden');
        }
        // display only first 12 phones if not show all
        if(!isShowAll){
            phones = phones.slice(0,12);
        }


        // getting the all phone element one by one
        phones.forEach(phone => {
        // console.log(phone);

       
        // step:2 - create div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-xl`;
        // step:3 - set inner html
        phoneCard.innerHTML = `
        <figure> <img src="${phone.image}" alt="Shoes"/> </figure>
            <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        // step:4 - append child
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadingSpinner(false);
}  
// display phone function ends here
// -------------------------------




// show details button
const handleShowDetails = async (id) =>{
    // console.log('clicked show details', id);
    // load single phone data
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name; 

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.classList.add('my-4');
    showDetailContainer.innerHTML = `
    <img class="mx-auto my-4" src="${phone.image}" alt="" srcset="">
    <p><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.storage} </p>
    `

    // show phone modal
    show_details_modal.showModal();
}
// search button handle
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden'); 
    }
    else{
        loadingSpinner.classList.add('hidden'); 
    }
}

const handleShowAll = () =>{
 handleSearch(true);
}
loadPhone();