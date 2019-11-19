export const getPopular = async (movieId) => {
    const resp = await fetch('/popular')
    if (resp.ok) {
        return await resp.json()
    } else {
        // handle this better
        console.error(resp.error)
        return {}
    }
}