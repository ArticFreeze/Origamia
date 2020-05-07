# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import LevelModel, LevelSolvedModel

# Register your models here.


class LevelAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'difficulty')


class LevelSolvedAdmin(admin.ModelAdmin):
    list_display = ('user', 'level', 'stars')

admin.site.register(LevelModel, LevelAdmin)
admin.site.register(LevelSolvedModel, LevelSolvedAdmin)