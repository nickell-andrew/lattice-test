export const getMoviesByTitle = async (query) => {
    const resp = await fetch(`/search?query=${query}`)
    if (resp.ok) {
        return await resp.json()
    } else {
        // handle this better
        console.error(resp.error)
        return {}
    }
}