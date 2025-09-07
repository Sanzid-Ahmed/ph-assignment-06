const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((response) => response.json())
        .then((json) => {
            // console.log("API response:", json);
            displayCategories(json.categories);
        });
};



const displayCategories = (categories) => {
    // console.log("Categories array:", categories); 
    const categoriesContainer = document.getElementById("categories-container");
    categoriesContainer.innerHTML = "";


    // 01 ==> Crate an ol tag where I will keep li tags. 
    const ol = document.createElement("ol");
    ol.classList.add("space-y-2");
    // ol.innerHTML = ``;

    for (let category of categories) {
        // console.log(category); 
        // 02 ==> createing li tag for each catagory_name. 
        const li = document.createElement("li");
        li.classList.add("p-2");
        // 03 ==> assign the category name inside li tag. 
        li.innerHTML = `${category.category_name}`;
        // 04 ==> send each li tag inside ol tag.
        li.addEventListener("click", () => {
            load(category.id);
        });
        ol.appendChild(li);
    }
    // 05 ==> send full ol tag with child li to main container
    categoriesContainer.appendChild(ol);
};

loadCategories();




































loadAllTrees = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((response) => response.json())
        .then((json) => {
            console.log("API response:", json);
            displayTrees(json.plants)
        });
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
    // updateTotal();
};


const cartadd = (name, price) => {
    const cart = document.getElementById("cart");

    let existingItem = cart.querySelector(`[data-name="${name}"]`);

    if (existingItem) {
        let span = existingItem.querySelector("span");
        let quantity = parseInt(span.innerText);
        quantity += 1;
        span.innerText = quantity;
    } else {
        cart.innerHTML += `
            <div data-name="${name}" class="flex items-center justify-between bg-[#F0FDF4] p-2 mt-3">
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
    // updateTotal();
};



const displayTrees = (trees) => {
    console.log("Trees array:", trees);
    const treesContainer = document.getElementById("trees-container");
    treesContainer.innerHTML = "";


    const div = document.createElement("div");
    div.classList.add("grid", "grid-cols-3", "gap-3");

    trees.forEach(tree => {
        const div2 = document.createElement("div");
        div2.innerHTML =
            `
        <div class="bg-white p-5 space-y-3">
            <img class="h-[220px] w-full"src="${tree.image}" alt="">
            <p class="font-bold">${tree.name}</p>
            <div class="h-[150px]">
            <p>${tree.description}</p>
            </div>
            <div class="type-money flex justify-between">
                <p class="bg-[#DCFCE7] text-[#15803D] px-3 rounded-[25px] font-semibold">${tree.category}</p>
                <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${tree.price}</p>
            </div>
            <button onclick='cartadd("${tree.name}", ${tree.price})' class="add btn w-full bg-[#15803D] text-[#FFFFFF]">Add to Cart</button>
        </div>
        `;
        div.appendChild(div2);


    });
    treesContainer.appendChild(div);



};


loadAllTrees();











































const load = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`;


    loadTrees = () => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                console.log("API response:", json);
                displayTrees(json.plants)
            });
    };





    // const cartneg = (name, price) => {
    //     const cart = document.getElementById("cart");
    //     let existingItem = cart.querySelector(`[data-name="${name}"]`);

    //     if (existingItem) {
    //         let span = existingItem.querySelector("span");
    //         let quantity = parseInt(span.innerText);

    //         if (quantity > 1) {
    //             span.innerText = quantity - 1;
    //         } else {
    //             existingItem.remove();
    //         }
    //     }
    //     // updateTotal();
    // };


    // const cartadd = (name, price) => {
    //     const cart = document.getElementById("cart");

    //     let existingItem = cart.querySelector(`[data-name="${name}"]`);

    //     if (existingItem) {
    //         let span = existingItem.querySelector("span");
    //         let quantity = parseInt(span.innerText);
    //         quantity += 1;
    //         span.innerText = quantity;
    //     } else {
    //         cart.innerHTML += `
    //         <div data-name="${name}" class="flex items-center justify-between bg-[#F0FDF4] p-2 mt-3">
    //             <div>
    //                 <p class="font-bold">${name}</p>
    //                 <p class="text-[#1F2937]">
    //                     <i class="fa-solid fa-bangladeshi-taka-sign opacity-75"></i>${price} x <span>1</span>
    //                 </p>
    //             </div>
    //             <p onclick='cartneg("${name}", ${price})' class="btn bg-[#F0FDF4] text-[#1F2937] border-none">X</p>
    //         </div>
    //     `;
    //     }
    //     // updateTotal();
    // };



    const displayTrees = (trees) => {
        console.log("Trees array:", trees);
        const treesContainer = document.getElementById("trees-container");
        treesContainer.innerHTML = "";


        const div = document.createElement("div");
        div.classList.add("grid", "grid-cols-3", "gap-3");

        trees.forEach(tree => {
            const div2 = document.createElement("div");
            div2.innerHTML =
                `
        <div class="bg-white p-5 space-y-3">
            <img class="h-[220px] w-full"src="${tree.image}" alt="">
            <p class="font-bold">${tree.name}</p>
            <div class="h-[150px]">
            <p>${tree.description}</p>
            </div>
            <div class="type-money flex justify-between">
                <p class="bg-[#DCFCE7] text-[#15803D] px-3 rounded-[25px] font-semibold">${tree.category}</p>
                <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${tree.price}</p>
            </div>
            <button onclick='cartadd("${tree.name}", ${tree.price})' class="add btn w-full bg-[#15803D] text-[#FFFFFF]">Add to Cart</button>
        </div>
        `;
            div.appendChild(div2);


        });
        treesContainer.appendChild(div);
    };

};

loadTrees()