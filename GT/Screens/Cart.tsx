import React from 'react';
import { View, FlatList, Text, Button, TouchableOpacity } from 'react-native';
import { useCart } from '../Context';
import styles from './style'; 

const CartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { cart, updateCartItem, removeFromCart } = useCart();

  const handleIncrease = (itemId: string) => {
    const item = cart[itemId];
    updateCartItem(itemId, item.quantity + 1);
  };

  const handleDecrease = (itemId: string) => {
    const item = cart[itemId];
    if (item.quantity === 1) {
      removeFromCart(itemId);
    } else {
      updateCartItem(itemId, item.quantity - 1);
    }
  };

  const renderItem = ({ item }: { item: { id: string; name: string; price: number; quantity: number } }) => (
    <View style={styles.cartItem}>
      <Text style={styles.cartItemName}>{item.name}</Text>
      <Text style={styles.cartItemPrice}>Php {item.price} x {item.quantity}</Text>

      <View style={styles.quantityControlsCart}>
        <TouchableOpacity onPress={() => handleDecrease(item.id)} style={styles.quantityButtonCart}>
          <Text style={styles.quantityButtonTextCart}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityTextCart}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => handleIncrease(item.id)} style={styles.quantityButtonCart}>
          <Text style={styles.quantityButtonTextCart}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const cartItems = Object.values(cart);

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.checkoutContainer}>
            <Button title="Proceed to Checkout" onPress={handleCheckout} color="#8C6D3F" />
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;
