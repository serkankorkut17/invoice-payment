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

loginurl = "http://localhost:3000/"
driver.get(loginurl)

# Increase the timeout to 20 seconds
wait = WebDriverWait(driver, 20)

try:
    amount_element = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="amount"]')))
    amount_element.send_keys("2530.50")

    date_element = wait.until(EC.presence_of_element_located((By.NAME, 'dueDate')))
    date_element.send_keys("06/06/2024")

    category = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="invoiceType"]')))
    category.find_element(By.XPATH,'//*[@id="invoiceType"]/option[3]').click()


    category = wait.until(EC.element_to_be_clickable((By.ID, 'recipient')))
    category.find_element(By.XPATH,'//*[@id="recipient"]/option[3]').click()

    # Click the send button
    send_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type=submit]")))
    send_button.click()

    alert = wait.until(EC.alert_is_present())

    print("")

    print(alert.text)

    if alert.text == "Invoice created":
        print("")
        print(colored("Invoice sent successfully", "green"))
        print("")


    else:
        print("")
        print(colored("Invoice not sent", "red"))
        print("")



    #wait.until(EC.url_changes(loginurl))
    #print("Login successful")


finally:
    time.sleep(2)
    driver.quit()
