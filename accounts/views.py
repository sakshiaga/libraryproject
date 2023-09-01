from django.contrib.auth import authenticate
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse

from rest_framework.decorators import api_view
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from accounts.models import User, Mybook


@method_decorator(csrf_exempt, name='dispatch')
class SignupView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = []
    permission_classes = [permissions.AllowAny]


@api_view(['POST'])
def place_order(request):
    if request.method == 'POST':
        book_id = request.data.get('book_id')  # Get the book_name from the POST data
        user = request.user  # Get the logged-in user

        # Save the ordered book to the database
        Mybook.objects.create(user=user, book_id=book_id)

        return Response({'message': 'Order placed successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'Invalid request method'}, status=status.HTTP_400_BAD_REQUEST)
