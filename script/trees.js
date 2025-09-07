const loadTrees = () => {
    fecth("https://openapi.programming-hero.com/api/plants")
    .then((response) => response.json())
    .then((json) => )
}; 

const displayTrees = (trees) => {
    const treesContainer = document.getElementById("trees-container");
    treesContainer = "";


    const div = document.createElement("div");

    trees.forEach(tree => {
        const div2 = document.createElement("div");
        
    });
}