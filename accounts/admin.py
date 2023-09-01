from django.contrib import admin
from accounts.models import User
from .models import Mybook, Book

admin.site.register(User)
admin.site.register(Book)
admin.site.register(Mybook)
