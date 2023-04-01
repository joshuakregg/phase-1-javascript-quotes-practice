const ul = document.getElementById('quote-list')
ul.style.listStyle = 'none'
const form = document.getElementById('new-quote-form')
form.addEventListener('submit', event => submitForm(event))
function fetchQoutes() {
    fetch('http://localhost:3000/quotes?_embed=likes')
    .then(res => res.json())
    .then(data => data.forEach(element => {
        createCard(element)
    }))
}
function createCard(element) {
   
    const li = document.createElement('li')
    const blockQoute = document.createElement('blockquote')
    const p = document.createElement('p')
    const footer = document.createElement('footer')
    const br = document.createElement('br')
    const likeButton = document.createElement('button')
    const deleteButton = document.createElement('button')
    const span = document.createElement('span')

    p.innerText = element.quote
    footer.innerText = element.author
    likeButton.innerText = 'likes:'
    span.innerText = element.likes.length
    deleteButton.innerText = 'delete'
    
    blockQoute.appendChild(p)
    blockQoute.appendChild(footer)
    blockQoute.appendChild(br)
    blockQoute.appendChild(likeButton)
    likeButton.appendChild(span)
    blockQoute.appendChild(deleteButton)
    li.appendChild(blockQoute)
    ul.appendChild(li)

    likeButton.addEventListener('click', () => likeQoute(element))
    function likeQoute(element) {
        
        fetch('http://localhost:3000/likes', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body:JSON.stringify({
                quoteId: element.id
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(likeButton.textContent.split(':')[1])
           likeButton.innerText = `Likes: ${parseInt(likeButton.textContent.split(':')[1], 10) + 1}`
        })
    }
    deleteButton.addEventListener('click', ()=> deleteCard(element))
    function deleteCard(element) {
        li.innerHTML = ''
        fetch(`http://localhost:3000/quotes/${element.id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json' 
            }
        })
    }
}   


function submitForm(event) {
    event.preventDefault()
    // console.log(event.target.children[0].children[1].value)
    // console.log(event.target.children[1].children[1].value)
    fetch('http://localhost:3000/quotes', {
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body:JSON.stringify({
            "quote": event.target.children[0].children[1].value,
            "author": event.target.children[1].children[1].value,
            // "likes": []
        })
    })
    .then(res => res.json())
    .then(data => {
        data["likes"] = []
        createCard(data)
        
    })
}

fetchQoutes()

//need to click on something and distiguish one click to another
// every time we make a clikc we create an object
// filter through all the likes creat a condition that will store a qoutes like in the newly created array of the filter
// should have a collection of qoutes and new array of objects of a qoute count the collection of objects and that should give you number of likes for a particular qoute
// where to store the number of likes for a particular qoute. thnink aboout using an object where the keys out of the qoute id and the value as the number as the number you get when you count the number of qoutes