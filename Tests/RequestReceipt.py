"""
This code tests the functionality of adding menu items to restaurants of our website
"""

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
    user = wait.until(EC.element_to_be_clickable((By.ID, 'activeUser')))
    user.find_element(By.XPATH,'//*[@id="activeUser"]/option[3]').click()

    button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/form/div[7]/div/button')))
    button.click()

    manager_tab = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="navbar-default"]/ul/li[2]/a')))
    manager_tab.click()

    wait.until(EC.url_changes(loginurl))


    select_invoice = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/div/a[1]')))
    select_invoice.click()  


    # Click the send button
    send_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/div[2]/div[2]/div[1]/button')))
    send_button.click()


    print(colored("Test of Receipt request function was completed successfully!", "green"))

    #wait.until(EC.url_changes(loginurl))
    #print("Login successful")


finally:
    time.sleep(5)
    driver.quit()
