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

    wait.until(EC.url_changes(loginurl))


    filter = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="dropdownBgHoverButton"]')))
    filter.click()

    wait.until(EC.element_to_be_clickable((By.XPATH,'//*[@id="unpaid"]' ))).click()


    select_invoice = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/div/a[1]')))
    select_invoice.click()  

    amount = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="amount"]')))

    amountnumber = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="__next"]/main/div[1]/div[2]/div[3]/p[2]')))
    amount_txt = amountnumber.text[:-1]

    amount.send_keys(amount_txt)

    # Click the send button
    send_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type=submit]")))
    send_button.click()


    alert = wait.until(EC.alert_is_present())

    print("")

    alerttxt= alert.text

    if alerttxt == "Payment successful":
        print("")
        print(colored("Test of payment function was completed successfully", "green"))
        print("")


    else:
        print("")
        print(colored("Test of payment function failed", "red"))
        print(alerttxt)
        print("")


    #wait.until(EC.url_changes(loginurl))
    #print("Login successful")


    

finally:
    time.sleep(3)
    driver.quit()
