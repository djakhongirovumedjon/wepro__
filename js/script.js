let fakeUrl = "http://localhost:3000/data"
let main = document.querySelector('.main')
let total = document.querySelector('.length')
let prem = document.querySelector('.length2')
let inp = document.querySelector('.search_inp')
let btn = document.querySelector('.btn')
let btn2 = document.querySelector('.btn2')
let btn3 = document.querySelector('.btn3')
let form = document.forms.add


let arr = []

function user() {
    axios.get(fakeUrl)
    .then(res => {
        reload(res.data)
        arr = res.data
    })
}
user()

function post(arrr) {
    axios.post(fakeUrl, arrr)
        .then(res => user())
}

function edit(id, us) {
    axios.put(fakeUrl + '/'+ id, us)
        .then(res => user())
}

function removeUser(id) {
    axios.delete(fakeUrl + '/' + id)
        .then(res => user())
}

inp.onkeyup = () => {
    let filtered = arr.filter(item => item.name.toLowerCase().includes(inp.value.toLowerCase()))

    reload(filtered)
}

btn.onclick = () => {
    reload(arr)
}

btn2.onclick = () => {
    let filtered = arr.filter(item => item.rise)

    reload(filtered)
}

btn3.onclick = () => {
    let filtered = arr.filter(item => item.salary > 1000)


    reload(filtered)
}


function reload(arr) {
    main.innerHTML = ''
    let pr = 0
    total.innerHTML = ''
    prem.innerHTML = ''
    
    for(let item of arr){
        let box = document.createElement('div')
        let name = document.createElement('p')
        let sallaru = document.createElement('p')
        let for_img = document.createElement('div')
        let premium = document.createElement('img')
        let remove = document.createElement('img')
        let star = document.createElement('img')
        
        box.classList.add('box')
        
        name.classList.add('name')
        sallaru.classList.add('sallaru')
        for_img.classList.add('for_img')
        premium.classList.add('premium')
        remove.classList.add('remove')
        star.classList.add('star')
        name.innerHTML = item.name
        sallaru.innerHTML = `${item.salary}$`
        
        box.style.backgroundColor = `${random_bg_color()}`
        
        premium.src = '../img/pechenka.png'
        remove.src = './img/del.png'
        star.src = './img/alex.png'
        remove.style.width ="20px"
        star.style.width ="20px"
        for_img.append(premium,remove, star)
        box.append(name, sallaru, for_img)
        main.append(box)
        if(item.increase == true){
            pr++
            name.style.color = 'gold'
            sallaru.style.color = 'gold'
        }
        if(item.rise !== true){
            star.style.display = "none"
        }
        
        premium.onclick = () => {
            let id = item.id

            if(item.increase == false){
                item.increase = true
                edit(id, item)
            } else {
                item.increase = false
                edit(id, item)
            }
        }

        name.onclick = () => {
            staring(item)
        }
        sallaru.onclick = () => {
            staring(item)
        }
        star.onclick = () => {
            staring(item)
        }
        
        remove.onclick = () => {
            let id = item.id
            removeUser(id)
        }
        
        function random_bg_color() {
            let x = Math. floor(Math. random() * 256);
            let y = Math. floor(Math. random() * 256);
            let z = Math. floor(Math. random() * 256);
            let bgColor = "rgb(" + x + "," + y + "," + z + ")";

            return bgColor
        }



    }


    total.innerHTML = `Общее число сотрудников: ${arr.length}`
    prem.innerHTML = `Премию получат: ${pr}`
}

function staring(item) {
    let id = item.id

    if(item.rise == false){
        item.rise = true
        edit(id, item)
    } else {
        item.rise = false
        edit(id, item)
    }
}


form.onsubmit = (e) => {
    e.preventDefault()

    let arr = {
        "id": Math.random(),
        "increase": false,
        "rise": false
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        arr[key] = value
    })

    post(arr)
}