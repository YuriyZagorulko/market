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
            city = city,
            street = '',
            house = '',
            officeRef = '',
            officeDescription = '',
            apartment = '',
            user = None
        )
        print(newOrder)
    except Exception as e:
	    print(e)

