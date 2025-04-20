import requests
import subprocess
import time

API_URL = 'http://localhost:6710/api/appstatus'


# We first try to fetch pm2 status by executing the pm2 status command using subprocess:
def fetch_pm2_status():
    try:
        result = subprocess.run(
            ['pm2', 'status'], capture_output=True, text=True, check=True
        )
        return result.stdout
    
    except subprocess.CalledProcessError as e:
        print(f"Error running pm2 status: {e}")
        return None
    

# Now we parse if theres a result from PM2:
def parse_pm2_status(pm2_status):
    lines = pm2_status.splitlines()
    data_lines = lines[3:-1]

    apps = []


    for line in data_lines:
        columns = [col.strip() for col in line.split('│')]

        app_data = {
            'Name': columns[2],
            'Uptime': columns[7], 
            'Status': columns[9] 
        }
        apps.append(app_data)

    return apps

def post_data(apps):
    for app in apps:
        data = {
            "Name": app["Name"],
            "Uptime": app["Uptime"],
            "Status": app["Status"]
        }

        try:
            response = requests.post(API_URL, json=data, headers={'Content-Type': 'application/json'})
            if response.status_code == 200:
                print(f"Successfully posted data for {app['Name']}")
            else:
                print(f"Failed to post data for {app['Name']}. Status code: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"Error posting data for {app['Name']}: {e}")


def main():
    while True:
        pm2_status = fetch_pm2_status()

        apps = parse_pm2_status(pm2_status)
        
        post_data(apps)
        # every 3 minutes 
        time.sleep(3 * 60)
            


    
if __name__ == "__main__":
    main()