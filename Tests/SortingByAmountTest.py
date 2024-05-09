
"""
This code tests the functionality of adding menu items to restaurants of our website
"""

import time
import sqlite3
import re
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



def extract_amount(anchor_text):
    match = re.search(r'Payment Amount:\s*([\d,.]+)\s*₺', anchor_text)
    if match:
        return float(match.group(1).replace(',', ''))
    return None


def is_sorted_descending(anchor_elements):
    amounts = [extract_amount(anchor.text) for anchor in anchor_elements]
    print("Extracted amounts:", amounts)
    return all(earlier >= later for earlier, later in zip(amounts, amounts[1:]))

try:
    user_element = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="activeUser"]')))
    select_user = Select(user_element)
    select_user.select_by_value("Aimen")

    button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/form/div[7]/div/button')))
    button.click()

    manager_tab = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="navbar-default"]/ul/li[2]/a')))
    manager_tab.click()

    wait.until(EC.url_changes(loginurl))

    sort = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="dropdownBottomButton"]')))
    sort.click()



    wait.until(EC.element_to_be_clickable((By.XPATH,'//*[@id="dropdownBottom"]/ul/li[4]/button' ))).click()

    anchor_elements = driver.find_elements(By.XPATH, '//*[@id="__next"]/main/div/a')


    if is_sorted_descending(anchor_elements):
        print("")
        print("The invoices are sorted in descending order by amount.")
        print("")
        print(colored("Test of Sorting function was completed successfully!", "green"))
        print("")
    else:
        print("The invoices are NOT sorted in descending order by amount.")
        print("")
        print(colored("Test of Sorting function failed!", "red"))


finally:
    time.sleep(3)
    driver.quit()
