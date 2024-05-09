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
from selenium.webdriver.support.select import Select
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

loginurl = "http://localhost:3000/"
driver.get(loginurl)

# Increase the timeout to 20 seconds
wait = WebDriverWait(driver, 20)

try:
    user_element = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="activeUser"]')))
    select_user = Select(user_element)
    select_user.select_by_value("Aimen")

    button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/form/div[7]/div/button')))
    button.click()

    manager_tab = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="navbar-default"]/ul/li[2]/a')))
    manager_tab.click()
    
    wait.until(EC.url_to_be('http://localhost:3000/invoice-manager'))  
    print(colored("Invoice Manager tab works!","cyan"))

    manager_tab = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="navbar-default"]/ul/li[3]/a')))
    manager_tab.click()

    wait.until(EC.url_to_be('http://localhost:3000/payment-history'))
    print(colored("Payment History tab works!","cyan"))


    manager_tab = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="navbar-default"]/ul/li[4]/a')))
    manager_tab.click()

    wait.until(EC.url_to_be('http://localhost:3000/auto-bill-payments'))
    print(colored("Auto Bill Payments tab works!","cyan"))

    manager_tab = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="navbar-default"]/ul/li[1]/a')))
    manager_tab.click()

    wait.until(EC.url_to_be(loginurl))
    print(colored("Admin tab works!","cyan"))


    print(" ")    
    print(colored("Test of Header tabs completed successfully","green"))
    print(" ")    

finally:
    time.sleep(3)
    driver.quit()
