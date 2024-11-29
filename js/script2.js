
window.addEventListener("load",getParameterByName)


function getParameterByName() {
    const data = new URLSearchParams(window.location.search);


    document.getElementById("cyan-cl").textContent = "Cyan: "+ data.get("c")
    document.getElementById("magenta-cl").textContent ="Magenta: "+ data.get("m")
    document.getElementById("yellow-cl").textContent ="Yellow: "+ data.get("y")
    document.getElementById("black-cl").textContent ="Noire: "+ data.get("n")
    document.getElementById("blanc-cl").textContent ="Blanc: "+ data.get("b")
    document.getElementById("quantite-cl").textContent ="Quantite: "+ data.get("q")+"L"

    document.getElementById("nom-c").textContent ="Nom: "+ data.get("nom")
    document.getElementById("prenom-c").textContent ="Prenom: "+ data.get("pre")
    document.getElementById("address-c").textContent ="Address: "+ data.get("add")
   
}