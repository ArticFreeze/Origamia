# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import LevelModel

# Register your models here.


class LevelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'difficulty')


admin.site.register(LevelModel, LevelAdmin)
