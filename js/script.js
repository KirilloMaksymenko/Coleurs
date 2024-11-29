
document.getElementById('select-c-id').addEventListener('input',changeColorRgb)

var rgb = {"red":"0","green":"0","blue":"0"}

function changeColorRgb(e){
    rgb[e.target.name] = e.target.value
    document.getElementById(`${e.target.name}-lb`).textContent  = e.target.value
    document.getElementById("viewport-color").style.backgroundColor=`rgb(${rgb["red"]},${rgb["green"]},${rgb["blue"]})`;
    
    if (e.target.name == 'red') {
       
        document.getElementById(`${e.target.name}-c-id`).style.backgroundColor=`rgb(${rgb["red"]},0,0)`;
    }else if (e.target.name == 'green') {
        
        document.getElementById(`${e.target.name}-c-id`).style.backgroundColor=`rgb(0,${rgb["green"]},0)`;
    }else{
     
        document.getElementById(`${e.target.name}-c-id`).style.backgroundColor=`rgb(0,0,${rgb["blue"]})`;
    }
    
}

document.getElementById("selector-item-color").addEventListener("change",changeItemColor)

function changeItemColor(e){
    const t = {"red":[255,0,0],"yellow":[255,255,0],"green":[0,255,0],"blue":[0,0,255]}
    if (e.target.value in t){
        console.log(t[e.target.value][0],t[e.target.value][1],t[e.target.value][2])
        document.getElementById("viewport-color").style.backgroundColor=`${e.target.value}`;
        document.getElementById(`red-c-id`).value = t[e.target.value][0];
        document.getElementById(`red-c-id`).style.backgroundColor=`rgb(${t[e.target.value][0]},0,0)`;
        rgb["red"]=t[e.target.value][0]
        document.getElementById(`red-lb`).textContent  = t[e.target.value][0]

        document.getElementById(`green-c-id`).value = t[e.target.value][1];
        document.getElementById(`green-c-id`).style.backgroundColor=`rgb(0,${t[e.target.value][1]},0)`;
        rgb["green"]=t[e.target.value][1]
        document.getElementById(`green-lb`).textContent  = t[e.target.value][1]

        document.getElementById(`blue-c-id`).value = t[e.target.value][2];
        document.getElementById(`blue-c-id`).style.backgroundColor=`rgb(0,0,${t[e.target.value][2]})`;
        rgb["blue"]=t[e.target.value][2]
        document.getElementById(`blue-lb`).textContent  = t[e.target.value][2]
    }else{
        document.getElementById("viewport-color").style.backgroundColor=`${e.target.value}`;
    }
    
    console.log(e.target.value)
}

document.getElementById("btn-annule-id").addEventListener("click",annule)

function annule(){
    document.getElementById("user-nom").value = "";
    document.getElementById("user-prenom").value = "";
    document.getElementById("user-address").value = "";
}

document.getElementById("btn-envoe-id").addEventListener("click",envoe)

function envoe(){
    let data = getInfo()
    sendData(data)

}


document.getElementById("radioChoixCat").addEventListener("change",choixCat)
document.getElementById("radioChoixPer").addEventListener("change",choixPer)
choixCat()
function choixCat() {
    var cat = document.getElementById('choixcolorcat')
    var per = document.getElementById('choixcolorper')
    cat.classList.remove("disablet")
    per.classList.add("disablet")
}
function choixPer() {
    var per = document.getElementById('choixcolorper')
    var cat = document.getElementById('choixcolorcat')
    per.classList.remove("disablet")
    cat.classList.add("disablet") 
}


function getInfo(){
    let data={
        "type_input":null,
        "color_catalog":null,
        "color_personel":[null,null,null],
        "quantite":null,
        "address":{
            "nom":null,
            "prenom":null,
            "address":null
        }
    }
    var ele = document.getElementsByName('choixCP');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            data["type_input"] = ele[i].value
                data["color_personel"]=[rgb["red"],rgb["green"],rgb["blue"]]
                data["color_catalog"] = document.getElementById("selector-item-color").value
            
    }
    data["quantite"] = document.getElementById("quantite-value").value

    let coordonnes = valideDonnes()
    if(coordonnes==false){
        alert("Votre donnes incorect")
        return
    }

    data["address"]={
        "nom":coordonnes[0],
        "prenom":coordonnes[1],
        "address":coordonnes[2]
    }
    console.log(data)
    return data
}




function valideDonnes(){
    let nom = document.getElementById("user-nom").value
    let prenom = document.getElementById("user-prenom").value
    let address = document.getElementById("user-address").value
    if(nom.length <4 || prenom.length <4|| address.length <6){
        return false
    }
        
    return [nom,prenom,address]
}

function sendData(data){

    var request = new XMLHttpRequest();
    var url = `./php/script.php?type_input=${data["type_input"]}&color_catalog=${data["color_catalog"]}&color_red=${data["color_personel"][0]}&color_green=${data["color_personel"][1]}&color_blue=${data["color_personel"][2]}&quantite=${data["quantite"]}&nom=${data["address"]["nom"]}&prenom=${data["address"]["prenom"]}&address=${data["address"]["address"]}`;
    console.log(url)
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    console.log(request)
    request.onreadystatechange = function () {
        console.log(request.status)
        if (request.readyState == 4 && request.status == 200) {
            console.log(request.responseText)
            viewComande(JSON.parse(request.responseText))
        }
    }
    request.send();
}





function viewComande(data){
    if(data["error"]){
        alert(data["error"])
        return
    }
    console.log(`./result.html?0=${data[0]}&1=${data[1]}&2=${data[2]}&3=${data[3]}&4=${data[4]}&5=${data[5]}&6=${data[6]}&7=${data[7]}`)
    window.location.replace(`./result.html?c=${data[0]}&m=${data[1]}&y=${data[2]}&n=${data[3]}&b=${data[4]}&nom=${data[5]}&pre=${data[6]}&add=${data[7]}&q=${data[8]}`);
    

}

    