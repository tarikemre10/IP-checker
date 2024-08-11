# server_checker/views.py
import pandas as pd
import requests
from django.shortcuts import render
from django.http import HttpResponse
from .forms import ExcelUploadForm
from server_checker.models import IpAddress
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .serializers import IpAddressSerializer

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


class UploadExcelView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        print("neden")
        if 'file' not in request.FILES:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        file_obj = request.FILES['file']
        
        try:
            # df = pd.read_excel(file_obj)
            # Call your function to save the DataFrame to the database
            response = save_excel_to_db(file_obj)
            if response.status_code == 200:
                return Response({"message": "Excel file processed and data posted successfully!"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": f"Failed to post data: {response.text}"}, status=response.status_code)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


def check_excel_existence(request, data):

        # exists = ServerStatus.objects.filter(ip_address='192.168.1.2').exists()
    
    # Create DataFrame
    df = pd.read_excel(data, engine='openpyxl')
    activeIps = []
    
    
    for index, row in df.iterrows():
        if(not IpAddress.objects.filter(ip_address=row[0]).exists()):
            df.at[index, 'Status'] = "Inactive"
        else: 
            activeIps.append(df.at[index, 'Ip_address'])
     
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


class CheckExcelView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        if 'file' not in request.FILES:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        file_obj = request.FILES['file']
        
        try:
            # Call your function to save the DataFrame to the database
            response = check_excel_existence(request, file_obj)
            
            if response.status_code == 200:
                return response
            else:
                return Response({"error": f"Failed to post data: {response.text}"}, status=response.status_code)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class DeleteItemsView(APIView):
    
    def delete(self, request, *args, **kwargs):
        try:
            IpAddress.objects.all().delete()
            return Response({"message": "All data is deleted"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class IpAddressListView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            ip_addresses = IpAddress.objects.all()
            serializer = IpAddressSerializer(ip_addresses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)