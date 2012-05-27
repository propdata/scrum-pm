from tastypie.resources import ModelResource
from projects.models import Project
from tastypie import fields


class ProjectResource(ModelResource):
    open_stories = fields.IntegerField(readonly=True)
    closed_stories = fields.IntegerField(readonly=True)
    status = fields.CharField(readonly=True)

    class Meta:
        queryset = Project.objects.all().order_by('added')
        resource_name = 'projects'

    def dehydrate_open_stories(self, bundle):
        return bundle.obj.storylist_set.all().count()

    def dehydrate_closed_stories(self, bundle):
        return bundle.obj.storylist_set.all().count()

    def dehydrate_status(self, bundle):
        status = "Archived"
        if bundle.obj.is_active():
            status = "Active"
        return status
