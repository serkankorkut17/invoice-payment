import time
import sqlite3
from termcolor import colored
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

options = Options()
options.add_experimental_option("detach", True)

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)

sqlite_db_path="src/utils/mydatabase.sqlite"

def verify_user_in_db(username):
    """Connect to the SQLite database and verify the user is present."""
    try:
        conn = sqlite3.connect(sqlite_db_path)
        cursor = conn.cursor()

        # Replace 'Users' with your actual table name
        cursor.execute("SELECT * FROM Users WHERE user_id = ?", (username,))
        user = cursor.fetchone()
        cursor.close()
        conn.close()

        return user 

    except Exception as e:
        print(f"Database error: {e}")
        return False

loginurl = "http://localhost:3001/"
driver.get(loginurl)

# Increase the timeout to 20 seconds
wait = WebDriverWait(driver, 20)

try:
    # Wait for the "Add New" button using partial link text
    add_reciver_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/form/div[4]/div/button')))
    add_reciver_button.click()

    # Confirm successful click 
    print(" ")    
    print("Button clicked successfully \nPopup opened")

    user_name = "Test"  # Example: Replace with the actual username

    username_element = wait.until(EC.presence_of_element_located((By.NAME, 'username')))
    username_element.send_keys(user_name)

    add_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/div[2]/div[1]/div/form/button')))
    add_button.click()
    user = verify_user_in_db(user_name)

    if verify_user_in_db(user_name):
        print(" ")    
        print(f"User was added successfully to the database!")
        print(user)
        time.sleep(2)
        print(" ")    
        print(colored("Test of adding new recipient completed successfully","green"))
        print(" ")    

    else:
        print("User not found in the database.")
        print(colored("Test of adding new recipient completed unsuccessfully","red"))


finally:
    time.sleep(2)
    driver.quit()