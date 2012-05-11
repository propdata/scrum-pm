from django.db import models

class Project(models.Model):
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=60)
    code = models.CharField(max_length=5, help_text=(u"Terse uppercase short "
        "code used to reference items in this project."))

    def __unicode__(self):
        return self.name

    def is_active(self):
        return True
    is_active.boolean = True
