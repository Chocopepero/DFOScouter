import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.conf import settings

@api_view(["GET"])
def get_data(request):
    data = {"message": "Hello, World!"}
    return Response(data)

def get_characters(request, characterName):
    serverId = request.GET.get('serverId', 'all')
    jobId = request.GET.get('jobId', '')
    jobGrowId = request.GET.get('jobGrowId', '')
    limit = request.GET.get('limit', '')
    wordType = request.GET.get('wordType', '')
    apikey = settings.API_KEY 

    url = f"https://api.dfoneople.com/df/servers/{serverId}/characters?characterName={characterName}&jobId={jobId}&jobGrowId={jobGrowId}&limit={limit}&wordType={wordType}&apikey={apikey}"

    response = requests.get(url)
    data = response.json()

    return JsonResponse(data)