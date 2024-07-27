from rest_framework import serializers
from .models import User, ApartmentSearch

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ApartmentSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApartmentSearch
        fields = '__all__'
        read_only_fields = ('user', 'search_date')

class CreateApartmentSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApartmentSearch
        exclude = ('user', 'search_date')
