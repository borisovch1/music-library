import { html } from '../../node_modules/lit-html/lit-html.js'
import { getAllAlbums } from '../api/data.js'
import { albumTemplate } from './common/album.js'

const catalogTemplate = (album) => html`
   <section id="dashboard">
                <h2>Albums</h2>
                <ul class="card-wrapper">

          ${album.length == 0 ? html`
          <h2>There are no albums added yet.</h2>
          ` : album.map(albumTemplate)}

     </section>
`

export async function catalogPage(ctx) {
    const album=await getAllAlbums()
    ctx.render(catalogTemplate(album))
}