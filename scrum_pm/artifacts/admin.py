from django.contrib import admin
from artifacts.models import Sprint


class SprintAdmin(admin.ModelAdmin):
    list_display = ('sprint_code', 'starts', 'ends', 'added', 'updated',
            'created_by')
    list_filter = ('created_by', 'added', 'updated')
admin.site.register(Sprint, SprintAdmin)
