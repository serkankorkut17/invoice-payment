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

    manager_tab = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="navbar-default"]/ul/li[4]/a')))
    manager_tab.click()

    wait.until(EC.url_to_be('http://localhost:3000/auto-bill-payments'))


    bill_element = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="__next"]/main/div/div[2]')))

    delete_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/div/div[2]/div[5]/button[2]')))
    delete_button.click()

    alert = wait.until(EC.alert_is_present())

    print("")

    print(alert.text)

    if alert.text == "Automatic Payment deleted":
        print("")
        print(colored("Automatic bill deleted successfully", "green"))
        print(" ")    
        print(colored("Test of deleting automatic bill completed successfully","green"))
        print(" ")   


    else:
        print("")
        print(colored("Automatic bill not deleted", "red"))
        print("")
        print(colored("Test of deleting automatic bill failed","red"))



    #wait.until(EC.url_changes(loginurl))
    #print("Login successful")


finally:
    time.sleep(3)
    driver.quit()
