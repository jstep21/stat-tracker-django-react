from django.shortcuts import render
from django.http import JsonResponse
from datetime import date, datetime
import pytz
# import soccerdata as sd
from mobfot import MobFot

client = MobFot()

# Create your views here.
def get_matches(request):
    edt_tz = pytz.timezone('America/New_York')
    current_time_edt = datetime.now(edt_tz)
    
    date_str = request.GET.get('date', current_time_edt.strftime('%Y%m%d'))
    
    try:
        date_obj = datetime.strptime(date_str, '%Y%m%d').date()
        date_str = date_obj.strftime('%Y%m%d')
    except ValueError:
        return JsonResponse({'error': 'Invalid date formate. Use YYYYMMDD'}, status=400)
    
    try:
        daily_matches = client.get_matches_by_date(date_str)
        daily_matches_by_league = daily_matches['leagues']
    except Exception as e:
        return JsonResponse({'error': f'Failed to fetch matches: {str(e)}'}, status=500)
    
    return JsonResponse(daily_matches_by_league, safe=False)


def get_match(request, match_id):
    requested_match = client.get_match_details(match_id)
    return JsonResponse(requested_match)

