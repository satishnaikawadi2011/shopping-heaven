import React from 'react';
import { ScrollView, StyleSheet, View,Linking } from 'react-native';
import { Button, Paragraph, Subheading, Surface, Text, Title } from 'react-native-paper';
import { DEVICE_WIDTH, INDIAN_RUPEE_SIGN } from '../../../constants';
import AppDivider from '../../components/UI/app/AppDivider';
import CartDetails from '../../components/UI/cart/CartDetails';
import CartItemTile from '../../components/UI/cart/CartItemTile';
import { ProfileStackNavProps } from '../../navigation/ProfileStackNavigator';
import { useOrderStore } from '../../store/orders';
import formateDate from '../../utils/formateDate';

const OrderDetailScreen = ({ navigation, route }: ProfileStackNavProps<'OrderDetails'>) => {
	const { orderId } = route.params;
    const { orders } = useOrderStore();
    const order = orders.find(order => order._id === orderId);
	return (
		<View style={styles.container}>
            <ScrollView>
                <View style={styles.idContainer}>
                <Title style={styles.id}>
                    {`Order ID : ${order?._id}`}
                </Title>
            </View>
            <AppDivider />
                <View style={styles.itemsContainer}>
                <Title style={styles.title}>Order Items</Title>
                {order?.orderItems.map(orderItem => {
                    return <CartItemTile key={orderItem._id} noActions cartItem={{_id:orderItem._id,image:orderItem.image,price:orderItem.price,quantity:orderItem.qty,title:orderItem.title}}/>
                })}
            </View>
            <AppDivider />
            <Surface style={[styles.surface,{marginVertical:20}]}>
                    <View style={styles.shippingTitle}>
                         <Text>Shipping Details</Text>
               </View>
                    <AppDivider />
                    <View  style={styles.shippingInfo}>
                                        <Title style={{marginVertical:10}}>{order?.shippingAddress.fullName}</Title>
                <View>
                    <Text style={styles.shippingInfoText}>{order?.shippingAddress.building} ,</Text>
                    <Text style={styles.shippingInfoText}>{order?.shippingAddress.city} ,</Text>
                    <Text style={styles.shippingInfoText}>{order?.shippingAddress.road} ,</Text>
                    <Text style={styles.shippingInfoText}>{order?.shippingAddress.state} - {order?.shippingAddress.pincode} .</Text>
                </View>
                <Text style={[styles.shippingInfoText,{marginTop:7}]}>Phone number : {order?.shippingAddress.phoneNumber}</Text>
                    </View>
                </Surface>
                <CartDetails totalAmount={order!.itemsPrice} title='Price Details' totalItems={order!.orderItems.length} shipping={order?.shippingPrice} taxes={order?.taxPrice} />
                 <Surface style={[styles.surface,{marginVertical:20}]}>
                    <View style={styles.shippingTitle}>
                         <Text>Order Status</Text>
               </View>
                    <AppDivider />
                    <View>
                        <View style={styles.rowContainer}>
                                                    <View style={styles.row}>
                            <Text style={styles.bold}>Payment Status</Text>
                            <Text>{order?.isPaid ? 'Paid':'Not Paid'}</Text>
                            </View>
                            {order?.paidAt && <Paragraph>Paid on {formateDate(new Date(order.paidAt))}</Paragraph>}
                        </View>
                        <AppDivider />
                                                <View style={styles.rowContainer}>
                                                    <View style={styles.row}>
                            <Text style={styles.bold}>Delivery Status</Text>
                            <Text>{order?.isDelivered ? 'Delivered':'Not Delivered'}</Text>
                            </View>
                            {order?.deliveredAt && <Paragraph>Paid on {formateDate(new Date(order.deliveredAt))}</Paragraph>}
                        </View>
                        {!order?.isPaid && <React.Fragment>
                                                <AppDivider />
                        <View style={styles.rowContainer}>
                                                    <View style={styles.row}>
                            <Text style={styles.bold}>Payment Method</Text>
                            <Text>{order!.paymentMethod}</Text>
                            </View>
                        </View>
                        </React.Fragment>}
                    </View>
                </Surface>
                {order?.isPaid && <Surface style={[styles.surface,{marginVertical:20}]}>
                    <View style={styles.shippingTitle}>
                         <Text>Payment Result</Text>
               </View>
                    <AppDivider />
                    
                    <View>
                                            <View style={styles.rowContainer}>
                                                    <View style={styles.row}>
                            <Text style={styles.bold}>Payment ID</Text>
                                <Text>{order.paymentResult?.id}</Text>
                            </View>
                        </View>
                        <AppDivider />
                        <View style={styles.rowContainer}>
                                                    <View style={styles.row}>
                            <Text style={styles.bold}>Amount</Text>
                                <Text>{INDIAN_RUPEE_SIGN}{order.paymentResult?.amount}</Text>
                            </View>
                        </View>
                        <AppDivider />
                                                <View style={styles.rowContainer}>
                                                    <View style={styles.row}>
                            <Text style={styles.bold}>Currency</Text>
                            <Text>{order.paymentResult?.currency?.toUpperCase()}</Text>
                            </View>
                        </View>
                                                <AppDivider />
                        <View style={styles.rowContainer}>
                                                    <View style={styles.row}>
                            <Text style={styles.bold}>Payment Method</Text>
                            <Text>{order!.paymentMethod}</Text>
                            </View>
                        </View>
                    </View>
                    <AppDivider />
                    {order.paymentResult?.receipt_url && <Button onPress={() => {
                        if (order.paymentResult?.receipt_url) {
                            Linking.openURL(order.paymentResult.receipt_url)
                        }
                    }} mode='contained'>Get Receipt</Button>}
                </Surface>}
            </ScrollView>
		</View>
	);
};

export default OrderDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    idContainer: {
        padding:10
    },
    id: {
        fontSize: 17,
        textAlign:'center'
    },
    itemsContainer: {
        
    },
    title: {
        textAlign: 'center',
        marginVertical:10
    },
    surface:{
			padding: 10,
			alignSelf: 'center',
			width: DEVICE_WIDTH,
			shadowColor: '#000',
			shadowOffset:
				{
					width: 0,
					height: 1
				},
			shadowOpacity: 0.22,
			shadowRadius: 2.22,

			elevation: 3,
			marginVertical: 10
    },
    shippingTitle: {
        padding:10
    },
    shippingInfo: {
        padding:10
    },
    shippingInfoText: {
        fontSize:17
    },
    bold: {
        fontSize: 17,
        fontWeight:'bold'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowContainer: {
        marginHorizontal: 20,
        marginVertical:10
    }
});
