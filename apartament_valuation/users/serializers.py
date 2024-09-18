from rest_framework import serializers
from .models import ApartmentSearch, User

class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Hasła nie są takie same.")
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
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
