from rest_framework import pagination
from rest_framework.response import Response

class CustomPagination(pagination.PageNumberPagination):
    page_size = 20
    page_size_query_param = 'totalItemsOnPage'
    max_page_size = 60
    page_query_param = 'currentPage'

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'totalItemsOnPage': self.page.paginator.per_page,
            'numPages': self.page.paginator.num_pages,
            'currentPage': self.page.number,
            'data': data
        })