from django.http import HttpResponse

from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie

def health_check(request):
    return HttpResponse("OK")



@ensure_csrf_cookie
def csrf(request):
    return JsonResponse({"detail": "ok"})