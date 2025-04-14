import time
import requests
import psutil

API_URL = 'http://localhost:6710/api/sysinfo'

# python script to fetch various system information
def fetch_system_info():

    # CPU Usage
    cpu_usage = psutil.cpu_percent(interval=1)
    # Memory Usage
    memory = psutil.virtual_memory()
    memory_usage = memory.percent

    # Temperature
    temperature = None
    if temperature is None:
        try:
            with open("/sys/class/thermal/thermal_zone0/temp", "r") as f:
                temp_str = f.readline()
                temperature = float(temp_str) / 1000.0
        except:
            temperature = "No temperature data available."

    
    return {
        'CpuUsage': str(cpu_usage),
        'MemoryUsage': str(memory_usage),
        'Temperature': int(temperature)
    }

    
# Send collected system information through POST API to the ASP.net core Backend.

def post_data(data):
    try:

        # converting floats to str
        data["CpuUsage"] = str(data["CpuUsage"])
        data["MemoryUsage"] = str(data["MemoryUsage"])
        if data["Temperature"] is not None:
            data["Temperature"] = int(data["Temperature"])
        
        


        response = requests.post(API_URL, json=data, headers={'Content-Type': 'application/json'})

        if response.status_code == 200:
            print('Data posted successfully!')
        else:
            print(f'Failed to post data: {response.status_code}')
            print('Response body:', response.text)
            print('Response Header:', response.headers)
    except Exception as e:
        print(f"Error posting data: {e}")











# Repeat every 10 seconds
def main():
    while True:
        
        # Fetch system data:
        data = fetch_system_info()

        # Print the fetched data:
        print(f"Fetched data: {data}")

        # Post data:
        post_data(data)

        # Repeat every 10 seconds:
        time.sleep(10)


if __name__ == "__main__":
    main()