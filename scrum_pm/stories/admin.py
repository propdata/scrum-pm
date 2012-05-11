from django.contrib import admin
from projects.models import Project
from stories.models import StoryList, Story, Comment

class StoryListAdmin(admin.ModelAdmin):
    list_display = ('name', 'project', 'added', 'updated', 'created_by')
    list_filter = ('project', 'created_by', 'added', 'updated')
admin.site.register(StoryList, StoryListAdmin)


class StoryAdmin(admin.ModelAdmin):
    list_display = ('story_code', 'added', 'updated', 'created_by',
            'assigned_to', 'story_type', 'priority', 'points', 'complete')
    list_filter = ('story_list', 'created_by', 'assigned_to', 'story_type',
            'priority', 'complete', 'added', 'updated')
admin.site.register(Story, StoryAdmin)


class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'story', 'added', 'created_by', 'description')
    list_filter = ('created_by', 'added')
admin.site.register(Comment, CommentAdmin)
