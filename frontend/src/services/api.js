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


export async function getTrip(threadId){
    const response = await fetch (`${API_BASE_URL}/trips/${threadId}`)
    if (!response.ok){
        throw new Error("Failed to fetch trip")
    }
    return response.json()
}


export async function reviewTrip(threadId, reviewData) {
  const response = await fetch(
    `${API_BASE_URL}/trips/${threadId}/review`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to review trip");
  }

  return response.json();
}