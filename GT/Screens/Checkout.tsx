import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useCart } from '../Context';
import styles from './style';

const CheckoutScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { cart, clearCart } = useCart();

  
  const cartItems = Object.values(cart);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {

    Alert.alert(
      'Confirm Checkout',
      'Are you sure you want to proceed with the checkout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Proceed',
          onPress: () => {
            Alert.alert('Checkout successful!', '', [
              {
                text: 'OK',
                onPress: () => {
                  clearCart();
                  navigation.navigate('Home'); 
                },
              },
            ]);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>
                Php {item.price} x {item.quantity} = Php{item.price * item.quantity}
              </Text>
            </View>
          ))}
          <Text style={styles.cartItemPrice}>Total: Php{totalPrice}</Text>
          <Button title="Checkout" onPress={handleCheckout} />
        </>
      )}
    </View>
  );
};

export default CheckoutScreen;
