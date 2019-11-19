export const getDetails = async (movieId) => {
    const resp = await fetch(`/movie/${movieId}`)
    if (resp.ok) {
        return await resp.json()
    } else {
        // handle this better
        console.error(resp.error)
        return {}
    }
}