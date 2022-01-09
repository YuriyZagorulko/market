from rest_framework import pagination
from rest_framework.response import Response

class CustomPagination(pagination.PageNumberPagination):
    page_size = 60
    page_size_query_param = 'page_size'
    max_page_size = 60
    page_query_param = 'p'

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'items_per_page': self.page.paginator.per_page,
            'num_pages': self.page.paginator.num_pages,
            'page_number': self.page.paginator.num_pages,
            'data': data
        })