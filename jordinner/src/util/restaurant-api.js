
export async function fetchRestaurants() {
   try {
     const res = await fetch(`https://capstone-backend-production-8314.up.railway.app/restaurants/`)
     return res.json()
   } catch (err) {
    return err.message
   }
}