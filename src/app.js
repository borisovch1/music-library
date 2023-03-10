import {render} from '../node_modules/lit-html/lit-html.js'
import page from '../node_modules/page/page.mjs'



import { logout as apiLogout } from './api/data.js'
import { getUserData } from './util.js'
import { loginPage, registerPage } from './views/log-reg.js'
import { homePage } from './views/home.js'
import { catalogPage } from './views/catalog.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { createPage } from './views/create.js'






const main = document.querySelector('main')
document.getElementById('logoutBtn').addEventListener('click', logout)

setUserNav() 

page('/',decorateContext,homePage)
page('/login',decorateContext,loginPage)
page('/register',decorateContext,registerPage)
page('/catalog', decorateContext, catalogPage)
page('/details/:id',decorateContext,detailsPage)
page('/edit/:id',decorateContext,editPage)
page('/create',decorateContext,createPage)


page.start()

function decorateContext(ctx,next) {
    ctx.render = (content)=>render(content,main)
    ctx.setUserNav = setUserNav
    ctx.user=getUserData()
  next()  
}

 function setUserNav() {
    const user = getUserData()
    if (user) {
        document.querySelector('.user').style.display='block'
        document.querySelector('.guest').style.display = 'none'
    } else {
         document.querySelector('.user').style.display='none'
        document.querySelector('.guest').style.display='block'
    }
}

 function logout() {
     apiLogout()
     setUserNav()
     page.redirect('/')
}