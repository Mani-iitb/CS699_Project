from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import sys
import io

# Ensure UTF-8 encoding for standard output
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# Input data
sourceCity = sys.argv[1]

desCity = sys.argv[2]
fromDate = sys.argv[3]
toDate = datetime.strptime(fromDate, "%Y-%m-%d") + timedelta(days=7)
toDate = toDate.strftime("%Y-%m-%d")

# Scraping the first website
url = f"https://www.kayak.co.in/flights/{sourceCity}-{desCity}/{fromDate}?sort=bestflight_a"
option = webdriver.ChromeOptions()
option.add_argument("--headless=old")
userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
option.add_argument(f'user-agent={userAgent}')

driver = webdriver.Chrome(options=option)
driver.get(url=url)
time.sleep(5)  
page = driver.page_source
driver.quit()
soup = BeautifulSoup(page, 'html.parser')

# Extracting flight information from the soup object
departure_info_elements = soup.find_all(class_="vmXl vmXl-mod-variant-large",limit=10)
airport_info_elements = soup.find_all(class_="EFvI",limit=10)
direct_flight_elements = soup.find_all(class_="JWEO-stops-text",limit=10)
flight_time_elements = soup.find_all(class_="xdW8 xdW8-mod-full-airport",limit=10)
price_elements = soup.find_all(class_="f8F1-price-text",limit=10)
flight_name_info = soup.find_all(class_="J0g6-operator-text",limit=10)

# Lists to store flight information
departure_times = []
airport_routes = []
direct_flight_statuses = []
flight_durations = []
prices = []
flight_names = []
time_takeoff = []  
time_landing = []   

# Extracting departure times
for departure in departure_info_elements:
    time_spans = departure.find_all('span')
    st=time_spans[0].get_text()
    time_takeoff.append(st)
    et=time_spans[-1].get_text()
    time_landing.append(et)
    combined_time=str(st)+" - "+str(et)
    departure_times.append(combined_time)

# Extracting airport information
for airport in airport_info_elements:
    airport_details = airport.find_all(class_="jLhY-airport-info")
    
    # Extracting source airport
    source_airport = airport_details[0].find_all('span')
    source_combined = source_airport[0].get_text() + " " + source_airport[1].get_text()
    
    # Extracting destination airport
    destination_airport = airport_details[1].find_all('span')
    destination_combined = destination_airport[0].get_text() + " " + destination_airport[1].get_text()
    
    airport_routes.append(source_combined + " - " + destination_combined)

# Extracting direct flight statuses
for flight in direct_flight_elements:
    direct_flight_statuses.append(flight.get_text())

# Extracting flight durations
for duration in flight_time_elements:
    duration_divs = duration.find_all("div")
    flight_durations.append(duration_divs[0].get_text())

# Extracting flight prices
for price in price_elements:
    p=price.get_text()[1:]
    p=int(p.replace(",",""))
    prices.append(p)

# Extracting flight names
for flight in flight_name_info:
    flight_names.append(flight.get_text())
# print(str(len(flight_names))+" "+str(len(flight_durations))+" "+str(len(time_landing))+" "+str(len(prices))+" "+str(len(direct_flight_statuses)))
dat=datetime.strptime(fromDate,"%Y-%m-%d")
dat=dat.strftime("%d%m%Y")
option = webdriver.ChromeOptions()
option.add_argument("--headless=old")
userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
option.add_argument(f'user-agent={userAgent}')

driver = webdriver.Chrome(options=option)
url=f"https://www.ixigo.com/search/result/flight?from={sourceCity}&to={desCity}&date={dat}&adults=1&children=0&infants=0&class=e&source=Search%20Form"
driver.get(url=url)
time.sleep(5)
page=driver.page_source
driver.quit()
soup=BeautifulSoup(page,"html.parser")

# Find all details in the webpage that are stored in a flexbox layout
details = soup.find_all(class_="flex flex-col")
count = 0  # Initialize a counter

# Iterate through the flight details
for detail in details[5]:  # Access the flight info section (assumed to be details[5])
    if(count == 0):
        count += 1  # Skip the first element (assumed to be a header or irrelevant)
        continue
    count += 1
    if(count == len(details[5]) - 1):
        break  # Skip the last element (if it contains irrelevant information)

    # Extract flight name and flight code
    flight = detail.find(class_="body-md text-primary truncate max-w-[125px] airlineTruncate font-medium")
    f = flight.get_text()
    flight = detail.find_all(class_="body-sm text-secondary truncate max-w-[115px]")
    f += " " + str(flight[0].get_text())  # Concatenate additional flight details (e.g., flight number)
    flight_names.append(f)  # Add flight name and code to flight_names list

    # Extract takeoff and landing times
    st = detail.find(class_="h5 text-primary font-medium")  # Takeoff time
    ft = detail.find(class_="h6 text-primary font-medium")  # Landing time
    st=st.get_text()
    ft=ft.get_text()
    time_takeoff.append(st)  # Store takeoff time
    time_landing.append(ft)  # Store landing time
    t = st + " - " + ft # Combine takeoff and landing time
    departure_times.append(t)  # Store formatted departure time

    # Extract flight duration
    t = detail.find_all(class_="body-xs text-secondary")
    flight_durations.append(t[0].get_text())  # Add flight duration to the list

    # Check if the flight is direct or has layovers
    direct_flight_statuses.append(t[1].get_text())  # Store direct flight status (e.g., "Nonstop", "1 Stop", etc.)

    # Extract flight price
    price = detail.find(class_="h5 text-primary font-bold")
    p=price.get_text()[1:]
    p=int(p.replace(",",""))
    prices.append(p)  # Add flight price to the list
    airport_routes.append("Not available")


