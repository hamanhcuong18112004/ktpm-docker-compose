from django.http import JsonResponse

from .tasks import add


def home(request):
    return JsonResponse({"message": "Django + Celery + Redis is running"})


def run_task(request):
    task = add.delay(2, 3)
    return JsonResponse({"task_id": task.id, "status": "queued"})
