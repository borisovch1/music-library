import * as api from './api.js'

const host='http://localhost:3030'
api.settings.host = host

export const login =api.login
export const register =api.register
export const logout = api.logout
//get all ads

export async function getAllAlbums() {
    return await api.get(host+'/data/albums?sortBy=_createdOn%20desc')
}

//get by id

export async function getAlbumById(id) {
    return await api.get(host+'/data/albums/'+id)
}
//create
export async function createAlbums(album) {
    return await api.post(host+'/data/albums',album)
}
//edit
export async function updateAlbums(id,album) {
    return await api.put(host+'/data/albums/'+id,album)
}
// delete
export async function deleteAlbums(id) {
    return await api.del(host+'/data/albums/'+id)
}

// like

export async function likeAlbum(albumId) {
    return api.post('/data/likes',{albumId})
}

export async function getLikeByAlbumId(albumId) {
  return api.get(
    `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`);
}

export async function getMyLikesByAlbumId(albumId, userId) {
  return api.get(
    `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
  );
}