option = webdriver.ChromeOptions()
option.add_argument("--headless=old")
userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
option.add_argument(f'user-agent={userAgent}')

driver = webdriver.Chrome(options=option)
url=f"https://tickets.paytm.com/flights/flightSearch/{sourceCity}/{desCity}/1/0/0/E/{fromDate}"
driver.get(url=url)
time.sleep(20)
page=driver.page_source
driver.quit()
soup=BeautifulSoup(page,"html.parser")
details=soup.find(class_="_2OdgL")

for detail in details:
    flight=detail.find(class_="_2cP56")
    if(str(flight)=="None"):
        continue
    flight_names.append(flight.get_text())
    #fligt timing
    st=detail.find_all(class_="_3gpc5")
    
    ft=st[1]
    st=st[0]
    st=st.get_text()
    ft=ft.get_text()
    st=datetime.strptime(st,"%I:%M%p")
    st=st.strftime("%H:%M")
    ft=datetime.strptime(ft,"%I:%M%p")
    ft=ft.strftime("%H:%M")
    time_takeoff.append(st)
    time_landing.append(ft)
    t=st+" - "+ft
    departure_times.append(t)
    #Duration
    t=detail.find(class_="_1J4f_")
    t=t.get_text()
    parts = t.split('•')

    # Strip any leading or trailing whitespace and assign to a and b
    a = parts[0].strip().split()[-2] + ' ' + parts[0].strip().split()[-1]
    b = parts[1].strip()
    if(a[0]=="—"):
        a=a[2:]
    flight_durations.append(a)
    #Direct or not
    b=b[:-1]
    direct_flight_statuses.append(b)
    
    #price
    price=detail.find(class_="_2MkSl")
    p=price.get_text()[1:]
    p=int(p.replace(",",""))
    prices.append(p)

depart_date=datetime.strptime(fromDate,"%Y-%m-%d")
depart_date=depart_date.strftime("%d/%m/%Y")
option = webdriver.ChromeOptions()
option.add_argument("--headless=old")
userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
option.add_argument(f'user-agent={userAgent}')

driver = webdriver.Chrome(options=option)
url=f"https://www.cleartrip.com/flights/results?adults=1&childs=0&infants=0&class=Economy&depart_date={depart_date}&from={sourceCity}&to={desCity}"
driver.get(url=url)
time.sleep(5)
page=driver.page_source
driver.quit()
soup=BeautifulSoup(page,"html.parser")
# Extracting flight information from the soup object
flight_first_name_info=soup.find_all(class_="fw-500 fs-2 c-neutral-900",limit=15)
flight_second_name_info=soup.find_all(class_="fs-1 c-neutral-400 pt-1",limit=15)
flight_durations_info=soup.find_all(class_="m-0 fs-2 fw-400 c-neutral-400 ta-center lh-copy",limit=15)
flight_direct_info=soup.find_all(class_="m-0 fs-2 c-neutral-400 lh-copy",limit=15)
price_elements = soup.find_all(class_="m-0 fs-5 fw-700 c-neutral-900 ta-right false",limit=15)
takeoff_time_element=soup.find_all(class_="m-0 fs-5 fw-400 c-neutral-900",limit=15)
landing_time_element=soup.find_all(class_="m-0 fs-5 fw-400 c-neutral-900 ta-center p-relative",limit=15)

for i in range(15):
    fn=flight_first_name_info[i].get_text()
    sn=flight_second_name_info[i].get_text()
    n=fn+" "+sn
    flight_names.append(n)
    flight_durations.append(flight_durations_info[i].get_text())
    direct_flight_statuses.append(flight_direct_info[i].get_text())
    p=price_elements[i].get_text()[1:]
    p=int(p.replace(",",""))
    prices.append(p)
    st=takeoff_time_element[i].get_text()
    et=landing_time_element[i].get_text()
    time_takeoff.append(st)
    time_landing.append(et)
    tt=st+" - "+et
    departure_times.append(tt)

for i in range (len(flight_names)):
    s=','
    if(i==len(flight_names)-1):
        s=';'
    print(f"({sourceCity},{desCity},{flight_names[i]},{flight_durations[i]},{departure_times[i]},{time_takeoff[i]},{time_landing[i]},{prices[i]},{direct_flight_statuses[i]}){s}")


