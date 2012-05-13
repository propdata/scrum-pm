from django.db import models
from django.contrib.auth.models import User


class Sprint(models.Model):
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, related_name="sprint_created")
    starts = models.DateTimeField()
    ends = models.DateTimeField()
    retrospective = models.TextField(null=True, blank=True)

    def sprint_code(self):
        return "SPRINT-%d" % self.id

    def __unicode__(self):
        return self.sprint_code()
