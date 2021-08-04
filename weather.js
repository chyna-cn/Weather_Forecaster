let input = document.getElementById('enter');
let search = document.getElementById('search');
let section = document.getElementById('displayArea');
let foreCast = document.getElementById('forecast');
let inputVal = input.value;
function submitSearch(e) {
    fetchResults(e);
}

function fetchResults(e) {
    e.preventDefault();
    inputVal = input.value;
    if(inputVal == ""){
        alert("please enter a city");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=36e092a45d2955de882c532bd8455880&units=metric`).then(res=>res.json()).then(res=>{
        console.log(res);
        displayResult(res);
    });
}

function displayResult(res){
    const {main, name, sys, weather} = res;
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
    weather[0]["icon"]
}.svg`;
    //foreCast.innerHTML = ''
    const span = document.createElement('span');
    span.textContent = name;

    const sup = document.createElement('sup');
    sup.textContent = sys.country;
    span.appendChild(sup);

    const h3 = document.createElement('h3');
    h3.textContent = Math.round(main.temp).toString();

    const metric = document.createElement('sup');
    metric.textContent = "°C";

    h3.appendChild(metric);

    const img = document.createElement('img');
    img.setAttribute("src", icon);
    img.setAttribute("alt", weather[0]['main']);

    const para = document.createElement('p');
    para.setAttribute("id", "description")
    para.textContent = weather[0].description;

    foreCast.appendChild(span);
    foreCast.appendChild(h3);
    foreCast.appendChild(img);
    foreCast.appendChild(para);
}
search.addEventListener("click",submitSearch);