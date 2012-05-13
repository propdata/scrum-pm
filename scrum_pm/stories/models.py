from django.db import models
from django.contrib.auth.models import User

from projects.models import Project
from artifacts.models import Sprint


PRIORITY = ["Critical", "High", "Normal", "Low"]
PRIORITY = zip(PRIORITY, PRIORITY)
STORY_TYPE = ["Defect", "Feature", "Todo"]
STORY_TYPE = zip(STORY_TYPE, STORY_TYPE)


class StoryList(models.Model):
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User)
    project = models.ForeignKey(Project)
    name = models.CharField(max_length=250)
    sprint = models.ForeignKey(Sprint, null=True, blank=True)

    def __unicode__(self):
        return "[%s] %s" % (self.project.name, self.name)


class Story(models.Model):
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, related_name="created")
    assigned_to = models.ForeignKey(User, related_name="assigned")
    story_type = models.CharField(max_length=50, choices=STORY_TYPE,
            default="Feature")
    complete = models.BooleanField(default=False, blank=True)
    description = models.TextField()
    priority = models.CharField(max_length=40, choices=PRIORITY,
        default="Normal", blank=True)
    points = models.IntegerField(null=True, blank=True)
    story_list = models.ForeignKey(StoryList)

    def __unicode__(self):
        return "%s-%d" % (self.story_list.project.code, self.id)

    def story_code(self):
        return unicode(self)

    class Meta:
        verbose_name_plural = "stories"


class Comment(models.Model):
    added = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User)
    story = models.ForeignKey(Story)
    description = models.TextField()

    def __unicode__(self):
        return self.description
