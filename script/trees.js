const loadTrees = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then((response) => response.json())
    .then((json) => {
        console.log("API response:", json);
        displayTrees(json.plants)
    });
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
            <button class="btn w-full bg-[#15803D] text-[#FFFFFF]">Add to Cart</button>
        </div>
        `;
        div.appendChild(div2);
    });
    treesContainer.appendChild(div); 
};

loadTrees();