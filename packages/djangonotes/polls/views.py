from django.shortcuts import render, get_object_or_404
from django.http import Http404
from .models import Question


def index(request):
    questions = Question.objects.order_by("date")[:5]
    return render(request, "polls/index.html", {
        "questions": questions
    })


def details(request, id):
    question = get_object_or_404(Question, pk=id)
    return render(request, "polls/details.html", {
        "question": question
    })


def results(request, id):
    response = "You're looking at the results of question %s"
    return HttpResponse(response % id)


def vote(request, id):
    reponse = "You're voting on question %s"
    return HttpResponse(reponse % id)
