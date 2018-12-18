from django.db import models
from django.utils import timezone


class Question(models.Model):
    text = models.CharField(max_length=200)
    date = models.DateTimeField("date published")

    def __str__(self):
        return self.text

    def published_recently(self):
        return self.date >= timezone.now() - timezone.timedelta(days=1)


class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __str__(self):
        return self.text
