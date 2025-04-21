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
        return result.stdout # return text output after running pm2 status..
    
    except subprocess.CalledProcessError as e:
        print(f"Error running pm2 status: {e}")
        return None
    

# Now we parse if theres a result from PM2:
def parse_pm2_status(pm2_status):
    lines = pm2_status.splitlines()
    data_lines = lines[3:-1] # Grab everything from element 4 and skip the last one

    apps = []


    for line in data_lines:
        columns = [col.strip() for col in line.split('│')]
        # Each line in data_lines first get seperated after each |, and then spaces etc get removed due to strip()

        app_data = { # grab what we need from the pm2 text output
            'Name': columns[2],
            'Uptime': columns[7], 
            'Status': columns[9] 
        } 
        apps.append(app_data) # append into apps array

    return apps

def post_data(apps):
    for app in apps:
        data = {
            "Name": app["Name"],
            "Uptime": app["Uptime"],
            "Status": app["Status"]
        } # and here, for each app we make a seperate POST request.

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