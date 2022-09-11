from marketBackend.apps.market.models import Order, OrderDetails
from marketBackend.apps.market.helpers.notifications import email as notifier

def createOrder(data):
    name = data.get('name', '')
    phone = data.get('phone', '')
    surname = data.get('surname', '')
    secondName = data.get('secondName', '')
    productList = data.get('productList', [])
    shipping = data.get('shipping', '')
    city = shipping.get('data').get('selectedCity').get('value')
    userId = data.get('userId')

    try:
        newOrder = Order.objects.create(
            recipientName = name,
            recipientSecondName = secondName,
            recipientSurname = surname,
            phoneNumber = phone,
            street = '',
            house = '',
            officeRef = '',
            apartment = '',
            user = userId,
            orderType = shipping.get('type'),
            city = city,
            officeDescription = shipping['data']['selectedOffice']['description'],
        )
        print(newOrder)
        newOrder.save()
        for product in productList:
            try:
                details = OrderDetails.objects.create(
                    quantity = product['quantity'], 
                    order = newOrder, 
                    product_id = int(product['id'])
                )
                print(details)
                details.save()
            except Exception as e: 
                print(e)
        # notifier.notify_by_email(data)
    except Exception as e:
	    print(e)

