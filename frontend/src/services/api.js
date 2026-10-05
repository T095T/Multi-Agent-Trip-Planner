const API_BASE_URL = "http://localhost:8000"

export async function createTrip(tripData){
const response = await fetch(`${API_BASE_URL}/trips`,{
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify(tripData)
});
if (!response.ok){
throw new Error("Failed to create trip")
}
return response.json()
}