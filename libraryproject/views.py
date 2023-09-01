from django.http import JsonResponse
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from collections import defaultdict



@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def dashboard(request):
    user = request.user
    user_data = {
        'name': user.name,
        'phone': user.phone,
        'email': user.email,
        'address': user.address,
        'college': user.college,
        'is_active': user.is_active,
        'is_staff': user.is_staff,
        'last_login': user.last_login,
    }
    return JsonResponse(user_data)




# views.py
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import Book, Mybook

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def allbooks(request):
    books_by_category = defaultdict(list)
    books = Book.objects.all()
    
    for book in books:
        book_data = {
            "id": book.id,
            "title": book.title,
            "author": book.author,
            "category": book.category
        }
        books_by_category[book.category].append(book_data)
        
    my_ordered_books = Mybook.objects.filter(user=request.user).values_list("book_id", flat=True)
    
    books_data = dict(books_by_category)
    
    return JsonResponse({"books": books_data, "my_books": list(my_ordered_books)}, safe=False)



@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def mybooks(request):
    user_books = Mybook.objects.filter(user=request.user)
    user_books_data = []
    for mybook in user_books:
        user_books_data.append({
            "book_id": mybook.book.id,
            "title": mybook.book.title,
            "author": mybook.book.author,
            "category": mybook.book.category,
        })
    return JsonResponse({"books": user_books_data})
