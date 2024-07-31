# server_checker/views.py
import pandas as pd
import requests
from django.shortcuts import render
from django.http import HttpResponse
from .forms import ExcelUploadForm
from server_checker.models import IpAddress

def save_excel_to_db(f):

    # Read the Excel file
    df = pd.read_excel(f, engine='openpyxl')

    # for opening a certain attribute
    # print(df["status"].loc[0])
    
    for _, row in df.iterrows():
        IpAddress.objects.create(
            ip_address=row['Ip_address'],
            status=row['Status']
        )
    # Create object and save to the database
    # ServerStatus.objects.create(ip_address='192.168.1.2', status='inactive')

    # Return the response from the POST request
    return HttpResponse("Data uploaded successfully.")

def upload_excel(request):
    if request.method == 'POST':
        form = ExcelUploadForm(request.POST, request.FILES)
        if form.is_valid():
            response = save_excel_to_db(request.FILES['file'])
            if response.status_code == 200:
                return HttpResponse("Excel file processed and data posted successfully!")
            else:
                return HttpResponse(f"Failed to post data: {response.text}", status=response.status_code)
    else:
        form = ExcelUploadForm()
    return render(request, 'server_checker/upload_excel.html', {'form': form})

def homepage(request):
    return render(request, 'server_checker/homepage.html')

def check_excel_existence(data):

        # exists = ServerStatus.objects.filter(ip_address='192.168.1.2').exists()
    
    # Create DataFrame
    df = pd.read_excel(data, engine='openpyxl')
    
    
    for index, row in df.iterrows():
        if(not IpAddress.objects.filter(ip_address=row[0]).exists()):
            df.at[index, 'Status'] = "Inactive"
            
            
    
    # Create a BytesIO buffer to hold the Excel file
    from io import BytesIO
    buffer = BytesIO()
    
    # Write the DataFrame to the buffer using openpyxl
    with pd.ExcelWriter(buffer, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Sheet1')
    
    # Get the content from the buffer
    buffer.seek(0)
    excel_file = buffer.getvalue()
    
    # Return the file as an HTTP response
    response = HttpResponse(excel_file, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename="updated.xlsx"'
    
    return response


def check_excel(request):
    if request.method == 'POST':
        form = ExcelUploadForm(request.POST, request.FILES)
        if form.is_valid():
            response = check_excel_existence(request.FILES['file'])
            if response.status_code == 200:
                return response # HttpResponse("Excel file processed and data posted successfully!")
            else:
                return HttpResponse(f"Failed to post data: {response.text}", status=response.status_code)
    else:
        form = ExcelUploadForm()
    return render(request, 'server_checker/upload_excel.html', {'form': form})



def delete_items(request):    
    IpAddress.objects.all().delete()
    return HttpResponse("All data is deleted")