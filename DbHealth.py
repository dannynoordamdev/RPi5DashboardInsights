import os
import time
import sqlite3
import requests

# API Url, local db path
API_URL = 'http://localhost:6710/api/dbhealth'
DB_PATH = "server/systeminfo.db"

# Function to retrieve db information
def fetch_dbHealthInformation():
    size_mb = os.path.getsize(DB_PATH) / (1024 * 1024)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM SystemInfos")
    row_count = cursor.fetchone()[0]
    conn.close()
    return size_mb, row_count

# Function to send data to backend

def send_to_backend(size_mb, row_count):
    payload = {
        "sizeMB": size_mb,
        "totalRows": row_count
    }
    res = requests.post(API_URL, json=payload)
    print(res.status_code, res.text)



def main():
    while True:

        # retrieve dbhealth info
        size_mb, row_count = fetch_dbHealthInformation()

        # Post data
        send_to_backend(size_mb, row_count)
        print(size_mb)

        # repeat every 10 seconds
        time.sleep(10)



if __name__ == "__main__":
    main()