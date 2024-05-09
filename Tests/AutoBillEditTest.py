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
    select_user.select_by_value("serkan")

    button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/form/div[7]/div/button')))
    button.click()

    manager_tab = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="navbar-default"]/ul/li[4]/a')))
    manager_tab.click()

    wait.until(EC.url_to_be('http://localhost:3000/auto-bill-payments'))

    bill_element = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="__next"]/main/div/div[2]')))

    edit_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/div/div[2]/div[5]/button[1]')))
    edit_button.click()

    time.sleep(2)

    frequency_element = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="frequency"]')))
    select_frequency = Select(frequency_element)
    print(frequency_element.get_attribute("value"))

    def selectNewFrequency():

        oldFrequency =   frequency_element.get_attribute("value")

        if oldFrequency == "monthly":
            newFrequency = select_frequency.select_by_value("annually")

        else:
            newFrequency = select_frequency.select_by_value("monthly")

        return newFrequency
    
    selectNewFrequency()

    frequency_element.get_attribute("value")
    
    payment_method_element = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="paymentMethod"]')))
    select_payment_method = Select(payment_method_element)

    def selectNewPaymentMethod():

        oldPaymentMethod =   payment_method_element.get_attribute("value")

        if oldPaymentMethod == "Paycell":
            newPaymentMethod = select_payment_method.select_by_value("Credit/Debit Card")

        else:
            newPaymentMethod = select_payment_method.select_by_value("Paycell")

        return newPaymentMethod

    selectNewPaymentMethod()


    amount_element = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="paymentAmount"]')))
    amount = wait.until(EC.presence_of_element_located((By.XPATH, '//*[@id="__next"]/main/div/div[2]/div[2]/p[2]')))

    amount_txt = amount.text[:-1]
    newAmount= int(amount_txt) + 1111

    amount_element.clear()
    amount_element.send_keys(newAmount)

    time.sleep(5)

    confirm_button = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="__next"]/main/form/div[2]/div[4]/button[1]')))
    confirm_button.click()

    alert = wait.until(EC.alert_is_present())

    print("")

    if alert.text == "Automatic Payment updated":
        print("")
        print(colored("Automatic bill updated successfully", "green"))
        print(" ")    
        print(colored("Test of editing automatic bill payment completed successfully","green"))
        print(" ")   


    else:
        print("")
        print(colored("Automatic bill did not update", "red"))
        print("")
        print("Test of editing automatic bill payment failed")



    #wait.until(EC.url_changes(loginurl))
    #print("Login successful")


finally:
    time.sleep(3)
    driver.quit()
