"""
app.py

This one file is all you need to start off with your FastAPI server!
"""

from typing import Optional

import uvicorn
from fastapi import FastAPI, status

import urllib.request
import urllib.parse
import json
from pathlib import Path

# Initializing and setting configurations for your FastAPI application is one
# of the first things you should do in your code.
app = FastAPI()

OCR_API_KEY = 'K81624200688957'
BASE_OCR_URL = 'https://api.ocr.space/parse/image'

# The line starting with "@" is a Python decorator. For this tutorial, you
# don't need to know exactly how they work, but if you'd like to read more on
# them, see https://peps.python.org/pep-0318/.
#
# In short, the decorator declares the function it decorates as a FastAPI route
# with the path of the provided route. This line declares that a new GET route
# called "/" so that if you access "http://localhost:5000/", the below
# dictionary will be returned as a JSON response with the status code 200.
#
# For any other routes you declare, like the `/home` route below, you can access
# them at "http://localhost:5000/home". Because of this, we'll be omitting the
# domain portion for the sake of brevity.

def build_search_url(image_path: Path):
    """builds the search url that would be needed to get the data"""
    query_parameters = [
        ('apikey', OCR_API_KEY), ('file', image_path)
    ]

    return f'{BASE_OCR_URL}?{urllib.parse.urlencode(query_parameters)}'

def get_search_result(url: str, data = None):
    """returns the search result based on the search url"""

    # json_data = json.dumps(data).encode("utf-8")

    # # Create a Request object with the specified URL
    # request = urllib.request.Request(url, data=json_data)

    # # Set the HTTP method to "POST"
    # request.method = 'POST'

    # with urllib.request.urlopen(request) as response:
    #     json_text = response.read().decode(encoding = 'utf-8')

    #     return json.loads(json_text)
    
    with open('C:\\Users\\benso\\PetrCalendar\\week10_drops.png', 'rb') as image_file:
            # Create a Request object with the specified URL
            request = urllib.request.Request(search_url, data=image_file.read())

            # Set the HTTP method to "POST"
            request.method = 'POST'
            
            # Add headers
            request.add_header('Content-Type', 'image/jpeg')  # Adjust content type based on image format

            # Send the POST request
            with urllib.request.urlopen(request) as response:
                # Read the response data
                json_text = response.read().decode(encoding='utf-8')

                # Parse the JSON response
                json_data = json.loads(json_text)
                return json_data

search_url = build_search_url(Path('C:\\Users\\benso\\PetrCalendar\\week10_drops.png'))
print(get_search_result(search_url))


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/home")
def home():
    return {"message": "This is the home page"}


# The routes that you specify can also be dynamic, which means that any path
# that follows the format `/items/[some integer]` is valid. When providing
# such path parameters, you'll need to follow this specific syntax and state
# the type of this argument.
#
# This path also includes an optional query parameter called "q". By accessing
# the URL "/items/123456?q=testparam", the JSON response:
#
# { "item_id": 123456, "q": "testparam" }
#
# will be returned. Note that if `item_id` isn't an integer, FastAPI will
# return a response containing an error statement instead of our result.
@app.get("/items/{item_id}")
def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}


# TODO: Add POST route for demo


if __name__ == "__main__":
    uvicorn.run("main:app", port=5000, reload=True)
