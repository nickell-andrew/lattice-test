export const getPosterUrl = (path, size = 'w185') => {
    return `http://image.tmdb.org/t/p/${size}/${path}`
}

// export const getImagesForMovie = async (movieId) => {
//     const resp = await fetch(`/movie/${movieId}/images`)
//     if (resp.ok) {
//         return await resp.json()
//     } else {
//         // handle this better
//         console.error(resp.error)
//         return {}
//     }
// }