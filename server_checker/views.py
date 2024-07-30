# server_checker/views.py
import pandas as pd
import requests
from django.shortcuts import render
from django.http import HttpResponse
from .forms import ExcelUploadForm

def manipulate_and_post_excel(f):
    # Read the Excel file
    df = pd.read_excel(f, engine='openpyxl')

    # Manipulate the data if needed
    # Example: Filter out rows where 'status' is 'Inactive'
    df = df[df['status'] != 'Inactive']

    # Convert the DataFrame to JSON
    data = df.to_dict(orient='records')

    # Define the endpoint to send the POST request to
    post_url = 'http://example.com/api/endpoint/'  # Replace with your target URL

    # Send the POST request with the manipulated data
    response = requests.post(post_url, json=data)

    # Return the response from the POST request
    return response

def upload_excel(request):
    if request.method == 'POST':
        form = ExcelUploadForm(request.POST, request.FILES)
        if form.is_valid():
            response = manipulate_and_post_excel(request.FILES['file'])
            if response.status_code == 200:
                return HttpResponse("Excel file processed and data posted successfully!")
            else:
                return HttpResponse(f"Failed to post data: {response.text}", status=response.status_code)
    else:
        form = ExcelUploadForm()
    return render(request, 'server_checker/upload_excel.html', {'form': form})