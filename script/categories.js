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
    ol.innerHTML = `<h3 class="font-bold text-md mb-4">Categories</h3>`;

    for(let category of categories){
        // console.log(category); 
        // 02 ==> createing li tag for each catagory_name. 
        const li = document.createElement("li");
        li.classList.add("p-2");
        // 03 ==> assign the category name inside li tag. 
        li.innerHTML = `${category.category_name}`;
        // 04 ==> send each li tag inside ol tag. 
        ol.appendChild(li);
    }
    // 05 ==> send full ol tag with child li to main container
    categoriesContainer.appendChild(ol);
};

loadCategories();
