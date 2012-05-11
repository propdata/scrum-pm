from django.contrib import admin
from projects.models import Project

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'added', 'updated', 'is_active')
    list_filter = ('added', 'updated')
admin.site.register(Project, ProjectAdmin)
