import time
import pyautogui
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import sys
import time

# Function to handle the alert box with username and password
def handle_alert(driver, username, password):
    try:
         actions = ActionChains(driver)
         #   actions.send_keys(username)
         for c in username:
               # print(c)
               actions.send_keys(c)    
               actions.pause(0.5)     

         actions.send_keys("\t")
         actions.pause(0.5)

         for c in password:
               actions.send_keys(c) 
               actions.pause(0.5)

         #   actions.send_keys(password)
         actions.send_keys("\t")
         actions.pause(0.5)
         actions.key_down(Keys.ENTER)
         actions.pause(0.5)
         actions.perform()
   
         return True
    except Exception as e:
        print(f"An error occurred while handling the alert box: {e}")
        return False

# Function to extract redirected URL
def extract_redirected_url(driver):
    redirected_url = driver.current_url
    return redirected_url

# Main function
def main():
    # Initialize PyAutoGUI
    pyautogui.PAUSE = 1

    # Initialize Selenium WebDriver
    chrome_options = Options()
   #  chrome_options.add_argument('--headless')
    driver = webdriver.Chrome(options=chrome_options)

    # Open the browser and navigate to the initial URL
    driver.get(sys.argv[1])

    time.sleep(5)

    # Handle the alert box
    if not handle_alert(driver, sys.argv[2], sys.argv[3]):
        print("Login canceled.")
        return

    # Wait for the redirection (adjust the sleep time as needed)
    time.sleep(5)

    # Extract the redirected URL
    redirected_url = extract_redirected_url(driver)
    print("Redirected URL:", redirected_url)

    # Close the browser session
    driver.quit()

if __name__ == "__main__":
    main()
