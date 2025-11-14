let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let container = document.getElementById('info-container')

let content = `
                <p class='font-bold text-md'>${currentUser.RIBprincipale}</p>
                <p class='text-[0.9rem]'>${currentUser.fullName}</p>
                <p class='text-gray-400 text-[0.9rem]'>${currentUser.idPrincipale}</p>`
container.innerHTML = content