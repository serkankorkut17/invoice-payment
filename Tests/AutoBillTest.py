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

    manager_tab = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="navbar-default"]/ul/li[4]/a')))
    manager_tab.click()

    wait.until(EC.url_to_be('http://localhost:3000/auto-bill-payments'))


    bill_type_element = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="billType"]')))
    select_bill_type = Select(bill_type_element)
    select_bill_type.select_by_value("internet")


    frequency_element = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="frequency"]')))
    select_frequency = Select(frequency_element)
    select_frequency.select_by_value("annually")

    payment_method_element = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="paymentMethod"]')))
    select_payment_method = Select(payment_method_element)
    select_payment_method.select_by_value("Paycell")

    amount_element = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="paymentAmount"]')))
    amount_element.send_keys("1000")


    # Click the send button
    send_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/form/div[2]/div[5]/button')))
    send_button.click()

    alert = wait.until(EC.alert_is_present())

    print("")

    print(alert.text)

    if alert.text == "Automatic Payment created":
        print("")
        print(colored("Automatic bill sent successfully", "green"))
        print("")


    else:
        print("")
        print(colored("Automatic bill not sent", "red"))
        print("")



    #wait.until(EC.url_changes(loginurl))
    #print("Login successful")


finally:
    time.sleep(2)
    driver.quit()
