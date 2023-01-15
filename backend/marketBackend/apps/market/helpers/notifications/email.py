from marketBackend.apps.market.models import Order
import yagmail
from marketBackend.secret import GMAIL_EMAIL, GMAIL_PASSWORD

def notify_by_email(data):
    yag = yagmail.SMTP(GMAIL_EMAIL, GMAIL_PASSWORD)
    name = data.get('name', '')
    city = data.get('city', '')
    phone = data.get('phone', '')
    surname = data.get('surname', '')
    secondName = data.get('secondName', '')
    phone = data.get('phone', '')
    shipping = data.get('shipping', '')
    orderType = shipping.get('type')
    officeDescription = shipping['data']['selectedOffice']['description']
    productList = data.get('productList', [])
    contents=[
            f"Order Type: {orderType}",
            f"Name: {name}",
            f"Surname: {surname}",
            f"Second Name: {secondName}",
            f"Phone: {phone}",
            f"City: {city}",
    ]
    if orderType == Order.OrderType.NewPost:
        contents = contents + [
            f"Post Office: {officeDescription}"
        ]
    elif orderType == Order.OrderType.NewPostCourier:
        contents = contents + []
    elif orderType == Order.OrderType.Justin:
        contents = contents + []

    # contents = contents + ["Product List:"]
    # selectedProducts = Product.objects.filter(id__in=productList)
    # for product in selectedProducts:
    #     contents = contents + [ f"Title: {product.title}"]
    yag.send(to='paukan602@gmail.com',  subject="New order!", contents=contents)