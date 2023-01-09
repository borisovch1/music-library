import { html } from '../../node_modules/lit-html/lit-html.js'

import { login, register } from '../api/data.js'


const loginTemplate = (onSubmit) => html`
 <section id="login">
                <div class="form">
                    <h2>Login</h2>
                    <form @submit=${onSubmit} class="login-form">
                        <input type="text" name="email" id="email" placeholder="email" />
                        <input type="password" name="password" id="password" placeholder="password" />
                        <button type="submit">login</button>
                        <p class="message">
                            Not registered? <a href="/register">Create an account</a>
                        </p>
                    </form>
                </div>
            </section>
`

export async function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()
       
        const formData = new FormData(e.target) 
        const  email= formData.get('email')
        const password = formData.get('password')
        if (email == '' || password == '') {
            return alert('All fields are required!')
        }
        
        await login(email, password)
        e.target.reset()
        ctx.setUserNav()
        ctx.page.redirect('/catalog')
    }
}



const registerTemplate = (onSubmit) => html`
   <section id="register">
                <div class="form">
                    <h2>Register</h2>
                    <form @submit=${onSubmit} class="login-form">
                        <input type="text" name="email" id="register-email" placeholder="email" />
                        <input type="password" name="password" id="register-password" placeholder="password" />
                        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                        <button type="submit">register</button>
                        <p class="message">Already registered? <a href="/login">Login</a></p>
                    </form>
                </div>
            </section>
`

export async function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit))

    async function onSubmit(e) {
        e.preventDefault()
       
        const formData = new FormData(e.target) 
        const  email= formData.get('email').trim()
        const password = formData.get('password').trim()
        const repeatPass = formData.get('re-password').trim()

        if (!email || !password) {
            return alert('All fields are required!')
        }
        if (password != repeatPass) {
            return alert('Password doh\'t match!')
        }
        
        await register(email, password)
        e.target.reset()
        ctx.setUserNav()
        ctx.page.redirect('/catalog')
    }
}