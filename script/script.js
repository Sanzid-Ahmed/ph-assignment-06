const loadAllTrees = () => {
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("hidden");
    document.getElementById("trees-container").classList.add("hidden");
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => {
            removeActive2();
            const allBtn = document.getElementById("all-btn");
            allBtn.classList.add("bg-[#15803D]", "text-white", "rounded-sm");
            displayTrees(data.plants);
        });
};

const load = (id) => {
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("hidden");
    document.getElementById("trees-container").classList.add("hidden");
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickedBtn = document.getElementById(`btn-${id}`);
            clickedBtn.classList.add("bg-[#15803D]", "text-white", "rounded-sm");
            // console.log(clickedBtn);
            displayTrees(data.plants);
        });
};
// URL Calling parts ==========================================================








const removeActive = () => {
    const button = document.querySelectorAll(`.tree-btn`);
    const allBtn = document.getElementById("all-btn");
    allBtn.classList.remove("bg-[#15803D]", "text-white");
    button.forEach(btn => 
        btn.classList.remove("bg-[#15803D]", "text-white")
    );
}
const removeActive2 = () => {
    const button = document.querySelectorAll(`.tree-btn`);
    button.forEach(btn => 
        btn.classList.remove("bg-[#15803D]", "text-white")
    );
}






const updateTotal = () => {
    const cart = document.getElementById("cart");
    const totalDiv = document.getElementById("cart-total-div");
    const items = cart.querySelectorAll("[data-name]");
    let total = 0;

    items.forEach(item => {
        let price = parseInt(item.dataset.price);
        let quantity = parseInt(item.querySelector("span").innerText);
        total += price * quantity;
    });

    document.getElementById("cart-total").innerText = total;

    if (total > 0) totalDiv.classList.remove("hidden");
    else totalDiv.classList.add("hidden");
};









const loadTreeDetails = async(id) => {
    const url = `https:openapi.programming-hero.com/api/plant/${id}`;
    const res = await fetch(url); 
    const details = await res.json();
    detailsmodal(details.plants);
}

const detailsmodal = (tree) =>{
    const detailsbox = document.getElementById("details-container");
    detailsbox.innerHTML = `
        <div class="bg-white p-5 space-y-3 rounded-xl">
            <p class="font-bold text-3xl">${tree.name}</p>
            <img class="h-[220px] w-full rounded-lg" src="${tree.image}" alt="">
            <div class="type-money">
                <p class="font-bold">Category: <span class="font-normal">${tree.category}</span></p>
                <p class="font-bold">Price: <i class="fa-solid fa-bangladeshi-taka-sign"></i><span class="font-normal">${tree.price}</span></p>
            </div>
            <div class="font-bold"><p>Description: <span class="font-normal">${tree.description}</span></p></div>      
        </div>
    `
    document.getElementById("my_modal_5").showModal();
}







const displayTrees = (trees) => {


    const spinner = document.getElementById("spinner");


    const treesContainer = document.getElementById("trees-container");
    treesContainer.innerHTML = "";

    spinner.classList.add("hidden");
    document.getElementById("trees-container").classList.remove("hidden");

    const div = document.createElement("div");
    div.classList.add("grid", "grid-cols-3", "gap-3", "max-[1100px]:grid-cols-2", "max-[500px]:grid-cols-1");
    trees.forEach(tree => {
        const div2 = document.createElement("div");
        div2.innerHTML = `
        <div class="bg-white p-5 space-y-3 rounded-xl">
            <img class="h-[220px] w-full rounded-lg" src="${tree.image}" alt="">
            <p onclick="loadTreeDetails(${tree.id})" class="font-bold">${tree.name}</p>
            <div class="h-[180px]"><p>${tree.description}</p></div>
            <div class="type-money flex justify-between">
                <p class="bg-[#DCFCE7] text-[#15803D] px-3 rounded-[25px] font-semibold">${tree.category}</p>
                <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${tree.price}</p>
            </div>
            <button onclick='cartadd("${tree.name}", ${tree.price})' class="add btn w-full bg-[#15803D] text-[#FFFFFF] rounded-3xl">Add to Cart</button>
        </div>
        `;
        div.appendChild(div2);
    });
    treesContainer.appendChild(div);
};























const cartadd = (name, price) => {
    const cart = document.getElementById("cart");
    let existingItem = cart.querySelector(`[data-name="${name}"]`);

    if (existingItem) {
        let span = existingItem.querySelector("span");
        span.innerText = parseInt(span.innerText) + 1;
    } else {
        cart.innerHTML += `
        <div data-name="${name}" data-price="${price}" class="flex items-center justify-between bg-[#F0FDF4] p-2 mt-3 rounded-lg">
            <div>
                <p class="font-bold">${name}</p>
                <p class="text-[#1F2937]">
                    <i class="fa-solid fa-bangladeshi-taka-sign opacity-75"></i>${price} x <span>1</span>
                </p>
            </div>
            <p onclick='cartneg("${name}", ${price})' class="btn bg-[#F0FDF4] text-[#1F2937] border-none">X</p>
        </div>
        `;
    }
    updateTotal();
};

const cartneg = (name, price) => {
    const cart = document.getElementById("cart");
    let existingItem = cart.querySelector(`[data-name="${name}"]`);

    if (existingItem) {
        let span = existingItem.querySelector("span");
        let quantity = parseInt(span.innerText);
        if (quantity > 1) {
            span.innerText = quantity - 1;
        } else {
            existingItem.remove();
        }
    }
    updateTotal();
};
























const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
};


const displayCategories = (categories) => {
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";

    const ol = document.createElement("ol");
    ol.classList.add("space-y-2", "max-[500px]:flex", "max-[500px]:flex-wrap", "max-[500px]:justify-between");

    for (let category of categories) {
        const li = document.createElement("li");
        li.classList.add("p-2", "cursor-pointer", "tree-btn");
        li.id = `btn-${category.id}`
        li.innerText = category.category_name;
        li.addEventListener("click", () => load(category.id));
        ol.appendChild(li);
    }

    categoriesContainer.appendChild(ol);
};

const allBtn = document.getElementById("all-btn");
allBtn.classList.add("cursor-pointer");
allBtn.addEventListener("click", loadAllTrees);


















loadCategories();
loadAllTrees();
