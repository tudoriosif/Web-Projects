const hamburgers = document.querySelectorAll('.hamburger__menu')
const nav = document.getElementById('rightNav')
const x = document.getElementById('closenav')

hamburgers.forEach(hamburger => {
        hamburger.addEventListener('click', event => {
            if(nav.className === "responsive__nav close"){
                nav.className = "responsive__nav"
                hamburgers.forEach(hamburger => {
                    hamburger.className += " close"
                }
                )
            }
        }
    )
})

x.addEventListener('click', event => {
    if(nav.className === "responsive__nav"){
        nav.className += " close"

        hamburgers.forEach(hamburger => {
            hamburger.className = "hamburger__menu"
        }
        )
    }
})