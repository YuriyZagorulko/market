from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
from django.contrib.auth.models import UserManager
from datetime import date
import string
import random

class CustomUserManager(UserManager):
    def create_user(self, email, password=None):

        if email is None:
            raise TypeError('Users must have an email address.')


        def phone_generator(size=9, chars=string.digits):
            return ''.join(random.choice(chars) for _ in range(size))
        phone = '+' + phone_generator()
        user = self.model(email=self.normalize_email(email), phone=phone)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password):

        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'),  unique=True)
    username = models.CharField(_('username'), max_length=255)
    second_name = models.CharField(_('first name'), max_length=255)
    last_name = models.CharField(_('last name'), max_length=255)
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    phone = models.CharField(validators=[phone_regex], max_length=17, blank=True, unique=True) # validators should be a list
    birthday = models.DateField(_("Date"), default=date.today)
    is_verified = models.BooleanField(_('is verified'), default=False)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    last_login = models.DateTimeField(_('date joined'), auto_now_add=True)
    avatar = models.ImageField(upload_to='images/', null=True, blank=True)
    is_staff = models.BooleanField(_('staff status'),default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    @property
    def name(self):
        """I'm the 'x' property."""
        return self.username
        
    def get_full_name(self):
        '''
        Returns the first_name plus the last_name, with a space in between.
        '''
        full_name = '%s %s' % (self.name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        '''
        Returns the short name for the user.
        '''
        return self.name

    def email_user(self, subject, message, from_email=None, **kwargs):
        '''
        Sends an email to this User.
        '''
        send_mail(subject, message, from_email, [self.email], **kwargs)