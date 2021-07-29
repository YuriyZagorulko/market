from marketBackend.apps.market.models import Order, OrderDetails

def createOrder(data):
    name = data.get('name', '')
    city = data.get('city', '')
    phone = data.get('phone', '')
    surname = data.get('surname', '')
    secondName = data.get('secondName', '')
    productList = data.get('productList', [])
    shipping = data.get('shipping', '')

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
            user = None,
            orderType = shipping.get('type'),
            city = shipping.get('data').get('selectedCity').get('value'),
            officeDescription = shipping['data']['selectedOffice']['description'],
        )
        print(newOrder)
        newOrder.save()
        for product in productList:
            details = OrderDetails(
                quantity = product['quantity'], 
                order = newOrder, 
                product = int(product['id'])
            )
            details.save()
    except Exception as e:
	    print(e)

