import asyncio
from ai_core import process_query

async def main():
    query = "What is the origin of Natya Veda?"
    print(f"Executing query: {query}")
    try:
        result = await process_query(query)
        print("\n--- RESULTS ---")
        print("Shlokas Retrieved:")
        for s in result["shlokas"]:
            print(f"- {s['shloka_iast']}")
        print("\nExplanation:")
        print(result["explanation"])
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
