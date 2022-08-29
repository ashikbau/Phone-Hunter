const loadPhones = async(searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
const res = await fetch(url);
const data = await res.json();
displayPhone(data.data,dataLimit);

}

const displayPhone = (phones,dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ' ';
    // display only 10 phones
    const showAll = document.getElementById('show-all');
    if( dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
     
     showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    
    // no-phone found start
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');

    }
    else{
        noPhone.classList.add('d-none');
    }
    // no-phone end

    phones.forEach(phone => {
        const phoneDiv = document.createElement('phones-container');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-5">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">show Details</button>
                           </div>
                      </div>
        
        `
        phonesContainer.appendChild(phoneDiv);
    })
    //  stop sppiner
    toggleSpinner(false);
}

const processSearch = (dataLimit) =>{
    toggleSpinner (true);
    const searchField = document.getElementById('search-field');
const searchText = searchField.value;
loadPhones(searchText,dataLimit);
}

document.getElementById('btn-search').addEventListener('click',function(){
// start loadder
processSearch(10);
})
// search input field event handler
document.getElementById('search-field').addEventListener('keypress' ,function(e){

    if(e.key === 'Enter'){
        processSearch(10);
}
})


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loadder');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }


}

// not the best way to showall
document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
})


const loadPhoneDetails = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = phone =>{
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release date: ${phone.releaseDate ? phone.releaseDate : 'no realeseDate found' }</p>
    <p>Others: ${phone.others ? phone.others.Bluetooth : 'no bluetooth information found' }</p>
    <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'no storage information found' }</p>
    
    `
}

loadPhones('apple');



  