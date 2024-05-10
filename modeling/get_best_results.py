try:
    with open("clean_results.txt", "r", encoding="utf-8") as file:
        lines = file.readlines()

    results = []
    weights = []
    values = {}

    if lines:
        for line in lines:
            data = line.strip().split(": ")
            results.append(float(data[1]))
            weights.append(data[0])
        sorted_results = results.copy()
        sorted_results.sort(reverse=True)
        for res in sorted_results[:10]:
            values[weights[results.index(res)]] = res
        
        
        with open("best_results.txt", "w", encoding="utf-8") as file:
            for key, value in values.items():
                file.write(f"{key}: {value}\n")
        
            
    
except FileNotFoundError:
    print("File not found")