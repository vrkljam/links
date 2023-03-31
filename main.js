const inputBtn = document.querySelector("#input-btn")
const inputEl =document.querySelector('#input-el')
const ulEl = document.querySelector('#unordered-el')
const deleteBtn = document.querySelector("#delete-btn")
const tabBtn =document.querySelector('#tab-btn')
let mvlinks =[];

// localStorage.setItem('mvlink', 'www.bing.com')
// console.log(localStorage.getItem('mvlink'))
// localStorage.clear()

// mvlinks =`["www.bing.com']`
// mvlinks = JSON.parse(mvlinks)
// mvlinks.push("www.bing2.com")
// mvlinks=JSON.stringify(mvlinks)
// console.log(typeof mvlinks)

const fromStorage = JSON.parse(localStorage.getItem("links"))
console.log(fromStorage)

if (fromStorage){
    mvlinks =fromStorage
    show(mvlinks)
}

function theLead(){
    mvlinks.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem("links", JSON.stringify(mvlinks))
    show(mvlinks)
    console.log(mvlinks)
}

function tabFun(){
    // console.log(tabs[0].url)
        chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
            mvlinks.push(tabs[0].url)
            localStorage.setItem('links', JSON.stringify(mvlinks))
            show(mvlinks)
        })
    }

function show(links){
    let listItems =''
    for (let i=0;i<links.length;i++){
        // listItems +="<li><a href='" + mvlinks[i] +"' target='_blank' >" +mvlinks[i]+ "</a></li>"
        listItems +=`
            <li>
                <a href='${links[i]}' target='_blank' > 
                ${links[i]}
                </a>
            </li>`
    }
    ulEl.innerHTML = listItems
}

function delFunc(){
    localStorage.clear()
    mvlinks =[]
   show(mvlinks)
}

inputBtn.addEventListener('click',theLead)
deleteBtn.addEventListener('dblclick', delFunc)
tabBtn.addEventListener('click',tabFun)

// first way to add items to the dom
//    ulEl.innerHTML += "<li>" + myLeads[i] + "</li>"
// second way to add items to the dom
// const li = document.createElement('li')
// li.textContent =myLeads[i]
// ulEl.append(li)