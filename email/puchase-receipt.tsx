/** @format */

import sampleData from "@/db/sample-data";
import { formatCurrency } from "@/lib/utils";
import { Order } from "@/types";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import dotenv from "dotenv";

dotenv.config();

PurchaseReceiptEmail.PreviewProps = {
  order: {
    id: crypto.randomUUID(),
    userId: "123",
    user: {
      name: "Noah",
      email: "Noah@gmail.com",
    },
    paymentMethod: "Stripe",
    shippingAddress: {
      fullName: "Jane",
      streetAddress: "jane.smith@example.com",
      city: "Durban",
      postalCode: "4001",
      country: "South Africa",
    },
    paymentResult: {
      id: "ch_3RyUHaHYe0qpWNGG1WaP1YJg",
      status: "COMPLETED",
      email_address: "siyandasokhela@gmail.com",
      pricePaid: "1034",
    },
    itemsPrice: "899",
    shippingPrice: "0",
    taxPrice: "135.85",
    totalPrice: "1033.85",
    isPaid: true,
    paidAt: new Date(),
    isDelivered: true,
    deliveredAt: new Date(),
    createdAt: new Date("2025-08-21T08:55:38.516Z"),
    orderItems: sampleData.products.map((X) => ({
      name: X.name,
      orderId: "123",
      productId: "123",
      slug: X.slug,
      qty: X.stock,
      image: X.images[0],
      price: X.price.toString(),
    })),
  },
} satisfies OrderInformationProps;

const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

type OrderInformationProps = {
  order: Order;
};

export default function PurchaseReceiptEmail({ order }: OrderInformationProps) {
  return (
    <Html>
      <Preview>View order receipt</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sane bg-white'>
          <Container className='max-w-xl'>
            <Heading>Purchase Receipt</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className='mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap'>
                    Order ID
                  </Text>
                  <Text className='mb-0 mr-4'>{order.id.toString()}</Text>
                </Column>
                <Column>
                  <Text className='mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap'>
                    Purchase Date
                  </Text>
                  <Text className='mb-0 mr-4'>
                    {dateFormatter.format(order.createdAt)}
                  </Text>
                </Column>
                <Column>
                  <Text className='mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap'>
                    Price Paid
                  </Text>
                  <Text className='mb-0 mr-4'>
                    {formatCurrency(order.totalPrice)}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className='border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4'>
              {order.orderItems.map((item) => (
                <Row key={item.productId} mt-8>
                  <Column className='w-20 '>
                    <Img
                      width='60'
                      alt={item.name}
                      className='rounded-full'
                      src={
                        item.image.startsWith("/")
                          ? `${process.env.NEXT_PUBLIC_APP_SERVER_URL}${item.image}`
                          : item.image
                      }
                    />
                  </Column>
                  <Column className='align-middle'>
                    {item.name} X {item.qty}
                  </Column>
                  <Column align='right' className='align-middle'>
                    {formatCurrency(item.price)}
                  </Column>
                </Row>
              ))}
              {[
                {
                  name: "Items",
                  price: order.itemsPrice,
                },
                {
                  name: "Tax",
                  price: order.taxPrice,
                },
                {
                  name: "Shipping",
                  price: order.shippingPrice,
                },
                {
                  name: "Total",
                  price: order.totalPrice,
                },
              ].map(({ name, price }) => (
                <Row key={name} className='py-1'>
                  <Column align='right' className='align-top' width={70}>
                    <Text className='m-0'>
                      {name} : {formatCurrency(price)}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
