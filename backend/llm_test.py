from langchain_ollama import ChatOllama


llm = ChatOllama(
    model="qwen2.5:7b",
    base_url="http://localhost:11434",
)

response = llm.invoke(
    "Give me a short 3-day travel itinerary for Paris."
)

print(response.content)