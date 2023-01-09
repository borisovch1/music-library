import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAlbumById, updateAlbums } from '../api/data.js'

const editTemplate = (album, onSubmit) => html`
 <section id="edit">
                <div class="form">
                    <h2>Edit Album</h2>
                    <form @submit=${onSubmit} class="edit-form">
                        <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" .value=${album.singer} />
                        <input type="text" name="album" id="album-album" placeholder="Album" .value=${album.album}/>
                        <input type="text" name="imageUrl" id="album-img" placeholder="Image url" .value=${album.imageUrl}/>
                        <input type="text" name="release" id="album-release" placeholder="Release date" .value=${album.release}/>
                        <input type="text" name="label" id="album-label" placeholder="Label" .value=${album.label}/>
                        <input type="text" name="sales" id="album-sales" placeholder="Sales" .value=${album.sales}/>

                        <button type="submit">post</button>
                    </form>
                </div>
            </section>
`

export async function editPage(ctx) {
    const albumId = ctx.params.id
    const album =await getAlbumById(albumId)
    
    ctx.render(editTemplate(album, onSubmit))
   
    
    async function onSubmit(e) {
        e.preventDefault()

          const formData = new FormData(e.target)
        const editedAlbum = {
         singer: formData.get('singer').trim(),
         album: formData.get('album').trim() ,
         imageUrl: formData.get('imageUrl').trim() ,
         release: formData.get('release').trim() ,
         label: formData.get('label').trim() ,
         sales: formData.get('sales').trim()
        }
      
        if (Object.values(editedAlbum).some(x =>!x)) {
            return alert('All fields are required!')
        }


        await updateAlbums(albumId, editedAlbum)
        e.target.reset()
        ctx.page.redirect('/details/'+albumId)
    }
}