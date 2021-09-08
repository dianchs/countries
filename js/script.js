const Region = {
    getAll:'all',
    region:'region'
}


const RegionData = [
    {
        title:'All countries',
        route:'all'
    },
    {
        title:'Africa',
        route:'africa'
    },
    {
        title:'Europe',
        route:'europe'
    },
    {
        title:'Americas',
        route:'americas'
    },
    {
        title:'Asia',
        route:'asia'
    },
    {
        title:'Oceania',
        route:'oceania'
    },
]

const navContainer = document.querySelector('.navContainer')
const center = document.querySelector('.center')


window.addEventListener('load' , () =>{
    const nav = RegionData.map(({title , route}) =>{
        return NavList(title , route)
    }).join('')

    navContainer.innerHTML = nav

    FetchData(Region.getAll , res =>{
        const card = res.map((item) =>{
            return Card(item)
        }).join('')
         
        center.innerHTML = card
    })
})


function NavList(title , route){
    return`
        <li class="nav-item">
            <button class="nav-link" onclick="chooseRegion('${route}')">${title}</button>
        </li>

    `
}


function chooseRegion(route){
    FetchData(`${Region.region}/${route}` , res =>{
        const card = res.map(item =>{
            return Card(item)
        }).join('')

        center.innerHTML = card
    })
}


function Card(res){
    return`
        <div class="card-center">
            <div class="card-img">
                <img src="${res.flag}">
                <div class="card-info">
                    <h3>${res.name}</h3>
                    <h4>Capital:  ${res.capital}</h4>
                    <h4>Region:  ${res.region}</h4>
                    <h4>SubRegion: ${res.subregion}</h4>
                    <h4>Population: ${res.population}</h4>
                    <h4>Borders: ${res.borders}</h4>
                </div>
            </div>
        </div>
    `
}


function FetchData(endPoint , cb){
    fetch(`https://restcountries.eu/rest/v2/${endPoint}`)
    .then(res => res.json())
    .then(r => cb(r))
}








const select = document.querySelector('.select')
const search = document.querySelector('.search')

select.addEventListener('change' , e =>{
    var value = e.target.value

    if(value == 'capital'){
        search.setAttribute('placeholder' , 'Enter by Capital')
    }else{
        search.setAttribute('placeholder' , 'Enter by Name')
    }
})



search.addEventListener('input' , e =>{
    var value = e.target.value

    if(select.value === 'capital'){
        FetchData(Region.getAll , res =>{
            const card = res.map(item =>{
                if(item.capital.includes(value)){
                    return Card(item)
                }
            }).join('')
            center.innerHTML = card
        })
    }else if(select.value == 'name'){
        FetchData(Region.getAll , res =>{
            const card = res.map(item =>{
                if(item.name.includes(value)){
                    return Card(item)
                }
            }).join('')
            center.innerHTML = card
        })
    }
})